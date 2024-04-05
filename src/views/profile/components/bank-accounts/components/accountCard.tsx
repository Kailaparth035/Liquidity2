// @flow

import React, {useMemo} from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {COLORS, Svg_Delete} from '../../../../../assets';
import {Loader} from '../../../../../storybook/loader';
import {SVG} from '../../../../../storybook/svg';
import {style} from './accountCards.style';
import {BankAccountType} from '../types';
import {getBankLogo} from '../../../../../helpers/getBankLogo';
import {MenuSection} from '../../../../../assets/images';
type AccountCardType = {
  name?: string;
  onDeletePress?: () => void;
  onCardPress?: () => void;
  accounts: BankAccountType[];
  loading?: boolean;
};

const AccountCard = ({
  name,
  loading,
  accounts,
  onDeletePress,
}: AccountCardType) => {
  const {colors} = useTheme();

  const accountsList = useMemo(() => {
    return accounts?.map(account => (
      <View style={style.accountNumberContainer}>
        <View style={{width: 80}}>
          <Text style={style.subTitle}>{account?.subtype ?? 'savings'}</Text>
        </View>
        <Text style={style.dots}> •••• •••• </Text>
        <Text style={style.subTitle}>{account?.mask ?? '----'}</Text>
      </View>
    ));
  }, [accounts]);

  return (
    <View style={style.cardContainer}>
      <View style={[style.cardStyle, {backgroundColor: colors.border}]}>
        <View style={style.imageContainer}>
          <View style={style.image}>
            <SVG name={getBankLogo[`${name}`] ?? getBankLogo['default']} />
          </View>
        </View>
        <View style={style.container}>
          <View style={style.textContainer}>
            <Text style={[style.title, {color: colors.text}]}>{name}</Text>
            {accounts.length == 0 ? null : accountsList}
          </View>
          {/* {loading ? (
            <View style={style.deleteButton}>
              <Loader size={'small'} style={style.loaderStyle} />
            </View>
          ) : (
            <TouchableOpacity
              onPress={onDeletePress}
              style={style.deleteButton}>
              <Image
                source={MenuSection}
                style={{height: 25, width: 25, tintColor: colors.text}}
              />
              <SVG
                name={Svg_Delete}
                width={24}
                height={50}
                color={COLORS.sell}
              />
            </TouchableOpacity>
          )} */}
        </View>
      </View>
    </View>
  );
};

export default AccountCard;
