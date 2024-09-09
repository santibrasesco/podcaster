'use client'

import Image from "next/image";
import styles from "./PodcastDetail.module.css";
import { useNavigation, usePodcastState } from "@/context/PodcastContext";
import { usePathname } from "next/navigation";
import { Linkify } from "../common/Linkify";
import { useEffect } from "react";
import Link from "next/link";

export const PodcastDetail = () => {
    const pathname = usePathname();
    const [isNavigating, setIsNavigating] = useNavigation();
    const { podcast, loading } = usePodcastState();

    useEffect(() => {
        setIsNavigating(false);
    }, [pathname]);

    const handlePodcastClick = () => {
        const podcastPage = `/podcast/${podcast.id}`;
        if (pathname !== podcastPage) {
            setIsNavigating(true);
        }
    }

    if (loading || !podcast) return;

    return (
        <div className={`${styles.container} card`}>
            <Link href={`/podcast/${podcast.id}`}>
                <Image
                    width={200}
                    height={200}
                    src={podcast?.image || ''}
                    alt={`Image podcast ${podcast?.title}`}
                    onClick={handlePodcastClick} />
            </Link>
            <section className={styles.title}>
                <Link
                    href={`/podcast/${podcast.id}`}
                    onClick={handlePodcastClick} >
                    <h4 onClick={handlePodcastClick}>{podcast?.title}</h4>
                </Link>
                <p>by {podcast?.author}</p>
            </section>

            <section className={styles.description}>
                <h4>Description:</h4>
                <Linkify>
                    <p>{podcast?.summary}</p>
                </Linkify>
            </section>
        </div>
    )
}