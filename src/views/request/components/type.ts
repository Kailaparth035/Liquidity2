interface IWhitelisted {
  address: string;
}

interface IProperties {
  files: any[];
  category: string;
  creators: any[];
  signers: any[];
  whitelisted: IWhitelisted[];
}

interface IMetaData {
  name: string;
  symbol: string;
  description: string;
  image: string;
  type: string;
  memo: string;
  properties: IProperties;
}

interface IWhitelisted2 {
  address: string;
  weight: number;
  _id: string;
}

interface IToken {
  _id: string;
  name: string;
  symbol: string;
  blockchain: string;
  address: string;
  signature: string;
  issuerSecret: string;
  metaData: IMetaData;
  whitelisted: IWhitelisted2[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRequest {
  _id: string;
  token: IToken;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
}
