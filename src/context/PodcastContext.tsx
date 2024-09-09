'use client'

import { createContext, Dispatch, ReactNode, useContext, useReducer, useState } from "react";
import { Action, initialState, State } from "./types";
import { podcastReducer } from "./podcastReducer";


export const PodcastStateContext = createContext<State | null>(null);
export const DispatchContext = createContext<Dispatch<Action> | null>(null);
export const NavigationContext = createContext(null);

export const PodcastProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(podcastReducer, initialState);
    const [isNavigating, setIsNavigating] = useState(false);

    return (
        <PodcastStateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                <NavigationContext.Provider value={[isNavigating, setIsNavigating]}>
                    {children}
                </NavigationContext.Provider>
            </DispatchContext.Provider>
        </PodcastStateContext.Provider>
    )
}

export const usePodcastState = (): State => {
    const context = useContext(PodcastStateContext);
    if (!context) {
        throw new Error('usePodcastState debería ser utilizado dentro de un PodcastProvider');
    }
    return context;
}

export const usePodcastDispatch = (): Dispatch<Action> => {
    const context = useContext(DispatchContext);
    if (!context) {
        throw new Error('usePodcastDispatch debería ser utilizado dentro de un PodcastProvider');
    }
    return context;
}

export const useNavigation = (): [navigation: boolean, setNavigation: (value: boolean) => void] => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation debería ser utilizado dentro de un NavigationProvider');
    }
    return context;
}