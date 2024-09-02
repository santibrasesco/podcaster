'use client'

import { usePodcastState } from "@/context/PodcastContext"
import { FilterSearch } from "../filterSearch/FilterSearch";
import { PodcastList } from "../podcastList/PodcastList";
import { useTopPodcasts } from "@/hooks/usePodcasts";
import { useFilterPodcasts } from "@/hooks/useFilterPodcasts";
import styles from "./Podcasts.module.css";
import { Spinner } from "../spinner/Spinner";

export const Podcasts = () => {
    const { loading } = usePodcastState();

    useTopPodcasts();
    const filterPodcasts = useFilterPodcasts();

    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <span>{filterPodcasts.length}</span>
                <FilterSearch />
            </div>
            <PodcastList podcasts={filterPodcasts} />
            {loading && <Spinner />}
        </div>
    )
}