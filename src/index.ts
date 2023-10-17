import Output from "@utils/output";
import Config from "@utils/config";
import MangadexApi from "@mangadex/api";

Output.Log("Starting up...");

const config: Config = new Config();
const mangadexapi: MangadexApi = new MangadexApi();

(async ()=>
{

})().catch(Output.Error)
