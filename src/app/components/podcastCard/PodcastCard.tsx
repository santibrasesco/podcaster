import Image from "next/image";
import { Podcast } from "@/entities/Podcast";
import styles from './PodcastCard.module.css';

export const PodcastCard = ({ podcast }: { podcast: Podcast }) => {
    return (
        <div className={styles.container}>
            <div>
                <Image width={100} height={100} src={podcast.image} alt={`Image podcast ${podcast.title}`} />
                <p className={styles.title}>{podcast.title}</p>
                <p className={styles.author}>Author: {podcast.author}</p>
            </div>
        </div>
    )
}