'use client'

import styles from "./EpisodeDetail.module.css";
import React from 'react';
import { Linkify } from '../common/Linkify';
import { Episode } from "@/entities/Episode";

export const EpisodeDetail = ({ episode }: { episode: Episode }) => {

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