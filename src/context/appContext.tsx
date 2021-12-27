import { createContext, useContext } from 'react';
import { AppStore } from './appStore';

export const AppContext = createContext<AppStore>({} as AppStore);

export function useAppContext() {
    return useContext(AppContext);
}
