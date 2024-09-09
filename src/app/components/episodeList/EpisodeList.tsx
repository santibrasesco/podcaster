'use client'

import { Episode } from "@/entities/Episode";
import { formatDate, formatDuration } from "@/utils/dateTimeUtils";
import Link from "next/link";
import { MouseEventHandler } from "react";
import styles from "./EpisodeList.module.css";

export const EpisodeList = ({
    episodes,
    onItemClick }:
    {
        episodes: Episode[],
        onItemClick: MouseEventHandler<HTMLAnchorElement>
    }) => (

    <table className={styles.table}>
        <thead>
            <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Duration</th>
            </tr>
        </thead>
        <tbody>
            {
                episodes?.map(e => (
                    <tr key={e.trackId}>
                        <td>
                            <Link onClick={onItemClick} href={`/podcast/${e.collectionId}/episode/${e.trackId}`}>
                                {e.trackName}
                            </Link>
                        </td>
                        <td>{formatDate(e.releaseDate)}</td>
                        <td>{formatDuration(e.trackTimeMillis)}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
)