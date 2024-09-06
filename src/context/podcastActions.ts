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

export const fetchRequest = (): Action => ({
    type: 'FETCH_REQUEST'
})

export const fetchPodcastSuccess = (podcast: Podcast | undefined): Action => ({
    type: 'FETCH_PODCAST_SUCCESS',
    payload: podcast
})