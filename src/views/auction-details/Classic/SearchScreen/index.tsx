// @flow
import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons';

type SearchScreenType = {
  navigation?: any;
};

const SearchScreen = ({navigation}: SearchScreenType) => {
  const {colors} = useTheme();
  const [search, setSearch] = useState('');
  const onSearch = () => {};
  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.parent}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: colors.ground,
        }}>
        <TouchableOpacity style={{padding: 16}} onPress={goBack}>
          <Icons name={'chevron-left'} size={24} color={colors.text} />
        </TouchableOpacity>
        <TextInput
          value={search}
          placeholder={'Search'}
          onChangeText={setSearch}
          style={{flex: 1, color: colors.text}}
        />
        <TouchableOpacity style={{padding: 16}} onPress={onSearch}>
          <Icons name={'search'} size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.textMsg, {color: colors.lightText}]}>
          Search for loan number, Borrower name, Original loan amount or Current
          loan balance
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {flex: 1},
  textMsg: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  textContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
export default SearchScreen;
