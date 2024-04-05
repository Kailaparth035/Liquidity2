export type BankAccountMetadataType = {
  _id: string;
  bankName: string;
  accounts: BankAccountType[];
};

export type BankAccountType = {
  name?: string;
  officialName?: string;
  accountId: string;
  mask?: string;
  subtype?: string;
  type?: string;
};
