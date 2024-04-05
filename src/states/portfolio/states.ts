import {atom} from 'recoil';
import {IPortfolio} from './types';

export const PortfolioState = atom<IPortfolio>({
  key: 'portfolio-state',
  default: {
    commodities: {
      assets: [],
      summary: {
        change: 0,
        changeAmount: 0,
        changePercentage: 0,
        currentPrice: 0,
        currentValue: 0,
        gainLoss: 0,
        investedAmount: 0,
        investedPrice: 0,
        quantity: 0,
      },
    },
    crypto: {
      assets: [],
      summary: {
        change: 0,
        changeAmount: 0,
        changePercentage: 0,
        currentPrice: 0,
        currentValue: 0,
        gainLoss: 0,
        investedAmount: 0,
        investedPrice: 0,
        quantity: 0,
      },
    },
    forex: {
      assets: [],
      summary: {
        change: 0,
        changeAmount: 0,
        changePercentage: 0,
        currentPrice: 0,
        currentValue: 0,
        gainLoss: 0,
        investedAmount: 0,
        investedPrice: 0,
        quantity: 0,
      },
    },
    privates: {
      assets: [],
      summary: {
        change: 0,
        changeAmount: 0,
        changePercentage: 0,
        currentPrice: 0,
        currentValue: 0,
        gainLoss: 0,
        investedAmount: 0,
        investedPrice: 0,
        quantity: 0,
      },
    },
    stocks: {
      assets: [],
      summary: {
        change: 0,
        changeAmount: 0,
        changePercentage: 0,
        currentPrice: 0,
        currentValue: 0,
        gainLoss: 0,
        investedAmount: 0,
        investedPrice: 0,
        quantity: 0,
      },
    },
    sba7: {
      assets: [],
      summary: {
        change: 0,
        changeAmount: 0,
        changePercentage: 0,
        currentPrice: 0,
        currentValue: 0,
        gainLoss: 0,
        investedAmount: 0,
        investedPrice: 0,
        quantity: 0,
      },
    },
    walletBalance: {
      assets: [],
      summary: {
        change: 0,
        changeAmount: 0,
        changePercentage: 0,
        currentPrice: 0,
        currentValue: 0,
        gainLoss: 0,
        investedAmount: 0,
        investedPrice: 0,
        quantity: 0,
      },
    },
  },
});

export const LoadingPortfolioState = atom<boolean>({
  key: 'loadding-portfolio-state',
  default: false,
});
