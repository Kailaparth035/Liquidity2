import type {IFile} from '../types';

import React, {FC, useCallback} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import NoDataAvailable from './no-data';
import {tokenDetailsStyles as styles} from '../components/token-details/token-details.styles';
import {toast} from '../../../libs';
import {FILE_OPTIONS} from '../../../constants';

interface IFiles {
  files: IFile[];
}

export const Files: FC<IFiles> = ({files}) => {
  const {colors} = useTheme();
  const fileOptions = useCallback(() => {
    toast(FILE_OPTIONS);
  }, []);

  return (
    <>
      {!!files.length ? (
        files.map((file, i) => (
          <View style={styles.content} key={`${file.file}_${i}`}>
            <Text
              numberOfLines={1}
              style={[styles.elips, {color: colors.text}]}>
              {file.uri}
            </Text>
            <TouchableOpacity onPress={fileOptions}>
              <MaterialIcon
                name="dots-vertical"
                size={18}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <NoDataAvailable />
      )}
    </>
  );
};
