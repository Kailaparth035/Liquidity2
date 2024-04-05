import { atom } from 'recoil';

export const loginNumberState = atom<string>({
  key: 'login-number',
  default: '',
});

export const countryCodeState = atom<string>({
  key: 'country-code',
  default: '+1',
});

export const IsUserLoginState = atom<boolean>({
  key: 'user-login',
  default: false,
});

export const IsOtpState = atom<boolean>({
  key: 'is-otp',
  default: false,
});

export const OtpCodeState = atom<string>({
  key: 'otp-code',
  default: '',
});

export const IsConnectState = atom<boolean>({
  key: 'is-connect-state',
  default: false,
});

export const PublicDataState = atom<any>({
  key: 'public-data',
  default: {
    publicKey: {
      publicKey: 'EiD4VB7cYVEsefEJbmnS5oSJhGFehQoED3Khz1DZpj62',
    },
  },
});

// Deprecated
export const InfoDataState = atom<any>({
  key: 'info-data',
  default: {
    solana: { changePercent24Hr: '0', priceUsd: '0', balance: 0 },
    stellar: { changePercent24Hr: '0', priceUsd: '0', balance: 0 },
  },
});

export const InfoState = atom<any>({
  key: 'blockchain-info',
  default: {},
});

export const currentState = atom<any>({
  key: 'current-value',
  default: "",
});

export const KeyChainDataState = atom<any>({
  key: 'key-chain-data',
  default: {
    solana: {},
    stellar: {},
  },
});

export const IsModalOpenState = atom<boolean>({
  key: 'is-modal-open-state',
  default: false,
});

export const IsFundWalletOpenState = atom<boolean>({
  key: 'is-fund-wallet-open-state',
  default: false,
});

export const IsLinkedDeviceState = atom<boolean>({
  key: 'is-lined-device-state',
  default: false,
});