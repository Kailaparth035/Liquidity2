import React, {useCallback, useEffect, useState} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';

import {NoData} from '../../../../components';
import {FlatListScroll} from '../../../../storybook/flatlist';
import {PortASset} from './port-asset';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {
  AccessTokenState,
  PortfolioState,
  ProfileDataState,
  portFolioConfigState,
} from '../../../../states';
import {useNetwork} from '../../../../../src/hooks';
import {APIS} from '../../../../constants';
import {Loader} from '../../../../storybook';
import {portfolioAssetsStyle} from './portfolio-assets.styles';

const MAP_TABS: {[type: string]: string} = {
  Private: 'privates',
  Sba7: 'Sba7',
  // Commodity: 'commodities',
  // Stock: 'stocks',
  // Forex: 'forex',
};

export const PortfolioAssets = ({tab, portfolio, navigation}: any) => {
  const type = (MAP_TABS[tab] ?? tab).toLowerCase();
  let assets = portfolio?.[type]?.assets ?? [];

  const [portfolioConfig, setPortfolioConfig] =
    useRecoilState(portFolioConfigState);
  const {get: portfolioGet} = useNetwork();
  const setPortfolio = useSetRecoilState(PortfolioState);
  const portfolioData = useRecoilValue(PortfolioState);
  const [assetsData, setAssetsData] = useState([...assets]);
  const [loader, setLoader] = useState(false);
  const profileData = useRecoilValue(ProfileDataState);
  const mergedData = (data: any, updatedData: any) => {
    let concatAssets = {
      privates: {
        ...data.privates,
        assets: [...data.privates.assets, ...updatedData?.privates?.assets],
      },
      sba7: {
        ...data.sba7,
        assets: [...data?.sba7?.assets, ...updatedData?.sba7?.assets],
      },
      music: {
        ...data.music,
        assets: [...data.music.assets, ...updatedData?.music?.assets],
      },
      stock: {
        ...data.stocks,
        assets: [...data.stocks.assets, ...updatedData?.stocks?.assets],
      },
      forex: {
        ...data.forex,
        assets: [...data.forex.assets, ...updatedData?.forex?.assets],
      },
      commodities: {
        ...data.commodities,
        assets: [
          ...data.commodities.assets,
          ...updatedData?.commodities?.assets,
        ],
      },
    };
    return concatAssets;
  };

  const onEndReached = (e: IEndReachedEvent) => {
    setLoader(true);
    const config = (portfolioConfig as any)[type];
    if (!config) {
      return;
    }
    const {limit, offset} = config;
    portfolioGet(APIS.Portfolio + `?limit=${limit}&offset=${offset + 1}`)
      .then(async (response: any) => {
        if (response) {
          let temp: any = portfolioData;
          let updatedData = response?.data;
          let assetsConcat: any = await mergedData(temp, updatedData);

          let assetstemp = [...assetsConcat?.[type]?.assets] ?? [];
          setAssetsData([...assetstemp]);
          setPortfolio({...assetsConcat});
          setPortfolioConfig(prev => {
            const config = JSON.parse(JSON.stringify(prev));
            const typeConfig = config[type];
            config[type] = {
              ...typeConfig,
              offset: typeConfig.offset + 1,
            };
            return {...config};
          });
          setLoader(false);
        }
      })
      .catch(error => {
        setLoader(false);
      });
  };

  const onRefresh = () => {
    portfolioGet(APIS.Portfolio + `?limit=20&offset=0`)
      .then(async (response: any) => {
        if (response) {
          let updatedData = response?.data;
          let assetstemp = [...updatedData?.[type]?.assets] ?? [];
          setAssetsData([...assetstemp]);
          setPortfolio({...updatedData});
          setLoader(false);
        }
      })
      .catch(error => {
        setLoader(false);
      });
  };

 

  return (
    <View
      style={[
        portfolioAssetsStyle.container,
        {paddingBottom: profileData?.isVerifiedEmail ? 0 : 80},
      ]}>
      {loader && (
        <View style={portfolioAssetsStyle.loaderView}>
          <Loader top={Dimensions.get('window').height / 7} />
        </View>
      )}
      {assets.length > 0 ? (
        <FlatListScroll
          data={assetsData}
          renderItem={({item}) => (
            <PortASset item={item} navigation={navigation} tab={tab} />
          )}
          keyExtractor={(item, i) => `${item.name}__${i}`}
          onEndReached={e => {
            onEndReached(e);
          }}
          reload={() => onRefresh()}
        />
      ) : (
        <NoData msg="No portfolio items!" />
      )}
    </View>
  );
};
