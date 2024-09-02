'use client';

import { PodcastCard } from "../podcastCard/PodcastCard";
import styles from './PodcastList.module.css';
import { Podcast } from "@/entities/Podcast";

export const PodcastList = ({ podcasts }: { podcasts: Podcast[] }) => {
    return (
        <div className={styles.container}>
            <ul>
                {
                    podcasts.map(podcast => (
                        <li key={podcast.id}>
                            <PodcastCard podcast={podcast} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}