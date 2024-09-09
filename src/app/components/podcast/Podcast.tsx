'use client'

import { useNavigation, usePodcastState } from "@/context/PodcastContext";
import { useParams } from "next/navigation";
import { usePodcast } from "@/hooks/usePodcast";
import { EpisodeList } from "../episodeList/EpisodeList";
import { Spinner } from "../spinner/Spinner";
import { useEffect } from "react";
import styles from "./Podcast.module.css";

export const Podcast = () => {
    const [isNavigating, setIsNavigating] = useNavigation();
    const { id } = useParams<{ id: string }>();
    const { loading, podcast } = usePodcastState();

    usePodcast(id);

    useEffect(() => {
        setIsNavigating(false);
    }, []);


    if (loading || !podcast) return <Spinner />;

    return (
        <div className={styles.container}>
            <div className="card">
                <h2>Episodes: {podcast?.trackCount}</h2>
            </div>
            <div className="card">
                <EpisodeList episodes={podcast.episodes} onItemClick={() => { setIsNavigating(true) }} />
            </div>
        </div>
    )

}