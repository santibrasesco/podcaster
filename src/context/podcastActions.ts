import { Podcast } from "@/entities/Podcast";
import { Action } from "./types";

export const fetchPodcastsRequest = (): Action => ({
    type: 'FETCH_PODCASTS_REQUEST'
})

export const fetchPodcastsSuccess = (podcasts: Podcast[]): Action => ({
    type: 'FETCH_PODCASTS_SUCCESS',
    payload: podcasts
})

export const setFilterSearch = (value: string): Action => ({
    type: 'SET_FILTER_SEARCH',
    payload: value
})