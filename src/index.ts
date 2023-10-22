import Output from "@utils/output";
import Config from "@utils/config";
import MangadexApi from "@mangadex/api";
import DiscordClient from "@discord/client";

Output.Log("Starting up...");

const config: Config = new Config();
const mangadexapi: MangadexApi = new MangadexApi();
const discord: DiscordClient = new DiscordClient(config.discord.token, config.discord.owner_id);

(async ()=>
{

})().catch(Output.Error)
