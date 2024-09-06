import { fetchPodcastsRequest, fetchPodcastsSuccess } from "@/context/podcastActions";
import { usePodcastDispatch } from "@/context/PodcastContext";
import { fetchTopPodcasts } from "@/services/podcastService";
import { useEffect, } from "react"

const PODCASTS_STORAGE_KEY = 'cachedPodcasts';
const CACHE_DURATION = 24 * 60 * 60 * 1000;

export const useTopPodcasts = () => {
    const dispatch = usePodcastDispatch();

    useEffect(() => {
        dispatch(fetchPodcastsRequest());

        const loadPodcasts = async () => {
            const podcasts = await fetchTopPodcasts();

            dispatch(fetchPodcastsSuccess(podcasts));

            localStorage.setItem(PODCASTS_STORAGE_KEY, JSON.stringify({
                timestamp: Date.now(),
                data: podcasts
            }));
        }

        const cache = JSON.parse(localStorage.getItem(PODCASTS_STORAGE_KEY) || 'null');

        if (cache?.data && cache?.timestamp) {
            const timeElapsed = Date.now() - new Date(cache.timestamp).getTime();

            if (timeElapsed < CACHE_DURATION) {
                dispatch(fetchPodcastsSuccess(cache.data));
            } else {
                loadPodcasts();
            }
        } else {
            loadPodcasts();
        }
    }, []);
}