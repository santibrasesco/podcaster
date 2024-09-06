'use client'

import { useNavigation, usePodcastState } from "@/context/PodcastContext"
import { FilterSearch } from "../filterSearch/FilterSearch";
import { PodcastList } from "../podcastList/PodcastList";
import { useTopPodcasts } from "@/hooks/usePodcasts";
import { useFilterPodcasts } from "@/hooks/useFilterPodcasts";
import styles from "./Podcasts.module.css";
import { Spinner } from "../spinner/Spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Podcasts = () => {
    const { loading, podcasts } = usePodcastState();
    const [isNavigating, setIsNavigating] = useNavigation();
    const router = useRouter();

    useTopPodcasts();
    const filterPodcasts = useFilterPodcasts();

    useEffect(() => {
        setIsNavigating(false);
    }, []);

    const handlePodcastClick = podcast => {
        setIsNavigating(true);
        router.push(`/podcast/${podcast.id}`);
    }

    if (loading || !podcasts?.length) return <Spinner />;

    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <span>{filterPodcasts.length}</span>
                <FilterSearch />
            </div>
            <PodcastList podcasts={filterPodcasts} onPodcastClick={handlePodcastClick} />
        </div>
    )
}