import fs from 'node:fs';
import { Collection, Events } from 'discord.js';
import { REST, Routes } from 'discord.js';

import DiscordClient from '@discord/client';
import { discordClientConfig, discordCommand } from '@utils/defaults';
import { PresetOutput } from '@utils/output';

export default class DiscordRunner
{

    private clientId: string = "";
    public constructor(private readonly token: string,
        private readonly owner_id: string,
        private readonly client: DiscordClient = new DiscordClient(discordClientConfig),
        private readonly rest: REST = new REST().setToken(token),
        private readonly Output = new PresetOutput("dsc"))
    {
        client.once(Events.ClientReady, async c => {
            this.clientId = c.user.id;
            Output.Log("Discord client ready.");

            await this.registerCommandsInternally();
        });

        client.on(Events.InteractionCreate, this.onInteraction);

        this.registerCommands();
        client.login(token);
    }

    private async onInteraction(interaction?: any)
    {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) return;

        try
        {
            await command.execute(interaction);
        } catch (error)
        {
            this.Output.Error(error);
            if (interaction.replied || interaction.deferred)
                await interaction.editReply({ content: "There was an error while executing this command!", ephemeral: true });
            else
                await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    }

    private async registerCommands()
    {
        const commandFiles = fs.readdirSync(__dirname + "/commands").filter(file => file.endsWith(".js"));

        for (const file of commandFiles)
        {
            this.Output.Log(`Loading command file: ${file}`);
            const command = await import(`./commands/${file}`);

            if (!command.default || !command.default.data || !command.default.execute)
            {
                this.Output.Warn(`Invalid command file: ${file}`);
                continue;
            }

            this.client.commands.set(command.default.data.name, command.default);
        }
    }

    private async registerCommandsInternally()
    {
        try
        {
            await this.rest.put(
                Routes.applicationCommands(this.clientId),
                { body: this.client.commands.map((c: discordCommand) => c.data.toJSON()) }
            );

            this.Output.Log("Successfully registered commands.");
        }
        catch (error)
        {
            this.Output.Error(error);
        }
    }
}