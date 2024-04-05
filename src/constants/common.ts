export const ERROR_MESSAGE =
  'Oops! Something went wrong. Please try again later.';

export const ENVIRONMENT = {
  isProduction: false,
};

export const START_INVESTMENT =
  'You can start your investment journey by adding assets to your portfolio';
export const EMPTY_PORTFOLIO = 'Hey! looks like your portfolio is empty';
export const VERIFY_KYC = 'Before you can start trading or do any transaction, we require some essential verification details from you or your entity.';
export const RE_INITIATE_KYC = 'As part of compliance requirements, due to absence of state issued Id card your kyc submission has been rejected.';

export const FILE_OPTIONS = 'File options clicked';
export const REVIEW =
  'Once verified you’ll be able to trade and access your wallet';
export const NO_DATA_AVAILABLE = 'No data available';
export const CO_OWNER_NO_DATA = 'Nothing Here';
export const NO_ASSET = 'No assets available in this category at the moment';
export const SUB_NO_ASSET =
  'Keep an eye on this space for upcoming opportunities, or consider exploring other asset categories.';
export const NOT_AVAILABLE = 'N.A.';
export const SUCCESS_TEXT =
  '  Your KYC verification done succesfully, now you can buy, sell, trade, and access your wallet';
export const NO_DATA = '-';
export const LOGOUT_CONFIRMATION_TITLE = 'Logout of Liquidity?';
export const LOGOUT_CONFIRMATION_DESC =
  'Are you sure you want to logout? You can always logback in at any time.';
export const NO_NEWS = 'No news for this asset';
export const NO_OVERVIEW_DATA = ' No Data for this asset';
export const CONFIRM_CANCEL_ORDER =
  'Canceling order will remove it from the order book. Do you want to cancel?';
export const ADD_CO_OWNERS_DESC =
  'Add auth user or co-owner to allow them access your portfolio';
export const GENDERS = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
  {label: 'Other', value: 'other'},
];

export const STOCK_DETAILS_TABS = [
  {
    title: 'OverView',
    index: 1,
  },
  {
    title: 'News',
    index: 2,
  },
  {
    title: 'Events',
    index: 3,
  },
];

export const CHART_INTERVALS = {
  DAY: '1D',
  WEEK: '1W',
  MONTH: '1M',
  YEAR: '1Y',
  '2YEAR': '2Y',
  '5YEAR': '5Y',
};

export const MOMENT_TYPES = {
  [CHART_INTERVALS.DAY]: 'days',
  [CHART_INTERVALS.WEEK]: 'weeks',
  [CHART_INTERVALS.MONTH]: 'months',
  [CHART_INTERVALS.YEAR]: 'years',
  [CHART_INTERVALS['2YEAR']]: 'years',
  [CHART_INTERVALS['5YEAR']]: 'years',
};

export const CHART_INTERVALS_TYPE = {
  [CHART_INTERVALS.DAY]: 'day',
  [CHART_INTERVALS.WEEK]: 'week',
  [CHART_INTERVALS.MONTH]: 'month',
  [CHART_INTERVALS.YEAR]: 'year',
  [CHART_INTERVALS['2YEAR']]: 'year',
  [CHART_INTERVALS['5YEAR']]: 'year',
};

export const CHART_TABS = [
  CHART_INTERVALS.DAY,
  CHART_INTERVALS.WEEK,
  CHART_INTERVALS.MONTH,
  CHART_INTERVALS.YEAR,
  CHART_INTERVALS['2YEAR'],
];

export const ASSETS_DETAILS_TAB = {
  OVERVIEW: 'OverView',
  NEWS: 'News',
  EVENTS: 'Events',
};

export const ASSETS = {
  STOCK: 'stock',
  CRYPTO: 'crypto',
  COMMODITY: 'commodity',
  FOREX: 'forex',
  MARKETINDEX: 'marketIndex',
  PARIVATE: 'private',
  MUSIC: 'music',
};

export const MULTI_ASSETS = {
  STOCKS: 'stocks',
  CRYPTO: 'crypto',
  COMMODITIES: 'commodities',
  FOREX: 'forex',
  MARKETINDEX: 'marketIndex',
  PRIVATES: 'privates',
};

export const BLOCKCHAIN_TERMS = {
  SPLIT: 'split',
  DIVIDEND: 'dividend',
  CASH_DIVIDEND: 'Cash Dividend',
  SHARE_SPLIT: 'Share Split',
  RECORD_DATE: 'Record Date',
  EX_DATE: 'Ex Date',
};

export const ASSET_CATEGORIES: {[key: string]: string} = {
  stocks: 'stock',
  crypto: 'crypto',
  commodities: 'commodity',
  forex: 'forex',
  privates: 'privates',
  marketIndexs: 'marketIndex',
  music: 'music',
};

export const ASSETS_TO_SINGULAR: any = {
  stocks: 'Stocks',
  crypto: 'Crypto',
  commodities: 'Commodities',
  forex: 'Forex',
  privates: 'Privates',
  music: 'Music',
  sba7: 'Sba7',
};

export const MODE = {
  DARK: 'Dark',
  LIGHT: 'Light',
};

export const CHART_COLORS: any = {
  privates: ['#1472ff', '#1472ff'],
  sba7: ['#F2432A', '#FBA426'],
  cash: ['#14B855', '#2AB87E'],
  // In future require this code for music and another assets
  // music: ['#4935A6', '#8170D2'],
  // stocks: ['#4343EF', '#03012D'],
  // commodities: ['#F2432A', '#FBA426'],
  // forex: ['#1C8099', '#2FC8C3'],
};
export const PRIVACY_POLICY_URL = 'https://simplici.io/privacy-policy/';

export const ORDER_TYPE = {
  pending: 'PENDING',
  executed: 'EXECUTED',
  cancelled: 'CANCELLED',
};

export const ORDER_TABS = {
  open: 'Open',
  executed: 'Executed',
  cancelled: 'Canceled',
};

export const BID_TABS = {
  open: 'Open',
  outbid: 'Outbid',
  won: 'Won',
};
