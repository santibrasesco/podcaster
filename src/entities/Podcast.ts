import { Episode } from "./Episode";

export interface Podcast {
    id: string;
    title: string;
    author: string;
    summary: string;
    image?: string;
    trackCount?: number,
    episodes?: Episode[]
}

export interface PodcastRow {
    id: { attributes: { 'im:id': string } },
    ['im:name']: { label: string },
    ['im:artist']: { label: string },
    summary: { label: string },
    ["im:image"]: Array<{ label: string }>
}
