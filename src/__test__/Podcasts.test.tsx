import { Podcasts } from "@/app/components/podcasts/Podcasts"
import { usePodcastState, usePodcastDispatch, useNavigation } from "@/context/PodcastContext";
import { initialState, State } from "@/context/types"
import { PODCASTS_STORAGE_KEY } from "@/hooks/usePodcasts";
import { fetchTopPodcasts } from "@/services/podcastService";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation");
jest.mock("../context/PodcastContext");
jest.mock("../services/podcastService");

describe('Podcasts page integration test', () => {
    let state: State;
    (usePodcastDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useNavigation as jest.Mock).mockReturnValue([false, jest.fn()]);
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    // (fetchTopPodcasts as jest.Mock).mockReturnValue(jest.fn());
    const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
    const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');

    beforeEach(() => {

        state = {
            ...initialState,
            podcasts: [{
                id: '1',
                title: 'title test 1',
                author: 'author test 1',
                summary: 'summary test 1',
                image: 'http://img-1'
            }, {
                id: '2',
                title: 'title test 2',
                author: 'author test 2',
                summary: 'summary test 2',
                image: 'http://img-2'
            }, {
                id: '3',
                title: 'title test 3',
                author: 'searching',
                summary: 'summary test 3',
                image: 'http://img-3'
            }]
        };

        (fetchTopPodcasts as jest.Mock).mockClear();
        (useNavigation as jest.Mock).mockClear();
        (useRouter as jest.Mock).mockClear();
        (usePodcastState as jest.Mock).mockReturnValue(state);
        mockGetItem.mockClear();
        mockSetItem.mockClear();

    })



    it('Filter podcasts by search filter', () => {
        jest.mock("../hooks/usePodcasts");
        (usePodcastState as jest.Mock).mockReturnValue(state);

        state.filterSearch = 'search';
        render(<Podcasts />);

        expect(screen.queryByText(`Author: ${state.podcasts[0].author}`)).toBe(null);
        expect(screen.queryByText(`Author: ${state.podcasts[1].author}`)).toBe(null);
        expect(screen.getByText(`Author: ${state.podcasts[2].author}`)).toBeInTheDocument();
    })

    it('Navigate to podcast details when clicking a podcast card', () => {
        jest.mock("../hooks/usePodcasts");
        (usePodcastState as jest.Mock).mockReturnValue(state);

        render(<Podcasts />);

        const urlDetail = `/podcast/${state.podcasts[0].id}`;
        const card = screen.queryAllByRole('link')[0];
        fireEvent.click(card);

        expect(useRouter().push).toHaveBeenCalledWith(urlDetail);
    })

    it('Fetches the podcasts from api and save them into local storage', async () => {
        (fetchTopPodcasts as jest.Mock).mockReturnValue(state.podcasts);

        const timestamp = Date.now();
        global.Date.now = jest.fn(() => timestamp);

        render(<Podcasts />);

        await waitFor(() => {
            expect(fetchTopPodcasts).toHaveBeenCalledTimes(1);
            expect(mockGetItem).toHaveBeenCalledTimes(1);
            expect(mockSetItem).toHaveBeenCalledWith(PODCASTS_STORAGE_KEY, JSON.stringify({
                timestamp,
                data: state.podcasts
            }));
        })
    })

    it('Fetches the podcast from local storage', async () => {
        mockGetItem.mockReturnValue(JSON.stringify({
            timestamp: Date.now(),
            data: state.podcasts
        }))

        render(<Podcasts />);

        await waitFor(() => {
            expect(fetchTopPodcasts).toHaveBeenCalledTimes(0);
            expect(mockGetItem).toHaveBeenCalledTimes(1);
            expect(mockGetItem).toHaveBeenCalledWith(PODCASTS_STORAGE_KEY);
        })
    })

    it('Fetches the podcast from local storage if data is expired', async () => {
        (fetchTopPodcasts as jest.Mock).mockReturnValue(state.podcasts);
        const date = new Date();
        date.setDate(date.getDate() - 1);
        date.setHours(date.getHours() - 1);

        mockGetItem.mockReturnValue(JSON.stringify({
            timestamp: date.getTime(),
            data: state.podcasts
        }))

        render(<Podcasts />);

        await waitFor(() => {
            expect(fetchTopPodcasts).toHaveBeenCalledTimes(1);
            expect(mockGetItem).toHaveBeenCalledTimes(1);
        })
    })
})