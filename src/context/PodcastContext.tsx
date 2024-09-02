'use client'

import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import { Action, initialState, State } from "./types";
import { podcastReducer } from "./podcastReducer";


const PodcastStateContext = createContext<State | null>(null);
const DispatchContext = createContext<Dispatch<Action> | null>(null);


export const PodcastProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(podcastReducer, initialState);

    return (
        <PodcastStateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
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