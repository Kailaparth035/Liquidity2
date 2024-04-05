import { atom } from 'recoil';

export const IsDeleteWatchlistState = atom<boolean>({
    key: 'is-delete-watchlist-state',
    default: false,
});
