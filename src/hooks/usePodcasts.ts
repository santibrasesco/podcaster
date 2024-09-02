import { fetchPodcastsRequest, fetchPodcastsSuccess } from "@/context/podcastActions";
import { usePodcastDispatch } from "@/context/PodcastContext";
import { fetchTopPodcasts } from "@/services/podcastService";
import { useEffect, } from "react"

const PODCASTS_STORAGE_KEY = 'cachedPodcasts';
const TIMESTAMP_KEY = 'podcastsTimestamp';
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export const useTopPodcasts = () => {
    const dispatch = usePodcastDispatch();

    useEffect(() => {
        dispatch(fetchPodcastsRequest());

        const loadPodcasts = async () => {
            const podcasts = await fetchTopPodcasts();
            localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
            localStorage.setItem(PODCASTS_STORAGE_KEY, JSON.stringify(podcasts));
            dispatch(fetchPodcastsSuccess(podcasts));
        }

        const cachedPodcasts = JSON.parse(localStorage.getItem(PODCASTS_STORAGE_KEY) || 'null');
        const cachedTimestamp = Number(localStorage.getItem(TIMESTAMP_KEY));

        if (cachedPodcasts && cachedPodcasts.length && cachedTimestamp) {
            const timeElapsed = Date.now() - new Date(cachedTimestamp).getTime();

            if (timeElapsed < CACHE_DURATION) {
                dispatch(fetchPodcastsSuccess(cachedPodcasts));
            } else {
                loadPodcasts();
            }
        } else {
            loadPodcasts();
        }
    }, []);
}