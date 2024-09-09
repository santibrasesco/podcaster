'use client'

import { usePodcastState } from "@/context/PodcastContext";
import { useParams } from "next/navigation";
import { EpisodeDetail } from "../episodeDetail/EpisodeDetail";

export const Episode = () => {
    const { episodeId } = useParams<{ episodeId: string }>();
    const { podcast } = usePodcastState();
    const episode = podcast?.episodes?.find(e => e.trackId === +episodeId);

    return (
        <EpisodeDetail episode={episode} />
    )
}