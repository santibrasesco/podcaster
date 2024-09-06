import { Podcast } from "@/entities/Podcast";
import { mapPodcastRowToPodcast } from "@/utils/podcastMapper";

const API_URL_BASE = 'https://api.allorigins.win/get?url=';
const API_URL_TOP = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';
const API_URL_PODCAST = 'https://itunes.apple.com/lookup'

const buildPodcastUrl = (id: string): string => `${API_URL_PODCAST}/?id=${id}&media=podcast&entity=podcastEpisode&limit=20`;

export const fetchTopPodcasts = async (): Promise<Podcast[]> => {
    try {
        const response = await fetch(`${API_URL_BASE}${encodeURIComponent(API_URL_TOP)}`);
        const { contents, status } = await response.json();

        if (status.http_code !== 200) {
            throw new Error(`Error: ${status.http_code}`);
        }

        const { feed: { entry } } = JSON.parse(contents);
        return entry.map(mapPodcastRowToPodcast);

    } catch (error) {
        console.error('Error fetching podcasts: ', error);
        return [];
    }
}

export const fetchPodcast = async (id: string): Promise<Podcast | undefined> => {
    try {
        const encodedUrl = encodeURIComponent(buildPodcastUrl(id));
        const response = await fetch(`${API_URL_BASE}${encodedUrl}`);

        const { contents, status } = await response.json();
        if (status.http_code !== 200) {
            throw new Error(`Error: ${status.http_code}`);
        }

        const { results } = JSON.parse(contents);
        const podcastData = results.find((item: any) => item.kind === 'podcast');
        const episodes = results.filter((item: any) => item.kind === 'podcast-episode');

        if (!podcastData) {
            throw new Error('Podcast not found');
        }

        const { artistName, artworkUrl600, collectionName, trackCount, description } = podcastData;

        return {
            id,
            author: artistName,
            image: artworkUrl600,
            title: collectionName,
            summary: description,
            trackCount,
            episodes
        }

    } catch (error) {
        console.error(`Error fetching podcast: ${id}`, error);
        return;
    }
}