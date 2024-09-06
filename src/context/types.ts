import { Podcast } from "@/entities/Podcast";

export type Action =
    | { type: 'FETCH_PODCASTS_REQUEST' }
    | { type: 'FETCH_PODCASTS_SUCCESS', payload: Podcast[] }
    | { type: 'SET_FILTER_SEARCH', payload: string }
    | { type: 'FETCH_REQUEST' }
    | { type: 'FETCH_PODCAST_SUCCESS', payload?: Podcast };

export interface State {
    podcasts: Podcast[],
    loading: boolean,
    filterSearch: string,
    podcast?: Podcast
}

export const initialState: State = {
    podcasts: [],
    loading: false,
    filterSearch: ''
}