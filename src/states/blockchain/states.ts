import { atom } from "recoil";

export const BlockchainsState = atom({
  key: "blockchain-data",
  default: {},
});

interface ISocketDataAtom {
  [symbol: string]: number
}

export const CryptoSocketState = atom<ISocketDataAtom>({
  key: "crypto-socket-data",
  default: {},
});

export const StockSocketState = atom<ISocketDataAtom>({
  key: "stock-socket-data",
  default: {},
});

  