import React, {FC, useCallback, useMemo, useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';

import {SelectedAssetDetailsState} from '../../../../states';
import {ASSETS, NO_OVERVIEW_DATA} from '../../../../constants';
import {overviewStyle as styles} from './overview.style';
import {FormatToBM} from '../../../../libs';

interface IOverView {
  symbol: string;
  assetType: string;
}

export const OverView: FC<IOverView> = ({symbol, assetType}) => {
  const assetDetails = useRecoilValue(SelectedAssetDetailsState);
  const [isReadMore, setIsReadMore] = useState(true);
  const {colors} = useTheme();

  const {
    profile,
    detail,
    enterpriseValue,
    priceToEarning,
    priceToBook,
    balanceSheet,
    dividendYield,
  } = useMemo(() => assetDetails[symbol] ?? {}, []);

  const {STOCK, CRYPTO} = useMemo(() => ASSETS, [ASSETS]);

  const handleReadMore = useCallback(() => {
    setIsReadMore(prev => !prev);
  }, []);

  return (
    <ScrollView>
      {Object.keys(profile ?? {}).length > 0 &&
      Object.keys(detail ?? {}).length ? (
        <View>
          {Object.keys(profile ?? {}).length > 0 &&
            Object.keys(detail ?? {}).length > 0 && (
              <View style={styles.overViewContainer}>
                <View>
                  <Text style={[styles.company, {color: colors.text}]}>
                    {detail.name ?? ''}
                  </Text>
                  {(assetType === STOCK || assetType === CRYPTO) && (
                    <View style={styles.companyDetails}>
                      <Text style={[styles.companyType, {color: colors.text}]}>
                        {(profile.industry ||
                          (assetType === CRYPTO && 'Blockchain')) ??
                          ''}
                      </Text>
                      {!!profile.sector && <View style={styles.dot} />}
                      <Text style={[styles.companyType, {color: colors.text}]}>
                        {profile.sector ?? ''}
                      </Text>
                    </View>
                  )}

                  <View>
                    {assetType === STOCK && (
                      <View>
                        <Text
                          numberOfLines={isReadMore ? 5 : 100}
                          style={[styles.bio, {color: colors.text}]}>
                          {profile.description ?? ''}
                        </Text>
                        <TouchableOpacity onPress={handleReadMore}>
                          <Text style={styles.readmore}>
                            {isReadMore ? 'Read More' : 'Read Less'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.largeTable}>
                  <Text style={[styles.label, {color: colors.text}]}>
                    Valuation
                  </Text>
                  <View style={styles.tableContainer}>
                    <View style={styles.tableColumnLeft}>
                      <View style={styles.tableCell}>
                        <Text style={[styles.cellLabel, {color: colors.text}]}>
                          Market Cap
                        </Text>
                        <Text style={[styles.cellValue, {color: colors.text}]}>
                          {FormatToBM(detail.marketCap) ?? '-'}
                        </Text>
                      </View>
                      <View style={styles.tableCell}>
                        <Text style={[styles.cellLabel, {color: colors.text}]}>
                          Enterprize value
                        </Text>
                        <Text style={[styles.cellValue, {color: colors.text}]}>
                          {FormatToBM(enterpriseValue) ?? '-'}
                        </Text>
                      </View>
                      <View style={styles.tableCell}>
                        <Text style={[styles.cellLabel, {color: colors.text}]}>
                          Total Shares Outstanding
                        </Text>
                        <Text style={[styles.cellValue, {color: colors.text}]}>
                          {FormatToBM(detail.sharesOutstanding) ?? '-'}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableColumnRight}>
                      <View style={styles.tableCell}>
                        <Text style={[styles.cellLabel, {color: colors.text}]}>
                          Price/Earning
                        </Text>
                        <Text style={[styles.cellValue, {color: colors.text}]}>
                          {priceToEarning?.toFixed(2) ?? '-'}
                        </Text>
                      </View>
                      <View style={styles.tableCell}>
                        <Text style={[styles.cellLabel, {color: colors.text}]}>
                          Price/Revenue
                        </Text>
                        <Text style={[styles.cellValue, {color: colors.text}]}>
                          -
                        </Text>
                      </View>
                      <View style={styles.tableCell}>
                        <Text style={[styles.cellLabel, {color: colors.text}]}>
                          Price/Book
                        </Text>
                        <Text style={[styles.cellValue, {color: colors.text}]}>
                          {priceToBook?.toFixed(2) ?? '-'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.smallTableContainer}>
                  {assetType === STOCK && balanceSheet && (
                    <View style={styles.smallTableLeft}>
                      <Text style={[styles.label, {color: colors.text}]}>
                        Dividend
                      </Text>
                      <View style={styles.tableColumn}>
                        <View style={styles.tableCell}>
                          <Text
                            style={[styles.cellLabel, {color: colors.text}]}>
                            Dividend Paid (FY)
                          </Text>
                          <Text
                            style={[styles.cellValue, {color: colors.text}]}>
                            -
                          </Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text
                            style={[styles.cellLabel, {color: colors.text}]}>
                            Dividend Yield Forward
                          </Text>
                          <Text
                            style={[styles.cellValue, {color: colors.text}]}>
                            {dividendYield ?? '-'}
                          </Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text
                            style={[styles.cellLabel, {color: colors.text}]}>
                            Dividend/Share
                          </Text>
                          <Text
                            style={[styles.cellValue, {color: colors.text}]}>
                            -
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                  {assetType === STOCK && balanceSheet && (
                    <View style={styles.smallTableRight}>
                      <Text style={[styles.label, {color: colors.text}]}>
                        Balance Sheet
                      </Text>
                      <View style={styles.tableColumn}>
                        <View style={styles.tableCell}>
                          <Text
                            style={[styles.cellLabel, {color: colors.text}]}>
                            Net Debt
                          </Text>
                          <Text
                            style={[styles.cellValue, {color: colors.text}]}>
                            {FormatToBM(balanceSheet.netDebt) ?? 0}
                          </Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text
                            style={[styles.cellLabel, {color: colors.text}]}>
                            Total Debt
                          </Text>
                          <Text
                            style={[styles.cellValue, {color: colors.text}]}>
                            {FormatToBM(balanceSheet.totalDebt) ?? 0}
                          </Text>
                        </View>
                        <View style={styles.tableCell}>
                          <Text
                            style={[styles.cellLabel, {color: colors.text}]}>
                            Total Assets
                          </Text>
                          <Text
                            style={[styles.cellValue, {color: colors.text}]}>
                            {FormatToBM(balanceSheet.totalAssets) ?? 0}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            )}
        </View>
      ) : (
        <View style={{paddingTop: 16}}>
          <Text style={[styles.noddata, {color: colors.text}]}>
            {NO_OVERVIEW_DATA}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};
