import configData from '../../app.config.json';
import { ConfigCulture } from '../models/configCulture';

export class ConfigHelper {
    public getLocales(): string[] {
        return configData.map(x => x.CultureCode);
    }

    public getRegion(locale: string): ConfigCulture {
        return configData.filter(x => x.CultureCode === locale)[0];
    }

    public getDefaultLocale(): string {
        return configData[0].CultureCode;
    }

    public getNextRegion(label: string): ConfigCulture {
        let index = configData.findIndex(x => x.Label === label);

        if (configData.length === ++index)
            index = 0;

        return configData[index];
    }
}