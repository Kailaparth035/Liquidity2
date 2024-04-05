import React, {FC, Dispatch, SetStateAction} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

import {styles} from './selectScroll.style';
import {pickerSelectStyles} from './pickerSelect.style';
import {ISelectScrollOption} from '../../states';
import AntDesign from "react-native-vector-icons/AntDesign";

interface ISelectScroll {
  label: string;
  handleSelect?: (name: string, value: string) => void;
  options: ISelectScrollOption[];
  selectedItem: string;
  setSelectedItem: Dispatch<SetStateAction<string>>;
  name: string;
  placeholder: string;
  style?: any;
  Icon:any;
  iconContainer:any;
}

export const SelectScroll: FC<ISelectScroll> = ({
  label,
  handleSelect,
  options,
  selectedItem,
  setSelectedItem,
  name,
  placeholder,
  style,
  Icon,
  iconContainer
}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.dobContain}>
      <View style={styles.formField}>
        {/* <View style={styles.label}>
          <Text style={styles.labelText}>{label}</Text>
          <Text style={styles.star}>*</Text>
        </View> */}
        <RNPickerSelect
          onValueChange={setSelectedItem}
          useNativeAndroidPickerStyle={false}
          value={selectedItem}
          style={{iconContainer:iconContainer, ...style ? style : pickerSelectStyles}}
          items={options}
          placeholder={{label: placeholder, value: ''}}
          Icon={Icon}
          
        />
      </View>
    </TouchableOpacity>
  );
};
