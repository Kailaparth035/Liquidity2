export interface IFile {
  uri: string;
  type: string;
  file: string;
}

export interface ICreator {
  label: string;
  address: string;
  share: number;
  verified?: boolean;
}

export interface ISigner {
  address: string;
}

export interface IWhitelisted {
  address: string;
}

interface IProperties {
  files: IFile[];
  category: string;
  creators: ICreator[];
  signers: ISigner[];
  whitelisted: IWhitelisted[];
  maxSupply: string;
}

interface IMetaData {
  name: string;
  symbol: string;
  description: string;
  image: string;
  type: string;
  memo: string;
  properties: IProperties;
  seller_fee_basis_points?: number;
  external_url: string;
}

interface IWhitelisted2 {
  address: string;
  weight: number;
  _id: string;
}

interface IProfile {
  symbol: string;
  price: number;
  beta: number;
  volAvg: number;
  mktCap: any;
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

export interface IToken {
  _id: string;
  name: string;
  symbol: string;
  blockchain: string;
  address: string;
  signature: string;
  metadata: IMetaData;
  whitelisted: IWhitelisted2[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  profile: IProfile;
  balance: number;
  price: any;
  currentPrice: number;
  logo: string;
  maxSupply: string;
}

export interface ICurrency {
  code: string;
  symbol: string;
  thousandsSeparator: string;
  decimalSeparator: string;
  symbolOnLeft: boolean;
  spaceBetweenAmountAndSymbol: boolean;
  decimalDigits: number;
  rate: string;
}

export interface ILanguage {
  language: string;
  navigation: string[];
  trade: {
    topNave: string[];
  };
  news: string[];
  order: string[];
  portfolio: string[];
  profile: string[];
}
