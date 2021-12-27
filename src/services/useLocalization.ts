import useSWR, { Fetcher } from "swr";
import { ConfigHelper } from "./configHelper";
import { StoreService } from "./storeService";

export default function useLocalization(locale?: string): Map<string, string> {
    if (!locale)
        locale = defaultLocaleIfAbsent();

    const refreshIntervalInMs = 5 * 60 * 1000;
    const mockFetcher: Fetcher<Map<string, string>, string[]> = (url: string, locale: string) => (new StoreService).getLocalizaion(locale);

    const { data } = useSWR(['/api/localization', locale], mockFetcher, { refreshInterval: refreshIntervalInMs });

    return data ? data : new Map<string, string>();
}

export function defaultLocaleIfAbsent(locale?: string | undefined): string {
    if (!locale) {
        const helper = new ConfigHelper();
        locale = helper.getDefaultLocale();
    }

    return locale;
}