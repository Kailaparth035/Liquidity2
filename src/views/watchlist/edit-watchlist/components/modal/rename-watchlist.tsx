import React, {useRef} from 'react';
import {TextInput, View, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {SVG} from '../../../../../storybook/svg';
import {COLORS, Svg_Edit} from '../../../../../assets';
import {renameWatchlistStyles as styles} from '../rename/rename-watchlist.style';

const RenameWatchlist = ({name, setEdit}: any) => {
  const inputRef: any = useRef();
  const {colors} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor: colors.ground}]}>
      <View style={styles.inputRight}>
        <TextInput
          placeholder="watchlist name"
          style={styles.input}
          placeholderTextColor="gray"
          value={name === "null" ? "watchlist" : name}
          onChangeText={setEdit}
          ref={inputRef}
        />
      </View>

      <View style={styles.icons}>
        <TouchableOpacity
          style={styles.area}
          onPress={() => inputRef.current.focus()}>
          <SVG name={Svg_Edit} width={16} color={COLORS['primary-dark']} />
        </TouchableOpacity>
        <View style={styles.line} />
      </View>
    </View>
  );
};

export default RenameWatchlist;
