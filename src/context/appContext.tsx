import { AppStore } from './appStore';
import { createContext, useContext } from 'react';

export const AppContext = createContext<AppStore>({} as AppStore);

export function useAppContext() {
    return useContext(AppContext);
}
