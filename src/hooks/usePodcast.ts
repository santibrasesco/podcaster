import { fetchRequest, fetchPodcastSuccess } from "@/context/podcastActions";
import { usePodcastDispatch, usePodcastState } from "@/context/PodcastContext";
import { fetchPodcast } from "@/services/podcastService"
import { useEffect } from "react"

const CACHE_DURATION = 24 * 60 * 60 * 1000;

export const usePodcast = (id: string) => {
    const dispatch = usePodcastDispatch();
    const { podcasts } = usePodcastState();

    useEffect(() => {
        dispatch(fetchRequest());

        const loadPodcast = async () => {
            const podcast = await fetchPodcast(id);

            if (podcast && !podcast.summary) {
                podcast.summary = podcasts?.find(p => p.id === podcast?.id)?.summary || '';
            }

            dispatch(fetchPodcastSuccess(podcast));

            localStorage.setItem(id, JSON.stringify({
                timestamp: Date.now(),
                data: podcast
            }));
        }

        const cache = JSON.parse(localStorage.getItem(id) || 'null');

        if (cache?.data && cache?.timestamp) {
            const timeElapsed = Date.now() - new Date(cache.timestamp).getTime();

            if (timeElapsed < CACHE_DURATION) {
                dispatch(fetchPodcastSuccess(cache.data));
            } else {
                loadPodcast();
            }
        } else {
            loadPodcast();
        }
    }, [id]);
}