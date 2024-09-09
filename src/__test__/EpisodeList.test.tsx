import { EpisodeList } from "@/app/components/episodeList/EpisodeList"
import { Episode } from "@/entities/Episode"
import { fireEvent, render, screen } from "@testing-library/react"

describe('Episodelist', () => {

    const episodes: Episode[] = [{
        trackId: 123,
        trackName: 'track name test',
        description: 'description test',
        releaseDate: '2020-05-05',
        trackTimeMillis: 60000,
        episodeUrl: 'url-episode',
        episodeContentType: 'audio',
        episodeFileExtension: 'mp3',
        collectionId: '1'
    }, {
        trackId: 124,
        trackName: 'track 2 name test',
        description: 'description 2 test',
        releaseDate: '2020-10-10',
        trackTimeMillis: 61000,
        episodeUrl: 'url-episode-2',
        episodeContentType: 'audio',
        episodeFileExtension: 'mp3',
        collectionId: '1'
    }]

    it('Renders the episode list', () => {
        render(<EpisodeList episodes={episodes} onItemClick={jest.fn} />);

        expect(screen.getByText(episodes[0].trackName)).toBeInTheDocument();
        expect(screen.getByText(episodes[1].trackName)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: episodes[0].trackName })).toHaveAttribute('href', '/podcast/1/episode/123');
        expect(screen.getByRole('link', { name: episodes[1].trackName })).toHaveAttribute('href', '/podcast/1/episode/124');
    })

    it('Format the date and duration of the episode', () => {
        render(<EpisodeList episodes={episodes} onItemClick={jest.fn} />);

        expect(screen.getByText('05/05/2020')).toBeInTheDocument();
        expect(screen.getByText('10/10/2020')).toBeInTheDocument();
        expect(screen.getByText('01:00')).toBeInTheDocument();
        expect(screen.getByText('01:01')).toBeInTheDocument();
    })

    it('Calls callback when the description is clicked', () => {
        const fn = jest.fn();

        render(<EpisodeList episodes={episodes} onItemClick={fn} />);
        const link = screen.getByRole('link', { name: episodes[0].trackName });
        fireEvent.click(link);

        expect(fn).toHaveBeenCalled()
    })
})