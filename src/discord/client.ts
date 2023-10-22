import { Client, ClientOptions, Collection } from 'discord.js';
import { discordCommand } from '@utils/defaults';

export default class DiscordClient extends Client
{
    public commands: Collection<string, discordCommand> = new Collection();
    public constructor(options: ClientOptions)
    {
        super(options);
    }
}