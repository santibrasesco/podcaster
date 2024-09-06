'use client';

import Link from "next/link";
import { PodcastCard } from "../podcastCard/PodcastCard";
import styles from './PodcastList.module.css';
import { Podcast } from "@/entities/Podcast";


export const PodcastList = ({ podcasts, onPodcastClick }: { podcasts: Podcast[], onPodcastClick: (podcast: Podcast) => void }) => {
    return (
        <div className={styles.container}>
            <ul>
                {
                    podcasts.map(podcast => (
                        <li key={podcast.id} >
                            <Link href={`/podcast/${podcast.id}`} onClick={() => onPodcastClick(podcast)}>
                                <PodcastCard podcast={podcast} />
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}