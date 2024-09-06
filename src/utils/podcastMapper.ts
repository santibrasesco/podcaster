import { Podcast, PodcastRow } from "@/entities/Podcast";

export const mapPodcastRowToPodcast = (podcastRow: PodcastRow): Podcast => {
    return {
        id: podcastRow.id?.attributes?.['im:id'],
        title: podcastRow['im:name']?.label,
        author: podcastRow['im:artist']?.label,
        summary: podcastRow.summary?.label,
        image: podcastRow["im:image"].findLast(d => d.label)?.label
    }
}