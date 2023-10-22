import { PresetOutput } from '@utils/output';
import YAML from 'yaml';
import fs from 'fs';
import { config as defaultConfig } from '@utils/defaults';

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

        if (this.performDefaultCheck())
        {
            Output.Warn("Default config detected! Please fill out the config file.");
            process.exit(1);
        }
    }

    public get discord()
    {
        return this.config.discord;
    }

    public get mangadex()
    {
        return this.config.mangadex;
    }

    public get database()
    {
        return this.config.database;
    }

    protected performDefaultCheck():boolean
    {
        return this.config.mangadex.apiToken === "" ||
        this.config.discord.token === "" ||
        this.config.discord.owner_id === "000000000";
    }
}

