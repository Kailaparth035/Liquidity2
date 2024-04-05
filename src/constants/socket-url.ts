import {ENVIRONMENT} from './common';

const stage = {
  stock: 'https://ws.stage.satschel.com/stocks',
  crypto: 'wss://ws.stage.satschel.com/crypto/',
  forex: 'wss://ws.stage.satschel.com/forex/',
  all: 'wss://ws.coincap.io/prices?assets=ALL',
};

const prod = {
  stock: 'wss://ws.satschel.com/stocks/',
  crypto: 'wss://ws.satschel.com/crypto/',
  forex: 'wss://ws.satschel.com/forex/',
  all: 'wss://ws.coincap.io/prices?assets=ALL',
};

export const SOCKET_URL = {
  stock: ENVIRONMENT.isProduction ? prod.stock : stage.stock,
  crypto: ENVIRONMENT.isProduction ? prod.crypto : stage.crypto,
  forex: ENVIRONMENT.isProduction ? prod.forex : stage.forex,
  all: ENVIRONMENT.isProduction ? prod.all : stage.all,
};
