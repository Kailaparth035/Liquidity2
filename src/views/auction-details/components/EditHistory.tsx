// @flow
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';
import {useTheme} from '@react-navigation/native';
import DocContainer from './DocContainer';
import {ScrollView} from 'react-native';
import {COLORS} from '../../../assets';
import moment from 'moment';

type EditHistoryType = {
  editHistory?: any;
};

const EditHistory = ({editHistory}: EditHistoryType) => {
  const {colors} = useTheme();

  const data = [1, 2, 3];

  const getTextMsg = (val: any) => {
    switch (val?.operation) {
      case 'update':
        return `${val?.createdName} changed the file name from ${val.fileData[0]?.oldName} to Test ${val.fileData[0]?.fileName}'`;
      case 'create':
        return `${val?.createdName} has Added a new file`;
      case 'delete':
        return `${val?.createdName} deleted 1 files`;
    }
  };
  const getColorCode = (val: any) => {
    switch (val?.operation) {
      case 'update':
        return COLORS['accent-light'];
      case 'create':
        return COLORS.green_download;
      case 'delete':
        return COLORS.compulsory;
    }
  };
  const getIcon = (val: any) => {
    switch (val?.operation) {
      case 'update':
        return 'edit-3';
      case 'create':
        return 'folder-plus';
      case 'delete':
        return 'trash-2';
      default:
        return 'folder-plus';
    }
  };

  const ListEmptyComponent = () => {
    return (
      <Text style={[styles.NoFiles, {color: colors.lightText}]}>
        No File Attached Yet
      </Text>
    );
  };
  return (
    <ScrollView
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 16}}>
      {editHistory.length > 0
        ? editHistory.map((item, index) => {
            return (
              <View style={styles.Conatiner}>
                <View>
                  <View
                    style={[
                      styles.EditIconContainer,
                      {
                        backgroundColor: 'rgba(245, 175, 69, 0.06)',
                        borderColor: colors.border,
                      },
                    ]}>
                    <Icons
                      name={getIcon(item)}
                      color={getColorCode(item)}
                      size={14}
                    />
                  </View>
                  {editHistory.length - 1 == index ? null : (
                    <View style={[styles.line, {borderColor: colors.border}]} />
                  )}
                </View>
                <View style={{flex: 1, paddingLeft: 8}}>
                  <Text style={[styles.header, {color: colors.text}]}>
                    {getTextMsg(item)}
                  </Text>
                  <Text style={[styles.subText, {color: colors.lightText}]}>
                    {moment(item?.createdAt).format('MMMM DD, YYYY hh:mma')}
                  </Text>
                  <View>
                    <DocContainer dataRoom={item.fileData} fromEdit={true} />
                  </View>
                </View>
              </View>
            );
          })
        : ListEmptyComponent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parent: {flex: 1},
  Conatiner: {flexDirection: 'row'},
  EditIconContainer: {
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E4E7EC',
  },
  line: {
    flex: 1,
    width: 1,
    borderWidth: 1,

    alignSelf: 'center',
  },
  header: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  },
  subText: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '400',

    paddingBottom: 8,
  },
  NoFiles: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
});
export default EditHistory;
