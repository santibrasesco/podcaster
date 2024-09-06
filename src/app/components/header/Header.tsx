'use client'

import Link from "next/link"
import styles from "./Header.module.css";
import { useNavigation } from "../../../context/PodcastContext";
import { usePathname } from "next/navigation";

export const Header = () => {
    const [isNavigating, setIsNavigating] = useNavigation();
    const pathname = usePathname();

    const handlePodcasstClick = () => {
        if (pathname !== '/podcast') {
            setIsNavigating(true);
        }
    }

    return (
        <nav className={styles.container}>
            <Link
                href="/podcast"
                onClick={handlePodcasstClick}>
                <h1>Podcaster</h1>
            </Link>
            {isNavigating && <div className='animated-circle'></div>}
        </nav>
    )
}