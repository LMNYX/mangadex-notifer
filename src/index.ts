import Output from "@utils/output";
import MangadexApi from "@mangadex/api";

Output.Log("Starting seeking...");

const mangadexapi: MangadexApi = new MangadexApi();

(async ()=>
{

let v = await mangadexapi.manga("get", ["f26c0ae5-c8f6-4630-979e-9a5d310bd795", "feed"]);
console.log(v);

})().catch(Output.Error)
