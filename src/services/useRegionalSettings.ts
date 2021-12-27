import useSWR, { Fetcher } from "swr";
import { ConfigHelper } from "./configHelper";
import { RegionalSettings } from "../models/regionalSettings";
import { StoreService } from "./storeService";

export default function useRegionalSettings(region: string | undefined): RegionalSettings {
    if (!region) {
        const helper = new ConfigHelper();
        const locale = helper.getDefaultLocale();
        region = helper.getRegion(locale).CountryCode;
    }

    const mockFetcher: Fetcher<RegionalSettings, string[]> = (url: string, region: string) => (new StoreService).getRegionalSettings(region);

    const { data } = useSWR(['/api/regionalSettings', region], mockFetcher);

    return data ? data : <RegionalSettings>{ paymentMethods: ['loading'] };
}