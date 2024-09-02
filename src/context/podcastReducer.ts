import { initialState, Action, State } from "./types";

export const podcastReducer = (state = initialState, action: Action): State => {
    switch (action.type) {
        case 'FETCH_PODCASTS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_PODCASTS_SUCCESS':
            return {
                ...state,
                loading: false,
                podcasts: action.payload
            }
        case 'SET_FILTER_SEARCH':
            return {
                ...state,
                filterSearch: action.payload
            }
        default:
            return state;
    }
}