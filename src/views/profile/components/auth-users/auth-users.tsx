import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {useTheme} from '@react-navigation/native';

import {Header} from '../../../../components';
import {capitalize} from '../../../../views/utils';
import {FellowOwnersState, selectedAuthUserState} from '../co-owners/states';
import {AuthUsersStyles as styles} from './auth-users.styles';
import {Loader} from '../../../../storybook';
import {COLORS} from '../../../../assets';
import {useNetwork} from '../../../../hooks';
import {APIS} from '../../../../constants';
import {toast} from '../../../../libs';
import {Routes} from '../../../../views/routes/constants';
import {LoadingPortfolioState, PortfolioState} from '../../../../states';
import {SlideInUp} from 'react-native-reanimated';
import {buildUnavailableHoursBlocks} from 'react-native-calendars/src/timeline/Packer';

export const AuthUsers = ({navigation}: any) => {
  const fellowOwners = useRecoilValue(FellowOwnersState);
  const {colors} = useTheme();
  const {put, data, loading} = useNetwork();
  const setLoadingPortfolio = useSetRecoilState(LoadingPortfolioState);
  const resetPortfolio = useResetRecoilState(PortfolioState);

  const [selectedAccount, setSelectedAccount] = useRecoilState(
    selectedAuthUserState,
  );

  useEffect(() => {
    const isSelected = fellowOwners.find((coOwner: any) => coOwner.isActive);
    if (isSelected) setSelectedAccount(isSelected);
    else {
      const myAccount = fellowOwners.find((owner: any) => owner.isPrimary);
      setSelectedAccount(myAccount);
    }
  }, [fellowOwners]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSelectUser = useCallback(item => {
    setSelectedAccount(item);
  }, []);

  const onChangeUser = useCallback(async () => {
    const payload = {};
    const isMyAccount = selectedAccount?.isPrimary;
    if (isMyAccount) payload.isPrimary = true;
    try {
      resetPortfolio();
      await put(`${APIS.switchAccount}${selectedAccount?.ownerId}`, payload);
    } catch (error: any) {
      toast(error.message);
    }
  }, [selectedAccount]);

  useEffect(() => {
    if (data?.message) {
      toast(data.message);
    } else if (data?.success) {
      setLoadingPortfolio(true);
      setTimeout(() => {
        navigation.popToTop();
        navigation.replace(Routes.Home);
      }, 1000);
    }
  }, [data]);

  const Footer = useMemo(() => {
    return (
      <>
        {fellowOwners?.length > 0 && (
          <View
            style={[styles.footerContainer, {borderTopColor: colors.border}]}>
            <View style={styles.footerWrapper}>
              <TouchableOpacity
                disabled={loading}
                style={styles.btnContainer}
                onPress={onChangeUser}>
                <Text style={styles.btnText}>
                  {loading ? 'Loading...' : 'Change'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
    );
  }, [selectedAccount, loading]);

  const renderItem = useCallback(
    item => {
      return (
        <TouchableOpacity
          style={[
            styles.container,
            {
              backgroundColor: colors.ground,

              borderColor:
                item.ownerId === selectedAccount?.ownerId
                  ? COLORS['color-orange']
                  : 'transparent',
            },
          ]}
          onPress={() => handleSelectUser(item)}>
          <View
            style={[
              styles.ImageContainer,
              {backgroundColor: colors.background},
            ]}>
            <Image source={{uri: item?.profileImage}} style={styles.image} />
          </View>
          <View style={styles.dataContainer}>
            <Text
              style={[
                styles.txtName,
                {
                  color:
                    item.ownerId === selectedAccount?.ownerId
                      ? COLORS['color-orange']
                      : colors.text,
                },
              ]}>
              {item?.name ?? ''}
            </Text>
            <View style={styles.statusContainer}>
              <Text style={styles.txtType}>
                {'Account Id: ' + item?.customerId ?? ''}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [selectedAccount],
  );

  return (
    <>
      <Header title={'Change Account'} goBack={goBack} />
      <View style={styles.listContainer}>
        <FlatList
          data={fellowOwners}
          renderItem={({item}) => renderItem(item)}
          keyExtractor={item => item._id}
        />
      </View>
      {Footer}
    </>
  );
};
