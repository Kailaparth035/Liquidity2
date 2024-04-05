// @flow
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {COLORS} from '../../../assets';

type FooterButtonsType = {
  style?: StyleProp<ViewStyle>;
  customeStyle?: StyleProp<ViewStyle>;
  lableStyle?: StyleProp<TextStyle>;
  lable1?: string;
  feededLable?: string;
  isSingle?: boolean;
  feeded?: boolean;
  onPress?: () => void;
  feedOnPress?: () => void;
  isligjhtBtn?: boolean;
};

const FooterButtons = ({
  lable1,
  feededLable,
  style,
  lableStyle,
  onPress,
  feedOnPress,
  isSingle,
  feeded,
  customeStyle,
  isligjhtBtn = false,
}: FooterButtonsType) => {
  const {colors} = useTheme();
  return isSingle ? (
    <View style={[styles.parent, style]}>
      {!feeded ? (
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.button,
            {borderWidth: 1, borderColor: COLORS['primary-dark']},
          ]}>
          <Text
            style={[styles.text, lableStyle, {color: COLORS['primary-dark']}]}>
            {lable1}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={feedOnPress}
          style={[styles.button, {backgroundColor: COLORS['primary-dark']}]}>
          <Text style={[styles.text, lableStyle]}>{feededLable}</Text>
        </TouchableOpacity>
      )}
    </View>
  ) : (
    <View style={[styles.parent, style]}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          customeStyle,
          {borderWidth: 1, marginRight: 4, borderColor: COLORS['primary-dark']},
        ]}>
        <Text
          style={[styles.text, lableStyle, {color: COLORS['primary-dark']}]}>
          {lable1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={feedOnPress}
        style={[
          styles.button,
          customeStyle,
          {
            marginLeft: 4,
            backgroundColor: isligjhtBtn
              ? 'rgba(60, 101, 214, 0.12)'
              : COLORS['primary-dark'],
          },
        ]}>
        <Text
          style={[
            styles.text,
            lableStyle,
            {color: isligjhtBtn ? COLORS['primary-dark'] : COLORS['white']},
          ]}>
          {feededLable}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,

    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingVertical: 16,
    fontSize: 14,
    lineHeight: 24,
    color: COLORS.white,
    fontWeight: '600',
  },
});
export default FooterButtons;
