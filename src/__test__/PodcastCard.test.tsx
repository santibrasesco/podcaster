import { PodcastCard } from '@/app/components/podcastCard/PodcastCard'
import { Podcast } from '@/entities/Podcast'
import { render, screen } from '@testing-library/react'

describe('PodcastCard', () => {
    it('Renders podcast data', () => {
        const podcast: Podcast = {
            id: '1',
            author: 'author',
            title: 'title',
            summary: '',
            image: 'http://url-image'
        };

        render(<PodcastCard podcast={podcast} />)

        expect(screen.getByRole('img', { name: 'Image podcast title' }).getAttribute('src'))
            .toContain(encodeURIComponent('http://url-image'));
        expect(screen.getByText('Author: author')).toBeInTheDocument();
        expect(screen.getByText('title')).toBeInTheDocument();
    })
})