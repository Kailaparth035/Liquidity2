// @flow
import React, {ReactNode, useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons';
type ScreenViewType = {
  navigation: any;
  title?: string;
  iconName?: any;
  searchable?: boolean;
  children?: ReactNode;
  onSearch?: () => void;
};

const ScreenView = ({
  navigation,
  title,
  iconName,
  searchable = false,
  onSearch,
  ...props
}: ScreenViewType) => {
  const {colors} = useTheme();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      style={styles.parent}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      keyboardVerticalOffset={keyboardVerticalOffset}>
      <View style={{flexDirection: 'row', backgroundColor: colors.ground}}>
        <Text style={[styles.text, {color: colors.text}]}>{title}</Text>

        {searchable ? (
          <TouchableOpacity style={{padding: 16}} onPress={onSearch}>
            <Icons name={'search'} size={24} color={colors.text} />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity style={{padding: 16}} onPress={goBack}>
          <Icons name={iconName} size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <View style={{padding: 16, flex: 1}}>{props.children}</View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  parent: {flex: 1, marginTop: Platform.OS === 'android' ? 35 : 0},
  text: {
    padding: 16,
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
});
export default ScreenView;
