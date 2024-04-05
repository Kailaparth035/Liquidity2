import React, {useCallback, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useTheme} from '@react-navigation/native';

import {
  LOGOUT_CONFIRMATION_DESC,
  LOGOUT_CONFIRMATION_TITLE,
} from '../../../../../constants';
import {useLogout} from '../../../../../hooks/use-logout';
import {IsLogoutState} from '../../../../../states/logout/states';
import {Modal} from '../../../../../storybook/modal';
import {Routes} from '../../../../routes/constants';
import {confirmLogoutModalStyles as styles} from './confirmation-modal.styles';
import { useNetwork } from '../../../../../hooks';
import {APIS} from '../../../../../constants';
import { LinkListState, ProfileDataState } from '../../../../../states';

export const ConfirmationLogoutModal = ({navigation}: any) => {
  const [isOpen, setIsOpen] = useRecoilState(IsLogoutState);
  const profileData = useRecoilValue(ProfileDataState);
  const linkItem = useRecoilValue(LinkListState);
  const [loading, setLoading] = useState(false);

  const {logout} = useLogout();
  const {colors} = useTheme();
  const {patch} = useNetwork();

  const handleCancel = useCallback(() => {
    setIsOpen(false);
  }, []);

  const data = linkItem.find((a:any)=>a?.userId  === profileData?.id)

  const handleLogout = () => {
    setLoading(true);
    const itemId = data?._id;
    patch(`${APIS.usersDeviceLogin}/${profileData?.id}`, {ids: [itemId],origin: 'mobile'}).then(
        res=> {
        setIsOpen(false);
        setTimeout(() => {
          logout();
        }, 4000);
        setLoading(false);
        navigation.navigate(Routes.Login);
      })
      .catch(() => {
        setLoading(false);
        setIsOpen(false);
        setTimeout(() => {
          logout();
        }, 1000);
        navigation.navigate(Routes.Login);
      });
  };

  return (
    <Modal isModal={isOpen} setIsModal={setIsOpen}>
      <View style={styles.container}>
        <View style={[styles.body, {backgroundColor: colors.ground}]}>
          <Text style={[styles.deleteLabel, {color: colors.text}]}>
            {LOGOUT_CONFIRMATION_TITLE}
          </Text>
          <Text style={[styles.deleteDesc, {color: colors.text}]}>
            {LOGOUT_CONFIRMATION_DESC}
          </Text>
          <View style={[styles.footer, {borderColor: colors.box}]}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
              <Text style={[styles.cancelTxt, {color: colors.text}]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <View style={[styles.footerLine, {borderColor: colors.box}]} />
            <TouchableOpacity style={styles.deleteBtn} onPress={handleLogout}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.deleteTxt}>Logout</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
