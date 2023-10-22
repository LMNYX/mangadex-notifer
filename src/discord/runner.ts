import fs from 'node:fs';
import { Client, Collection, Events } from 'discord.js';
import { discordClientConfig, discordCommand } from '@utils/defaults';
import { PresetOutput } from '@utils/output';

export default class DiscordRunner
{
    private commands: Collection<string, discordCommand> = new Collection();

    public constructor(private readonly token: string,
        private readonly owner_id: string,
        private readonly client: Client = new Client(discordClientConfig),
        private readonly Output = new PresetOutput("dsc"))
    {
        client.once(Events.ClientReady, c => {
            Output.Log("Discord client ready.");
        });

        client.on(Events.InteractionCreate, this.onInteraction);

        client.login(token);
    }

    private async onInteraction(interaction?: any)
    {
        if (!interaction.isChatInputCommand()) return;
        console.log(interaction);
    }

    private async registerCommands()
    {
        const commandFiles = fs.readdirSync(__dirname + "/commands").filter(file => file.endsWith(".ts"));

        for (const file of commandFiles)
        {
            const command = await import(`./commands/${file}`);

            if (!command.default || !command.default.data || !command.default.execute)
            {
                this.Output.Warn(`Invalid command file: ${file}`);
                continue;
            }

            this.commands.set(command.data.name, command);
        }
    }
}