import React, {useRef, useState, useCallback, useEffect} from 'react';
import {TouchableOpacity, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';

import {Loader} from '../../storybook/loader';
import {FlatListScroll} from '../../storybook/flatlist';
import {COLORS} from '../../assets';
import {APIS} from '../../constants';
import {Debounce} from '../../helpers';
import {useNetwork} from '../../hooks/use-network';
import {IAllExploreAssets} from '../../states';
import NoData from './components/noData';
import SearchedRow from './components/searchedRow';
import {styles} from './search.styles';
import {useLoginAuth} from '../routes/hooks/use-login-auth';
import {useKeyboard} from '../../hooks/use-keyboard';
import {usePlatform} from '../../hooks';
import {AuctionList} from '../../views/auction/components';

export const Search = ({route, navigation}: any) => {
  const [filteredList, setFilteredList] = useState<IAllExploreAssets[]>([]);
  const [searched, setSearched] = useState<string>('');
  const [searchedAuctions, setSearchedAuctions] = useState([]);
  const {isAuction} = route?.params ?? {};

  const inputRef: any = useRef();
  const {get, data: searchedData, loading: searchLoading} = useNetwork();
  const {isLoggedIn} = useLoginAuth();
  const {isKeyboardVisible} = useKeyboard();
  const {colors} = useTheme();
  const {isAndroid} = usePlatform();

  useEffect(() => {
    if (searched !== '') {
      debounceSearch(searched);
    }
  }, [searched]);

  useEffect(() => {
    if (searchedData) {
      if (isAuction) return setSearchedAuctions(searchedData?.data ?? []);
      setFilteredList(searchedData?.data ?? []);
    }
  }, [searchedData, isAuction]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSearch = useCallback(
    (value: string) => {
      try {
        const url = isAuction
          ? `${APIS.auction}?limit=30&offset=0&status=yet-to-start%2Clive%2Ccompleted&searchText=${value}`
          : `${APIS.Search}${value}`;
        get(url);
      } catch (err) {
        console.log('ERROR', err);
      }
    },
    [isAuction],
  );

  const debounceSearch = useCallback(Debounce(handleSearch, 800), []);

  const renderItem = useCallback(() => {
    return (
      <>
        {searchLoading ? (
          <Loader />
        ) : isAuction ? (
          <View style={{flex: searchedAuctions.length ? 1 : 0}}>
            <FlatListScroll
              style={[
                {backgroundColor: searchedAuctions.length && colors.headerCard},
                styles.searchList,
                isAndroid
                  ? {marginBottom: isKeyboardVisible ? 60 : 20}
                  : {marginBottom: isKeyboardVisible ? 320 : 0},
              ]}
              data={searchedAuctions}
              renderItem={({item, index}) => (
                <AuctionList
                  navigation={navigation}
                  item={item}
                  index={index}
                />
              )}
              keyExtractor={(item, i) => `${item.name}__${i}`}
            />
          </View>
        ) : (
          <View style={{flex: filteredList.length ? 1 : 0}}>
            <FlatListScroll
              style={[
                styles.searchList,
                isAndroid
                  ? {marginBottom: isKeyboardVisible ? 60 : 20}
                  : {marginBottom: isKeyboardVisible ? 320 : 0},
              ]}
              data={filteredList}
              renderItem={({item}) => (
                <SearchedRow
                  row={item}
                  searched={searched}
                  isLoggedIn={isLoggedIn}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item, i) => `${item.name}__${i}`}
            />
          </View>
        )}
        {searched !== '' &&
          filteredList.length === 0 &&
          searchedAuctions.length === 0 &&
          !searchLoading && (
            <View
              style={styles.noDataWrapper}>
              <NoData txt="No result found to this search, Try something else." />
            </View>
          )}
      </>
    );
  }, [
    searchLoading,
    isAndroid,
    filteredList,
    searched,
    isKeyboardVisible,
    isAuction,
    isLoggedIn,
    navigation,
    searchedAuctions,
  ]);

  return (
    <View
      style={[styles.searchContainer, {backgroundColor: colors.background}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Icon name="arrow-back-sharp" size={24} color={colors.text} />
        </TouchableOpacity>
        <TextInput
          placeholder="Search"
          value={searched}
          style={[styles.inputTxt, {color: colors.text}]}
          onChangeText={setSearched}
          placeholderTextColor={COLORS['font-color-light']}
          ref={inputRef}
          onLayout={() => inputRef.current.focus()}
        />
      </View>
      <View style={styles.listContainer}>{renderItem()}</View>
    </View>
  );
};
