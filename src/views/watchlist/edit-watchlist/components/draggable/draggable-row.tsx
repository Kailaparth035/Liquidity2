import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {ImageView} from '../../../../../storybook/image';
import {SVG} from '../../../../../storybook/svg';
import {Svg_Delete} from '../../../../../assets/icon/svg/delete';
import {draggableRowStyles as styles} from './draggable-row.styles';

const DraggableRow = ({item, drag, isActive, onDelete}: any) => {
  const {colors} = useTheme();
  const {image, symbol, name} = item;

  return (
    <TouchableOpacity
      onLongPress={drag}
      disabled={isActive}
      activeOpacity={0.8}
      style={[styles.rowContainer, isActive && styles.rowContainerActive]}>
      <View style={styles.container}>
        <View
          style={[styles.imageContainer, {backgroundColor: colors.imagebg}]}>
          <ImageView
            source={{uri: image}}
            url={image}
            style={styles.rowImage}
            alt={symbol?.[0] ?? ''}
          />
        </View>

        <View style={styles.tokenExplore}>
          <Text style={[styles.tokenSymbol, {color: colors.text}]}>
            {symbol}
          </Text>
          <Text style={styles.tokenName} numberOfLines={1}>
            {name}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          width: '13%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onDelete}>
        <SVG name={Svg_Delete} width={16} height={16} color="#F54545" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default DraggableRow;
