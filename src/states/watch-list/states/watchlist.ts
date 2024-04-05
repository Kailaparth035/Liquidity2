import {atom} from 'recoil';

interface Asset {
  symbol: string;
  index: number;
  type: string;
  _id: string;
  name: string;
  marketPrice: any;
  change: any;
  image: string;
  rawSymbol?: string;
}

interface IWatchListState {
  _id: string;
  name: string;
  assets: Asset[];
}

export const WatchListState = atom<IWatchListState[]>({
  key: 'watchlist-state',
  default: [],
});

export const UserWatchListState = atom<IWatchListState | undefined>({
  key: 'user-watchlist-state',
  default: undefined,
});

export const IsAddedToWatchListState = atom<boolean>({
  key: 'is-added-to-watchlist-state',
  default: false,
});

export const IsWatchListLoaderState = atom<boolean>({
  key: 'is-watchlist-loader-state',
  default: false,
});

export const IsAddWatchListLoaderState = atom<boolean>({
  key: 'is-add-watchlist-loader-state',
  default: false,
});

export const InitialRouteNameState = atom<string>({
  key: 'initial-route-name-state',
  default: '',
});
