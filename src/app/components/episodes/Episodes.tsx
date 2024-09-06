'use client'

import { useNavigation, usePodcastState } from "@/context/PodcastContext";
import styles from "./Episodes.module.css";
import { formatDate, formatDuration } from "@/utils/dateTimeUtils";
import { Spinner } from "../spinner/Spinner";
import Link from "next/link";
import { useEffect } from "react";

export const Episodes = () => {
    const { podcast, loading } = usePodcastState();
    const [isNavigating, setIsNavigating] = useNavigation();

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
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            podcast?.episodes?.map(e => (
                                <tr key={e.trackId}>
                                    <td>
                                        <Link onClick={() => { setIsNavigating(true) }} href={`/podcast/${podcast.id}/episode/${e.trackId}`}>
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
            </div>
        </div>
    )
}