'use client'

import { setFilterSearch } from "@/context/podcastActions";
import { usePodcastDispatch, usePodcastState } from "@/context/PodcastContext";
import styles from "./FilterSearch.module.css";

export const FilterSearch = () => {
    const { filterSearch } = usePodcastState();
    const dispatch = usePodcastDispatch();

    return (
        <input
            className={styles.input}
            placeholder="Filter podcasts..."
            value={filterSearch}
            onChange={evt => dispatch(setFilterSearch(evt.target.value))} />
    )
}