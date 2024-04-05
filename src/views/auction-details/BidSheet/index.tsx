// @flow
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import BidSheetCard from '../components/BidSheetCard';
import ScreenView from '../components/ScreenView';
import {Routes} from '../../../views/routes/constants';

type BidSheetType = {
  navigation: any;
};

const BidSheet = ({navigation}: BidSheetType) => {
  return (
    <ScreenView
      navigation={navigation}
      title="Bid sheet"
      iconName={'close'}
      onSearch={() => {
        navigation.navigate(Routes.SearchScreen);
      }}
      searchable={true}>
      <View style={{flex: 1}}>
        <ScrollView
          style={styles.parent}
          contentContainerStyle={{marginBottom: 32}}>
          {[1, 2, 3, 4, 5].map(() => (
            <BidSheetCard />
          ))}
        </ScrollView>
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  parent: {},
});
export default BidSheet;
