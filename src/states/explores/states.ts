import {atom} from 'recoil';

export const ExploresState = atom<any>({
  key: 'explores-state',
  default: {},
});

export const PrivateExploresState = atom<any[]>({
  key: 'private-explores-state',
  default: [],
});

export const StocksExploresState = atom<any[]>({
  key: 'stocks-explores-state',
  default: [],
});

export const CryptoExploresState = atom<any[]>({
  key: 'crypto-explores-state',
  default: [],
});

export const CommoditiesExploresState = atom<any[]>({
  key: 'commodities-explores-state',
  default: [],
});

export const ForexExploresState = atom<any[]>({
  key: 'forex-explores-state',
  default: [],
});

export const MusicExploresState = atom<any[]>({
  key: 'music-explores-state',
  default: [],
});
export const Sba7ExploresState = atom<any[]>({
  key: 'sba7-explores-state',
  default: [],
});
export const IsExploresState = atom<boolean>({
  key: 'is-explores-state',
  default: false,
});

interface PerDay {
  value: number;
  time: any;
}

export interface IAllExploreAssets {
  id: string;
  name: string;
  symbol: string;
  marketPrice: string;
  change: string;
  changesPercentage: number;
  image: string;
  perDay: PerDay[];
  type?: string;
}
export interface IAllWatchListAssets {
  symbol: string;
  index: number;
  type: string;
  _id: string;
  name: string;
  marketPrice: any;
  change: any;
  image: string;
}

export const AllExploreAssets = atom<IAllExploreAssets[]>({
  key: 'all-explore-assets',
  default: [],
});

export const AllWatchListAssets = atom<IAllWatchListAssets[]>({
  key: 'all-watchlist-assets',
  default: [],
});
export const SelectedAssetSheetState = atom<any>({
  key: 'selected-asset-sheet-state',
  default: {},
});

export const ExploresPaginationLoading = atom({
  key: 'explore-pagination-loading-state',
  default: false,
});

export const ExploresConfigState = atom({
  key: 'explore-config-state',
  default: {
    stocks: {
      limit: 20,
      offset: 0,
    },
    crypto: {
      limit: 20,
      offset: 0,
    },
    forex: {
      limit: 20,
      offset: 0,
    },
    commodities: {
      limit: 20,
      offset: 0,
    },
    privates: {
      limit: 20,
      offset: 0,
    },
    music: {
      limit: 20,
      offset: 0,
    },
  },
});

export const StocksConfigState = atom({
  key: 'explore-stocks-config-state',
  default: {
    limit: 20,
    offset: 0,
  },
});

export const portFolioConfigState = atom({
  key: 'portfolio-config-state',
  default: {
    stocks: {
      limit: 20,
      offset: 0,
    },
    crypto: {
      limit: 20,
      offset: 0,
    },
    forex: {
      limit: 20,
      offset: 0,
    },
    commodities: {
      limit: 20,
      offset: 0,
    },
    privates: {
      limit: 20,
      offset: 0,
    },
    music: {
      limit: 20,
      offset: 0,
    },
  },
});
