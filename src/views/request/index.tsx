import React, {useCallback} from 'react';
import {View, ScrollView} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Header} from '../../components';
import RequestList from './components/request-list';
import {RequestStyles as styles} from './request.styles';

const Request = ({navigation}: any) => {
  const {colors} = useTheme();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={[styles.mainContainer, {backgroundColor: colors.background}]}>
      <Header title="Request" goBack={goBack} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <RequestList />
      </ScrollView>
    </View>
  );
};

export default Request;
