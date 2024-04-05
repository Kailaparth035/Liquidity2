import React, {useCallback, useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRecoilState, useSetRecoilState} from 'recoil';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect, useTheme} from '@react-navigation/native';

import {ExitApp} from '../../states';
import {usePlatform} from '../../hooks';
import {SVG} from '../../storybook';
import {SVG_FILTER, SVG_SHARE} from '../../assets/icon/svg/transactionFilter';
import {
  COLORS,
  Svg_Auction_Gavel_Adjustable,
  Svg_Transaction_Adjustable,
} from '../../assets';
import { isBidsVisibleState } from '../../states/open-orders/states';
import {headerStyles as styles} from './header.styles';

interface IHeader {
  goBack?: (() => void) | null;
  title: string;
  filter?: (() => void) | null;
  rightIcon?: string;
  rightFunction?: () => void;
  isShare?: string;
}

export const Header = ({
  goBack,
  title,
  filter,
  rightIcon,
  rightFunction,
  isShare,
}: IHeader) => {
  const [isBidsVisible, setIsBidsVisible] = useRecoilState(isBidsVisibleState);
  const setExitApp = useSetRecoilState(ExitApp);

  const {colors} = useTheme();
  const {isAndroid} = usePlatform();

  useFocusEffect(
    useCallback(() => {
      setExitApp(false);
    }, [title]),
  );

  const changeOrderTypeToAuction = useCallback(() => {
    setIsBidsVisible(true);
  }, []);

  const changeOrderTypeToOrder = useCallback(() => {
    setIsBidsVisible(false);
  }, []);

  const renderBidsToggle = useMemo(() => {
    return (
      <>
        <View
          style={[styles.toggleContainer, {backgroundColor: colors.headerCard,}]}>
          <TouchableOpacity
            onPress={changeOrderTypeToOrder}
            style={[styles.svgContianer, {
              flex: !isBidsVisible ? 1 : 0.7,
              backgroundColor: !isBidsVisible ? COLORS['primary-light'] : 'transparent',
            }]}>
            <SVG
              name={Svg_Transaction_Adjustable}
              width={20}
              height={20}
              color={!isBidsVisible ? COLORS['white'] : colors.lightText}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={changeOrderTypeToAuction}
            style={[styles.svgContianer, {
              flex: isBidsVisible ? 1 : 0.7,
              backgroundColor: isBidsVisible ? COLORS['primary-light'] : 'transparent',
            }]}>
            <SVG
              name={Svg_Auction_Gavel_Adjustable}
              width={20}
              height={20}
              color={isBidsVisible ? COLORS['white'] : colors.lightText}
            />
          </TouchableOpacity>
        </View>
      </>
    );
  }, [colors, isBidsVisible]);

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.ground,
          paddingTop: isAndroid ? 50 : 0,
        },
        !goBack && {borderBottomWidth: 0, padding: 20, paddingBottom: 12},
      ]}>
      {!!goBack && (
        <TouchableOpacity onPress={goBack} style={styles.btn}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.text} />
        </TouchableOpacity>
      )}
      <Text
        style={[styles.heading, {color: colors.text, width: 320}]}
        numberOfLines={1}
        ellipsizeMode={'tail'}>
        {title}
      </Text>
      {!!filter && (
        <TouchableOpacity onPress={filter} style={styles.btn}>
          <SVG
            name={isShare ? SVG_SHARE : SVG_FILTER}
            height={isShare ? 22 : 19}
            width={isShare ? 20 : 16}
            color={'red'}
          />
        </TouchableOpacity>
      )}
      {!!rightIcon && !!rightFunction && (
        <TouchableOpacity onPress={rightFunction} style={styles.btn}>
          <SVG name={rightIcon} height={19} width={16} color={colors.text} />
        </TouchableOpacity>
      )}
      {(title === 'Orders' || title === 'Order') && renderBidsToggle}
    </View>
  );
};
