import React, {useEffect} from 'react';
import {View} from 'react-native';
import {useRecoilValue} from 'recoil';

import {Header} from '../../components';
import {SelectedLanguageState} from '../../states';
import LoginButton from '../login/components/login-button';
import {Routes} from '../routes/constants';
import {useLoginAuth} from '../routes/hooks/use-login-auth';
import {ConfirmationLogoutModal} from './components/logout/logout-modal';
import {ProfileDetails} from './components/profile-details';
import {profileStyles as styles} from './profile.styles';

export const Profile = ({navigation}: any) => {
  const language = useRecoilValue(SelectedLanguageState);
  const {isLoggedIn} = useLoginAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate(Routes.Login);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Header title={language?.navigation?.profile ?? 'Profile'} />
      {!isLoggedIn ? (
        <LoginButton navigation={navigation} />
      ) : (
        <View style={styles.profileContain}>
          <ProfileDetails navigation={navigation} />
        </View>
      )}

      <ConfirmationLogoutModal navigation={navigation} />
    </View>
  );
};
