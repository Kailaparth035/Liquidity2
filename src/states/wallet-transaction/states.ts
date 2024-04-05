import {atom} from 'recoil';

export const AllWalletTransactionState = atom<any[]>({
  key: 'all-wallet-transaction-state',
  default: [],
});

export const SelectedWalletTransactionState = atom<any>({
  key: 'selected-wallet-transaction-state',
  default: {},
});
