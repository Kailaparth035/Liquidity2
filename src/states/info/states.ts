import type { ICurrency, IToken } from '../../views/portfolio/types';

import { atom } from 'recoil';

export const IsInfoLoaderState = atom<boolean>({
  key: 'is-info-loader-modal',
  default: true,
});

export const ProfileDataState = atom<any>({
  key: 'profile-data-modal',
  default: {},
});
export const LinkListState = atom<any>({
  key: 'list-list-state',
  default: [],
});

export const KycProfileDataState = atom<any>({
  key: 'kycprofile-data-modal',
  default: {},
});

export const ApproveDataState = atom<any>({
  key: 'approve-data',
  default: {},
});

export const SendDataState = atom<any>({
  key: 'send-data',
  default: [],
});

export const AssetsState = atom<any>({
  key: 'assets',
  default: {},
});

export const SolValueState = atom<any>({
  key: 'sol-value-state',
  default: {},
});

export const SelectedTokenState = atom<IToken>({
  key: 'selected-token-state',
  default: {},
});

export const SelectedCurrencyState = atom<ICurrency>({
  key: 'selected-currency-state',
  default: {
    code: 'USD',
    symbol: '$',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    symbolOnLeft: true,
    spaceBetweenAmountAndSymbol: false,
    decimalDigits: 2,
    rate: '10',
  },
});

export const SelectedLanguageState = atom<any>({
  //need to implement type
  key: 'selected-language-state',
  default: {
    key: 'en',
    language: 'English',
    navigation: {
      trade: 'Trade',
      news: 'News',
      order: 'Order',
      portfolio: 'Portfolio',
      profile: 'Profile',
    },
    trade: {
      topNav: {
        watchlist: 'Watchlist',
        stocks: 'Stocks',
        crypto: 'Crypto',
        privates: 'Privates',
        commodities: 'Commodities',
      },
    },
    news: {},
    orders: {},
    portfolio: {},
    profile: {},
  },
});

export const ExitApp = atom<boolean>({
  key: 'is-exit-app-enabled',
  default: true,
})

export const ProfilePcitureState = atom<string>({
  key: 'profile-picture',
  default: ''
})
