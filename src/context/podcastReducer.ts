import { initialState, Action, State } from "./types";

export const podcastReducer = (state = initialState, action: Action): State => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_PODCASTS_SUCCESS':
            return {
                ...state,
                loading: false,
                podcasts: action.payload,
                podcast: undefined
            }
        case 'SET_FILTER_SEARCH':
            return {
                ...state,
                filterSearch: action.payload
            }
        case 'FETCH_PODCAST_SUCCESS':
            return {
                ...state,
                loading: false,
                podcast: action.payload
            }
        default:
            return state;
    }
}