import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {numberDecimalFormat, toast} from '../../libs';
import {Loader} from '../../storybook/loader';
import {SVG} from '../../storybook/svg';
import {Svg_Solana, Svg_Stellar, COLORS} from '../../assets';
import {copyText, formatNumber} from '../utils';
import {useRecoilState, useRecoilValue} from 'recoil';
import {InfoState, KeyChainDataState} from '../../states';
import {useNetwork} from '../../hooks';
import {useInterval} from '../../hooks/use-interval';
import {tokenStyles as styles} from './tokens.styles';
import {APIS} from '../../constants';
import {useCurrency} from '../../hooks/use-currency';

const Tokens = () => {
  const [info, setBalances] = useRecoilState(InfoState);
  const keyChainData = useRecoilValue(KeyChainDataState);
  const [loader, setLoader] = useState(false);
  const {get} = useNetwork();
  const {formatCurrency} = useCurrency();
  const {colors} = useTheme();
  const fetchApi = useCallback(
    isSetLoading => {
      if (isSetLoading) {
        setLoader(true);
      }
      get(APIS.Info).then(res => {
        if (isSetLoading && res?.data) {
          setLoader(false);
        }
        if (res?.data) {
          setLoader(false);
          setBalances(res.data);
        }
      });
    },
    [keyChainData],
  );

  useEffect(() => {
    if (!Object.keys(info).length) {
      fetchApi(true);
    }
  }, [keyChainData]);

  useInterval(() => fetchApi(false), 5000);

  const {solana, stellar} = info ?? {};

  const data = useMemo(() => {
    const balances = [];
    if (solana) {
      balances.push({
        id: 1,
        ...solana,
        name: 'SOL',
        rateType: /-/gi.test(solana.changePercent24Hr) ? 'down' : 'up',
        blockchain: 'solana',
        icon: Svg_Solana,
      });
    }
    if (stellar) {
      balances.push({
        id: 2,
        ...stellar,
        name: 'XLM',
        rateType: /-/gi.test(stellar.changePercent24Hr) ? 'down' : 'up',
        blockchain: 'stellar',
        icon: Svg_Stellar,
      });
    }
    return balances;
  }, [solana, stellar]);

  const handleCopy = useCallback((message: string) => {
    copyText(message);
    toast('copied');
  }, []);

  const tokenRow = (token: any, index: number) => {
    const {
      id,
      priceUsd,
      blockchain,
      name,
      address,
      changePercent24Hr,
      rateType,
      balance,
      currentPrice,
      icon,
    } = token ?? {};
    return (
      <View key={id}>
        {index !== 0 && (
          <View style={[styles.line, {backgroundColor: colors.text}]} />
        )}
        <View style={styles.row}>
          <View style={styles.left}>
            <View style={styles.flexRow}>
              <Text style={[styles.priceHead, {color: colors.text}]}>
                Price
              </Text>
              <Text style={[styles.priceTxt, {color: colors.text}]}>
                {formatCurrency(priceUsd, 2) ?? 0}
              </Text>
            </View>
            <View style={styles.flexRow}>
              <View style={styles.icon}>
                <SVG name={icon} />
              </View>
              <View>
                <Text style={[styles.solTxt, {color: colors.text}]}>
                  {name}
                </Text>
                <Text style={[styles.solana, {color: colors.text}]}>
                  {blockchain}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.right}>
            <View style={styles.rateContain}>
              <Icon
                size={24}
                color={
                  rateType === 'up' ? COLORS['price-up'] : COLORS['price-down']
                }
                name={rateType === 'up' ? 'arrow-drop-up' : 'arrow-drop-down'}
              />
              <Text
                style={[
                  styles.priceTxt,
                  {
                    color:
                      rateType === 'up'
                        ? COLORS['price-up']
                        : COLORS['price-down'],
                  },
                ]}>
                {numberDecimalFormat(changePercent24Hr)}%
              </Text>
            </View>
            <Text style={[styles.qlt, {color: colors.text}]}>
              {formatNumber(balance)}
            </Text>
            <Text style={[styles.price, {color: colors.text}]}>
              {formatCurrency(currentPrice, 2) ?? 0}
            </Text>
          </View>
        </View>
        <View style={[styles.row, styles.wallets]}>
          <View style={styles.walletContain}>
            <Text style={[styles.walletLabel, {color: colors.text}]}>
              Wallet Address
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.walletTxt, {color: colors.text}]}>
              {address}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.copyBtn, {backgroundColor: colors.ground}]}
            onPress={() => handleCopy(address)}>
            <Icon
              name="content-copy"
              size={18}
              color={COLORS['input-border-focus-dark']}
              style={styles.copyIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return loader ? (
    <Loader />
  ) : (
    <ScrollView style={styles.container}>{data.map(tokenRow)}</ScrollView>
  );
};

export default Tokens;
