import { ClientOptions, GatewayIntentBits, SlashCommandBuilder } from "discord.js";

export const config = {
    "mangadex": {
        "apiToken": ""
    },
    "discord": {
        "token": "",
        "owner_id": "000000000"
    },
    "database": [
        {
            "channel_id": "0000000000000000000000",
            "ping_message": "HELLO @everyone MANGA",
            "manga_id": "801513ba-a712-498c-8f57-cae55b38cc92",
            "last_chapter": 374,
            "ignore": true
        }
    ]
}

export const discordClientConfig: ClientOptions = {
    "intents": [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
}

export interface discordCommand
{
    data: SlashCommandBuilder;
    execute(interaction?: any): Promise<void>;
}