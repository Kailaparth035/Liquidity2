import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {styles} from '../search.styles';

interface INoData {
  txt?: string;
}

const NoData: FC<INoData> = ({txt}) => {
  return (
    <View style={styles.noDataContainer}>
      <Text style={styles.noData}>{txt ?? `Data not found!`}</Text>
    </View>
  );
};

export default NoData;
