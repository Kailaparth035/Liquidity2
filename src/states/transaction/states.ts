import { atom } from "recoil";

export const TransactionsState = atom<any[]>({
    key: 'transaction-state',
    default: [],
});


export const SelectedTransactionMemoState = atom<string>({
    key: 'selected-transaction-memo-state',
    default: '',
});

export const BuyLoadingState = atom({
    key: 'buy-loading-state',
    default: false,
});

export const SellLoadingState = atom({
    key: 'sell-loading-state',
    default: false,
});
