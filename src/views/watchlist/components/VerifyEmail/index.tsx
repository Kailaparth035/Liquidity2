// @flow
import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';

import {Routes} from '../../../../views/routes/constants';
import {ProfileDataState, useKeyChain} from '../../../../states';
import {styles} from './styles';

const VerifyEmail = () => {
  const profileData = useRecoilValue(ProfileDataState);
  const navigation: any = useNavigation();
  const {getProfileData, userLoading} = useKeyChain();

  const handleReloadUser = useCallback(() => {
    getProfileData();
  }, []);

  return (
    <View style={[styles.parent]}>
      {profileData?.email ? (
        <Text style={styles.text}>
          Email is not verified. Please click on verify email button to get a
          verification link.
        </Text>
      ) : (
        <Text style={styles.text}>
          Email is not registered yet. Please click on Register email button to
          register your email.
        </Text>
      )}
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.EmailVerifyScreen);
          }}
          style={styles.button}>
          {profileData?.email ? (
            <Text style={styles.buttonText}>Verify email</Text>
          ) : (
            <Text style={styles.buttonText}>Register email</Text>
          )}
        </TouchableOpacity>
        {/* <TouchableOpacity
        onPress={handleReloadUser}
        style={[styles.button, {marginLeft: 10}]}>
          {<Text style={styles.buttonText}>{userLoading ? "Loading..." : "Reload"}</Text>}
      </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default VerifyEmail;
