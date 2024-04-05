export interface IOwner {
  _id: string;
  isActive: boolean;
  isTradeEnabled: boolean;
  name: string;
  ownerId: string;
  profileImage: string;
  type: string;
}

export interface IAccount {
  isPrimary: boolean;
  name: string;
  ownerId: string;
  profileImage: string;
}

export interface IOwnerDetails {
  _id: string;
  countryCode: string;
  email: string;
  isTradeEnabled: boolean;
  name: string;
  phone: string;
  status: string;
  type: string;
}