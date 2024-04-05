import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {isDarkModeState} from '../../../states';
import {SVG} from '../../../storybook/svg';
import {noDataStyles as styles} from './no-data.styles';
import {Portfolio_Dark} from '../../../assets/icon/portfolio-dark';
import {Portfolio_Light} from '../../../assets/portfolio-light';
import {COLORS} from '../../../assets';

interface INoData {
  msg?: string;
  svg?: string;
  height?: number;
  desc?: string;
  subMsg?: string;
  TextLineWidth?:number;
  alignItems:any;
  numberOfLines:number;
  subMsgMarginBottom:number;
  descFontSize:number;
}

export const NoData = ({msg, svg, height, desc, subMsg,TextLineWidth,alignItems,numberOfLines,subMsgMarginBottom,descFontSize}: INoData) => {
  const [darkApp, setDarkApp] = useRecoilState(isDarkModeState);
  const {colors} = useTheme();

  return (
    <View
      style={[styles.noListContainer, {backgroundColor: colors.background}]}>
      <View style={[styles.noList,{alignItems:alignItems}]}>
        {darkApp === true ? (
          <SVG name={svg ?? Portfolio_Dark} height={height ? height : 250} />
        ) : (
          <SVG name={svg ?? Portfolio_Light} height={height ? height : 250} />
        )}
        {msg && (
          <>
            <Text
              style={[
                styles.noListTxt,
                {color: colors.text, fontWeight: '600', marginTop: 15},
              ]}>
              {msg}
            </Text>
            <Text
              style={[
                styles.noListTxt,
                {color: COLORS['font-color-light'], marginTop: 5,marginBottom:subMsgMarginBottom},
              ]}>
              {subMsg}
            </Text>
          </>
        )}
        {desc && (
          <Text style={[styles.noListDesc, {color: colors.text,fontSize:descFontSize},{width:TextLineWidth}]} numberOfLines={numberOfLines}>{desc}</Text>
        )}
      </View>
    </View>
  );
};
