import { EpisodeDetail } from "@/app/components/episodeDetail/EpisodeDetail"
import { Episode } from "@/entities/Episode";
import { render, screen } from "@testing-library/react";

describe('EpisodeDetail', () => {
    let episode: Episode = {
        trackId: 123,
        trackName: 'track name test',
        description: 'description test',
        releaseDate: '2020-05-05',
        trackTimeMillis: 60000,
        episodeUrl: 'url-episode',
        episodeContentType: 'audio',
        episodeFileExtension: 'mp3',
        collectionId: '1'
    };

    it('Renders episode details', () => {
        const { container } = render(<EpisodeDetail episode={episode} />);
        const audioTag = container.querySelector('source');

        expect(screen.getByRole('heading', { name: 'track name test' })).toBeInTheDocument();
        expect(screen.getByText('description test')).toBeInTheDocument();
        expect(audioTag).toBeInTheDocument();
        expect(audioTag).toHaveAttribute('src', "url-episode");
        expect(audioTag).toHaveAttribute('type', "audio/mp3");
    })

    it('Transforms urls into html links', () => {
        episode.description = 'visit the page http://site.com.';

        render(<EpisodeDetail episode={episode} />);

        expect(screen.getByRole('link', { name: 'http://site.com' })).toBeInTheDocument();

    })
})