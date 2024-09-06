import { PodcastDetail } from "@/app/components/podcastDetail/PodcastDetail";

export default function PodcastDetailLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {

    return (
        <div className="podcast-layout">
            <PodcastDetail />
            {children}
        </div>
    )
}