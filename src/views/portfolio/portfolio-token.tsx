import React, {useCallback} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {portfolioStyles as styles} from './portfolio.styles';
import {AssetsState, SelectedTokenState} from '../../states';
import { Routes } from '../routes/constants';

const PortFolioTokens = ({navigation}: any) => {
  const assets = useRecoilValue(AssetsState);
  const setSelectedToken = useSetRecoilState(SelectedTokenState);

  const handleTokenDetails = useCallback((selectedToken) => {
    setSelectedToken(selectedToken);
    navigation.navigate(Routes.TokenDetails);
  }, []);
  
  return (
    <>
      {[...(assets?.data ?? [])].reverse()?.map((item, i) => (
        <TouchableOpacity
          onPress={() => handleTokenDetails(item)}
          key={`${item.name}_${item.symbol}_${i}`}>
          <View style={[styles.views, {borderTopWidth: i === 0 ? 0 : 0.4}]}>
            <View>
              <Image source={{uri: item.metaData.image}} style={styles.img} />
            </View>
            <View style={styles.rightSide}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.symbol}>{item.symbol}</Text>
              </View>
              <View>
                <Text style={styles.dollar}>
                  ${item.currentPrice.toFixed(2)}
                </Text>
                <View style={styles.qltContain}>
                  <Text style={styles.qlt}>Qlt.</Text>
                  <Text style={styles.qltTxt}>{item.balance}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default PortFolioTokens;
