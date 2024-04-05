import React, {useCallback, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
import {useRecoilValue} from 'recoil';
import {ProfileDataState, useKeyChain} from '../../states';
import {useLogout, useNetwork} from '../../hooks';
import {KycStyles as styles} from './Kyc.styles';
import {APIS} from '../../constants';
import {Loader} from '../../storybook/loader';
import {Routes} from '../../views/routes/constants';
import {toast} from '../../libs';

interface IIsValid {
  FirstName: null | boolean;
  LastName: null | boolean;
  Email: null | boolean;
}
const KycDetailPage = ({navigation}: any) => {
  const userDetails = useRecoilValue(ProfileDataState);

  const [user, setUser] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
  });

  const [isValid, setIsValid] = useState<IIsValid>({
    FirstName: null,
    LastName: null,
    Email: null,
  });

  const {logout} = useLogout();
  const {patch, data} = useNetwork();
  const {getProfileData} = useKeyChain();
  const [isLoading, setIsloading] = useState(false);
  const dataValue2 = false;

  const handleOnChange = useCallback((title: string, e: any) => {
    setUser(prev => {
      const newState = {...prev, [title]: e};
      return newState;
    });
  }, []);
  

  const handleProceed = useCallback(() => {
    const {FirstName, LastName, Email} = user;
    const nameValidation = /^[a-zA-Z]{3,15}$/;
    const emailValidation =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (
      nameValidation.test(FirstName) &&
      nameValidation.test(LastName) &&
      emailValidation.test(Email)
    ) {
      const payload = {
        firstName: FirstName.trim(),
        lastName: LastName.trim(),
        email: Email.toLocaleLowerCase(),
      };
      patch(`${APIS.Users}/${userDetails?.id ?? ''}`, payload)
        .then(resp => {
          if (resp?.success) {
            //getProfileData();
            navigation.navigate(Routes.KycPage,{dataValue2});
          }
          toast(resp?.message);
        })
        .catch(err => {
          toast(err);
        })
        .finally(() => {
          setIsloading(false);
        });
    }
    setIsValid({
      FirstName: nameValidation.test(FirstName),
      LastName: nameValidation.test(LastName),
      Email: emailValidation.test(Email),
    });

    isValid.FirstName && isValid.LastName && isValid.Email
      ? setIsloading(true)
      : setIsloading(false);
  }, [user, userDetails?.id]);

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.titleText,
          {marginTop: Platform.OS === 'android' ? 40 : 0},
        ]}>
        First Name
      </Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor={'#5f6671'}
        value={user.FirstName}
        onChangeText={e => handleOnChange('FirstName', e)}
      />

      {!isValid?.FirstName && isValid?.FirstName != null ? (
        <Text style={styles.errorMessage}>Invalid first name</Text>
      ) : (
        <Text> </Text>
      )}

      <Text style={styles.titleText}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor={'#5f6671'}
        onChangeText={e => handleOnChange('LastName', e)}
        value={user.LastName}
      />
      {!isValid?.LastName && isValid?.LastName != null ? (
        <Text style={styles.errorMessage}>Invalid last name</Text>
      ) : (
        <Text> </Text>
      )}

      <Text style={styles.titleText}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'#5f6671'}
        onChangeText={e => handleOnChange('Email', e)}
        value={user.Email}
      />

      {!isValid?.Email && isValid?.Email != null ? (
        <Text style={styles.errorMessage}>Invalid email</Text>
      ) : (
        <Text> </Text>
      )}

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
        }}>
        {user.FirstName && user.LastName && user.Email ? (
          <TouchableOpacity
            style={styles.proceedButton}
            onPress={handleProceed}>
            <Text style={{color: '#fff', textAlign: 'center', fontSize: 18}}>
              {isLoading ? (
                <Loader top={0} size={20} color={'white'} />
              ) : (
                <Text
                  style={{color: '#fff', textAlign: 'center', fontSize: 18}}>
                  Proceed
                </Text>
              )}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.disableButton} disabled>
            <Text style={{color: '#fff', textAlign: 'center', fontSize: 18}}>
              {isLoading ? (
                <Loader top={0} size={20} color={'white'} />
              ) : (
                <Text
                  style={{color: '#fff', textAlign: 'center', fontSize: 18}}>
                  Proceed
                </Text>
              )}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default KycDetailPage;
