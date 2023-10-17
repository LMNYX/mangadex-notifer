import YAML from 'yaml';

export default class Config
{
    public constructor(private readonly configFile: string = "config.yml")
    {

    }
}