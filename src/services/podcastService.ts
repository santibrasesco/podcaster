import { Podcast } from "@/entities/Podcast";

const API_URL = 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

export const fetchTopPodcasts = async (): Promise<Podcast[]> => {
    try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(API_URL)}`);
        let data = await response.json();

        if (data.status.http_code !== 200) {
            throw new Error(`Error: ${data.status.http_code}`);
        }

        const { feed: { entry } } = JSON.parse(data.contents);

        const parsedPodcasts: Podcast[] = entry.map((e: any) => {
            return {
                id: e.id?.attributes?.['im:id'],
                title: e['im:name']?.label,
                author: e['im:artist']?.label,
                summary: e.summary?.label,
                image: e["im:image"]?.at(-1).label,
            };
        });


        return parsedPodcasts;

    } catch (error) {
        console.error('Error fetching podcasts: ', error);
        return [];
    }
}