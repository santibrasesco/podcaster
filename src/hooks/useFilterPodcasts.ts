import { usePodcastState } from "@/context/PodcastContext"
import { useEffect, useState } from "react";

export const useFilterPodcasts = () => {
    const { filterSearch, podcasts } = usePodcastState();
    const [filterPodcasts, setFilterPodcasts] = useState(podcasts);

    useEffect(() => {
        const filter = filterSearch.toLowerCase();
        const result = podcasts.filter(p =>
            p.title.toLowerCase().includes(filter) ||
            p.author.toLowerCase().includes(filter));

        setFilterPodcasts(result);
    }, [filterSearch, podcasts])

    return filterPodcasts;
}