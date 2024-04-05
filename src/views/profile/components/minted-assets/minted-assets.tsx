import React, {useCallback, useState, useEffect} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {useTheme} from '@react-navigation/native';

import {Header} from '../../../../components';
import {APIS, NOT_AVAILABLE, NO_DATA} from '../../../../constants';
import {useNetwork} from '../../../../hooks/use-network';
import {isDarkModeState, SelectedTokenState} from '../../../../states';
import {Loader} from '../../../../storybook/loader';
import {FlatListScroll} from '../../../../storybook/flatlist';
import {Routes} from '../../../routes/constants';
import {NoData} from '../../../../components/empty-state';
import {MintedAssetStyles as styles} from './minted-assets.styles';
import {Svg_No_Assets} from '../../../../assets';
import {useCurrency} from '../../../../hooks/use-currency';
import {formatNumber} from '../../../utils';
import {Svg_No_Assets_Light} from '../../../../assets/icon/svg/no-assets-light';

export const MintedAssets = ({navigation}: any) => {
  const setSelectedToken = useSetRecoilState(SelectedTokenState);
  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeState);
  const {get, data, loading} = useNetwork();
  const [assets, setAssets] = useState([]);
  const {colors} = useTheme();

  useEffect(() => {
    get(APIS.Tokens);
  }, []);

  useEffect(() => {
    if (data?.data) {
      setAssets(data.data);
    }
  }, [data]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleIpoAsset = useCallback(
    (selectedToken: any) => {
      setSelectedToken(selectedToken);
      navigation.navigate(Routes.TokenDetails);
    },
    [navigation, setSelectedToken],
  );

  const onRefresh = useCallback(() => {
    get(APIS.Tokens);
  }, []);
  const {formatCurrency} = useCurrency();

  return (
    <View style={[styles.mainContainer, {backgroundColor: colors.background}]}>
      <Header title="Minted Assets" goBack={goBack} />
      <View style={styles.container}>
        {loading ? (
          <Loader />
        ) : assets.length > 0 ? (
          <FlatListScroll
            style={styles.listContainer}
            data={assets}
            onRefresh={onRefresh}
            refreshing={false}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={onRefresh}
                title="Pull to refresh"
                tintColor={colors.text}
                titleColor={colors.text}
              />
            }
            keyExtractor={(item, i) => `${item.symbol}__${i}`}
            renderItem={({item}) => {
              const {
                name,
                symbol,
                logo: uri,
                remainingQuantity,
                price,
              } = item ?? {};
              return (
                <TouchableOpacity onPress={() => handleIpoAsset(item)}>
                  <View style={[styles.asset,{borderBottomColor:colors.border}]}>
                    <View style={styles.details}>
                      <View style={styles.imageContainer}>
                        <Image source={{uri}} style={styles.image} />
                      </View>
                      <View>
                        <View style={styles.symbol}>
                          <Text
                            style={[styles.symbolTxt, {color: colors.text}]}>
                            {symbol ?? NOT_AVAILABLE}
                          </Text>
                          <Text
                            style={[
                              styles.nameTxt,
                              {color: colors.text, width: 200},
                            ]}
                            numberOfLines={1} ellipsizeMode={"tail"}>
                            {name ?? NOT_AVAILABLE}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View>
                      <Text style={[styles.price, {color: colors.text}]}>
                        {price ? `${formatCurrency(price, 2)}` : NO_DATA}
                      </Text>
                      <Text style={[styles.quantity, {color: colors.text}]}>
                        {remainingQuantity
                          ? `Qty. ${formatNumber(remainingQuantity)}`
                          : NO_DATA}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <NoData
            msg="No minted assets!"
            svg={isDarkMode === true ? Svg_No_Assets : Svg_No_Assets_Light}
            height={200}
          />
        )}
      </View>
    </View>
  );
};
