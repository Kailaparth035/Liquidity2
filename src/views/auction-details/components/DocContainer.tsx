// @flow
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Linking,
  Dimensions,
} from 'react-native';
import {SVG} from '../../../storybook';
import {useTheme} from '@react-navigation/native';
import {formatBytes} from '../../../libs';
import {handleDocTypeIcon} from '../../../views/utils';

type DocContainerType = {
  dataRoom?: any;
  fromEdit?: boolean;
};

const DocContainer = ({dataRoom, fromEdit = false}: DocContainerType) => {
  const {colors} = useTheme();

  const ListEmptyComponent = () => {
    return (
      <Text
        style={{
          color: colors.lightText,
          fontSize: 14,
          lineHeight: 20,
          fontWeight: '500',
          textAlign: 'center',
        }}>
        No File Attached Yet
      </Text>
    );
  };

  return (
    <View style={{paddingHorizontal: fromEdit ? 0 : 16}}>
      <FlatList
        data={dataRoom}
        nestedScrollEnabled
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={(item, index) => dataRoom[index].id}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(item?.fileUrl);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
              }}>
              <View
                style={[styles.iconContaner, {backgroundColor: colors.box}]}>
                <SVG
                  name={handleDocTypeIcon(item?.docName ?? '')}
                  width={24}
                  height={28}
                />
              </View>
              <Text
                style={{
                  textAlignVertical: 'center',
                  flex: 1,
                  color: colors.lightText,
                }}>
                {item?.docName}
              </Text>
              <View
                style={{
                  height: 4,
                  width: 4,
                  backgroundColor: colors.lightText,
                  margin: 8,
                  borderRadius: 4,
                }}
              />
              <Text
                style={{
                  color: colors.lightText,
                  fontSize: 14,
                  lineHeight: 20,
                  fontWeight: '500',
                }}>
                {formatBytes(item?.fileSize)}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {},
  iconContaner: {
    height: 40,
    width: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
});
export default DocContainer;
