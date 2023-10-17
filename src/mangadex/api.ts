import axios from "axios";

export default class MangadexApi
{
    protected static baseUrl: string | null = "https://api.mangadex.org/";

    public constructor (public readonly apiToken?: string)
    {}

    async call(method:string, urlStruct:string[], data:Object)
    {
        return new Promise((resolve, reject) => {
            axios({
                method: method,
                url: MangadexApi.baseUrl + urlStruct.join("/"),
                data: data,
                headers: {
                    "Authorization": "Bearer " + this.apiToken
                }
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }

    async manga(method: string, endpoint:string[] | null, data:Object = {})
    {
        return this.call(method, ["manga", ...endpoint ?? ""], data);
    }

    async chapters(method: string, endpoint:string[] | null, data:Object = {})
    {
        return this.call(method, ["chapters", ...endpoint ?? ""], data);
    }
}