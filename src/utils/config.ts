import { PresetOutput } from '@utils/output';
import YAML from 'yaml';
import fs from 'fs';

export default class Config
{
    public constructor(private readonly configFile: string = "config.yml",
                    private readonly Output = new PresetOutput("cfg"),
                    private config: any = {})
    {
        if (!fs.existsSync(configFile))
        {
            fs.writeFileSync(configFile, YAML.stringify(defaultConfig));
            Output.Log(`Created config file at ${configFile}`);
            this.config = defaultConfig;
        }
        else
        {
            try
            {
                this.config = YAML.parse(fs.readFileSync(configFile).toString());
            } catch (exception)
            {
                Output.Error(`Error parsing config file: ${exception}`);
                this.config = defaultConfig;
                fs.cpSync(configFile, `${configFile}.bak`);
                fs.writeFileSync(configFile, YAML.stringify(defaultConfig));
                Output.Warn("Created backup of config file and replaced with default config.");
            }
        }
    }
}

const defaultConfig = {
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