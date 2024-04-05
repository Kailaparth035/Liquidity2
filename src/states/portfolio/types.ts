

  interface Summary {
        change: number;
        changeAmount: number;
        changePercentage: number;
        currentPrice: number;
        currentValue: number;
        gainLoss: number;
        investedAmount: number;
        investedPrice: number;
        quantity: number;
    }

     interface assetsType {
        assets: any[];
        summary: Summary;
    }

    export interface IPortfolio {
        commodities:assetsType
        crypto:assetsType
        forex:assetsType
        privates:assetsType
        stocks:assetsType
        walletBalance:assetsType
        sba7:assetsType
    }



