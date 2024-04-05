// @flow
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';

import CustomeCalendar from '../CustomeCalendar';
import {styles} from './FilterModel.style';
import RBSheet from 'react-native-raw-bottom-sheet';

type FilterModalType = {
  showFilter: any;
};

const FilterModal = ({showFilter}: FilterModalType) => {
  const [selected, setSelected] = useState('');
  const {colors} = useTheme();

  const data = ['All', 'Completed', 'Processing', 'Failure'];

  const handleFilter = (item: string) => {
    setSelected(item);
  };
  return (
    <View>
      <RBSheet
        ref={showFilter}
        height={Dimensions.get('window').height}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            backgroundColor: 'transparent',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 25,
          },
          wrapper: {
            backgroundColor: 'transparent',
          },
        }}>
        <View style={styles.container}>
          <View style={[styles.modal, {backgroundColor: colors.headerCard}]}>
            <View style={styles.headerContainer}>
              <Text style={[styles.filterHeader, {color: colors.text}]}>
                Filter
              </Text>
              <TouchableOpacity
                onPress={() => {
                  showFilter.current.close();
                }}>
                <Icons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>Status</Text>
              <View style={{flexDirection: 'row'}}>
                {data.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleFilter(item)}
                    style={{
                      borderRadius: 4,
                      backgroundColor:
                        selected === item ? colors.border : colors.headerCard,
                    }}>
                    <Text
                      style={[styles.filterButtonText, {color: colors.text}]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <CustomeCalendar setSelected={setSelected} />
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default FilterModal;
