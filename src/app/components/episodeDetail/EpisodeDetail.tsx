'use client'

import { usePodcastState } from "@/context/PodcastContext"
import { useParams } from "next/navigation";
import styles from "./EpisodeDetail.module.css";
import React from 'react';
import { Linkify } from '../common/Linkify';

export const EpisodeDetail = () => {
    const { episodeId } = useParams();
    const { podcast } = usePodcastState();
    const episode = podcast?.episodes?.find(e => e.trackId === +episodeId);
    const sourceType = `${episode?.episodeContentType}/${episode?.episodeFileExtension}`;

    return (
        <section className={`${styles.container} card`}>
            <div>
                <h3>{episode?.trackName}</h3>
                <Linkify>
                    <p className={styles.description}>{episode?.description}</p>
                </Linkify>
            </div>

            <audio controls controlsList='nodownload'>
                <source src={episode?.episodeUrl} type={sourceType} />
            </audio>
        </section>
    )
}