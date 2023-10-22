import { Client, Events } from 'discord.js';
import { discordClientConfig } from '@utils/defaults';
import { PresetOutput } from '@utils/output';

export default class DiscordClient
{
    public constructor(private readonly token: string,
        private readonly owner_id: string,
        private readonly client: Client = new Client(discordClientConfig),
        private readonly Output = new PresetOutput("dsc"))
    {
        client.once(Events.ClientReady, c => {
            Output.Log("Discord client ready.");
        });

        client.login(token);
    }
}