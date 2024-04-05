interface INews {
  symbol: string;
  publishedDate: string;
  title: string;
  image: string;
  site: string;
  text: string;
  url: string;
}

interface IPerDay {
  value: number;
  time: any;
}

interface ICurrentPrice {
  symbol: string;
  price: number;
  volume: number;
}

interface IProfile {
  symbol: string;
  price: number;
  beta: number;
  volAvg: number;
  mktCap: number;
  lastDiv: number;
  range: string;
  changes: number;
  companyName: string;
  currency: string;
  cik: string;
  isin: string;
  cusip: string;
  exchange: string;
  exchangeShortName: string;
  industry: string;
  website: string;
  description: string;
  ceo: string;
  sector: string;
  country: string;
  fullTimeEmployees: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  dcfDiff: number;
  dcf: number;
  image: string;
  imageFrom?: string;
  imageTo?: string;
  ipoDate: string;
  defaultImage: boolean;
  isEtf: boolean;
  isActivelyTrading: boolean;
  isAdr: boolean;
  isFund: boolean;
}

interface IDetail {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  volume: number;
  avgVolume: number;
  exchange: string;
  open: number;
  previousClose: number;
  eps: number;
  pe: number;
  earningsAnnouncement: Date;
  sharesOutstanding: number;
  timestamp: number;
  assetPrice?: number;
}

export interface IHistorical {
  date: string;
  label: string;
  adjDividend: number;
  dividend: number;
  recordDate: string;
  paymentDate: string;
  declarationDate: string;
}

interface IHistoricalDividends {
  symbol: string;
  historical: IHistorical[];
}

export interface IHistorical2 {
  date: string;
  label: string;
  numerator: number;
  denominator: number;
}

interface IHistoricalSplits {
  symbol: string;
  historical: IHistorical2[];
}

interface IEvents {
  historicalDividends: IHistoricalDividends;
  historicalSplits: IHistoricalSplits;
}

interface IBalanceSheet {
  netDebt: number;
  totalDebt: number;
  totalAssets: number;
}

interface ISelectedAssestDetails {
  news?: INews[];
  perDay?: IPerDay[];
  currentPrice?: ICurrentPrice;
  profile?: IProfile;
  detail?: IDetail;
  events?: IEvents;
  balanceSheet?: IBalanceSheet;
  priceToEarning?: number;
  priceToBook?: number;
  enterpriseValue?: number;
  dividendYield?: number;
}

interface ISelectedAssestDetails {
  news?: INews[];
  perDay?: IPerDay[];
  currentPrice?: ICurrentPrice;
  profile?: IProfile;
  detail?: IDetail;
  events?: IEvents;
  balanceSheet?: IBalanceSheet;
  priceToEarning?: number;
  priceToBook?: number;
  enterpriseValue?: number;
  dividendYield?: number;
}
export interface IAllSelectedAssests {
  [key: string]: ISelectedAssestDetails;
}

export interface ISelectedMusicAssestDetails {
  _id?: string;
  album: IAlbulm[];
  artist?: IArtist;
  duration?: number;
  id?: string;
  image_url?: string;
  maxSupply?: number;
  musicId?: string;
  name?: string;
  previewUrls: IPreviewUrls;
  preview_url?: string;
  price: 2;
  releaseDate?: string;
  statistics?: statistics;
  symbol?: string;
  tags?: string;
  change: number;
  changesPercentage: number;
}
interface IAlbulm {
  id?: number;
  label?: string;
  name?: string;
  release_date: string;
  upc: string;
}

interface IArtist {
  city?: string;
  cover_url?: string;
  description?: string;
  gender?: string | null;
  genres?: [];
  id?: string;
  image_url?: string;
  name?: string;
  rank?: number;
  riaa_awards?: [];
  tags?: [];
  topTracks?: [];
}

interface IPreviewUrls {
  amazon_music_url?: string;
  itunes_url?: string;
  spotify_url?: string;
}
interface statistics {
  soundCloud?: {plays: number};
  spotify?: {plays: number};
  tiktok?: {plays: number};
  youtube?: {
    likes?: number;
    plays?: number;
  };
}
export interface ISelectedMusicAssets {
  [key: string]: ISelectedMusicAssestDetails;
}
