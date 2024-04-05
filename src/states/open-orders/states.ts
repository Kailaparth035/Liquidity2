import {atom} from 'recoil';

export const OpenOrderState = atom<any>({
  key: 'open-order-state',
  default: [],
});
export const ExecutedOrderState = atom<any>({
  key: 'executed-order-state',
  default: {},
});
export const CanceledOrderState = atom<any>({
  key: 'cancel-order-state',
  default: {},
});
export const AllOpenOrdersState = atom<any>({
  key: 'all-open-orders-state',
  default: {},
});
export const OpenOrdersConfigState = atom<any>({
  key: 'open-orders-config-state',
  default: 0,
});
export const ExecutedOrdersConfigState = atom<any>({
  key: 'executed-orders-config-state',
  default: 0,
});
export const CanceledOrdersConfigState = atom<any>({
  key: 'cancel-orders-config-state',
  default: 0,
});
export const IsCancelConfirmationState = atom<any>({
  key: 'is-cancel-confirmation-state',
  default: false,
});
export const IsExtraModalState = atom<any>({
  key: 'is-extra-Modal-state',
  default: false,
});
export const IsOrderModifyingState = atom<any>({
  key: 'is-order-modifying-state',
  default: false,
});

export const SelectedOrderState = atom<any>({
  key: 'selected-order-state',
  default: {},
});

export const ModifiedOrderState = atom<any>({
  key: 'modified-order-state',
  default: {
    id: 0,
    quantity: 0,
  },
});

export const IsOptionsSheetOpenState = atom<boolean>({
  key: 'options-sheet-open-state',
  default: false,
});

export const IsBuyOpenOrderState = atom<boolean>({
  key: 'is-buy-options-sheet-open-state',
  default: false,
});
export const isBidsVisibleState = atom<boolean>({
  key: 'is-bids-visible-state',
  default: false,
});

export const OpenAuctionBidState = atom<any>({
  key: 'open-auction-bids-state',
  default: [],
})

export const OutbidAuctionBidState = atom<any>({
  key: 'outbid-auction-bids-state',
  default: [],
})

export const WonAuctionBidState = atom<any>({
  key: 'won-auction-bids-state',
  default: [],
})

export const OpenAuctionConfigState = atom<any>({
  key: 'open-auction-config-state',
  default: 0,
})
export const OutbidAuctionConfigState = atom<any>({
  key: 'outbid-auction-config-state',
  default: 0,
})
export const WonAuctionConfigState = atom<any>({
  key: 'won-auction-config-state',
  default: 0,
})
