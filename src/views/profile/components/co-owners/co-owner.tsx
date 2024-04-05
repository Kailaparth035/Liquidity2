import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@react-navigation/native';

import {Header} from '../../../../components';
import {Loader, Sheet} from '../../../../storybook';
import {ADD_CO_OWNERS_DESC, CO_OWNER_NO_DATA} from '../../../../constants';
import {capitalize} from '../../../../views/utils';
import {NoData} from '../../../../components/empty-state';
import {CoOwnersDetailsState, CoOwnersState} from './states';
import {COLORS, Svg_No_Co_Owners} from '../../../../assets';
import {Routes} from '../../../../views/routes/constants';
import {CoOwnerForm} from './components';
import {useFetchOweners} from '../../hooks';
import {coOwnersStyles as styles} from './co-onwers.styles';

export interface IIsValid {
  FirstName: null | boolean;
  LastName: null | boolean;
  Email: null | boolean | string;
  countryCode: null | boolean | string;
  other: boolean;
}

export const CoOwners = ({navigation}: any) => {
  const initialForm = {
    firstName: '',
    lastName: '',
    countryCode: '+1',
    email: '',
    phone: '',
    type: 'Co-Owner',
    tradingPermission: true,
  };
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [isValid, setIsValid] = useState<IIsValid>({
    FirstName: null,
    LastName: null,
    Email: null,
    countryCode: null,
    other: false,
  });
  const coOwners = useRecoilValue(CoOwnersState);
  const setOwnersDetails = useSetRecoilState(CoOwnersDetailsState);
  const {colors} = useTheme();
  const {fetchOwners, loading} = useFetchOweners();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleInviteUser = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const OpenUserDetails = useCallback(
    ownerDetails => {
      setOwnersDetails(ownerDetails);
      navigation.navigate(Routes.CoOwnersDetails);
    },
    [navigation],
  );

  const handleChange = useCallback((key: string, value: string) => {
    setForm(prev => {
      const newState = {...prev, [key]: value};
      return newState;
    });
    const nameValidation = /^[a-zA-Z]{3,15}$/;
    const emailValidation =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    switch (key) {
      case 'firstName':
        setIsValid(prevIsValid => ({
          ...prevIsValid,
          FirstName: nameValidation.test(value),
        }));
        break;
      case 'lastName':
        setIsValid(prevIsValid => ({
          ...prevIsValid,
          LastName: nameValidation.test(value),
        }));
        break;
      case 'email':
        setIsValid(prevIsValid => ({
          ...prevIsValid,
          Email: emailValidation.test(value),
        }));
        break;
      case 'countryCode':
        setIsValid(prevIsValid => ({
          ...prevIsValid,
          countryCode: value !== '',
        }));
        break;
      default:
        break;
    }
  }, []);

  const onFormCancel = useCallback(() => {
    setForm(initialForm);
    setIsValid({
      FirstName: null,
      LastName: null,
      Email: null,
      countryCode: null,
      other: false,
    });
    setIsFormOpen(false);
  }, []);

  const renderItem = useCallback(
    item => {
      return (
        <TouchableOpacity
          style={[
            styles.container,
            {
              backgroundColor: colors.ground,
            },
          ]}
          onPress={() => OpenUserDetails(item)}>
          <View
            style={[
              styles.ImageContainer,
              {backgroundColor: colors.background},
            ]}>
            {item.image !== null && item.image !== '' ? (
              <Image source={{uri: item.image}} style={styles.image} />
            ) : (
              <Text style={styles.firstTxt}>{item?.name?.[0]}</Text>
            )}
          </View>
          <View style={styles.dataContainer}>
            <Text style={[styles.txtName, {color: colors.text}]}>
              {item?.name ?? ''}
            </Text>
            <View style={styles.statusContainer}>
              <Text style={styles.txtType}>
                {item?.type ? capitalize(item.type) : ''}
              </Text>
              <View style={styles.divider} />
              <View
                style={[
                  styles.statusIndicator,
                  {
                    backgroundColor:
                      item.status === 'removal pending'
                        ? COLORS['color-blue']
                        : item.status === 'pending'
                        ? COLORS['color-orange']
                        : COLORS['color-green'],
                  },
                ]}
              />
              <Text style={styles.txtStatus}>
                {item?.status ? capitalize(item.status) : ''}
              </Text>
            </View>
          </View>

          <View style={styles.cardArrow}>
            <FontIcon name="angle-right" color="gray" size={20} />
          </View>
        </TouchableOpacity>
      );
    },
    [coOwners],
  );

  return (
    <>
      <View style={styles.wrapper}>
        <Header goBack={goBack} title="Co-owner/Authorised User" />
        {loading ? (
          <Loader />
        ) : !loading && coOwners?.length === 0 ? (
          <NoData
            svg={Svg_No_Co_Owners}
            msg={CO_OWNER_NO_DATA}
            height={178}
            desc={ADD_CO_OWNERS_DESC}
            TextLineWidth={250}
            alignItems={'center'}
            numberOfLines={2}
            subMsgMarginBottom={-25}
            descFontSize={12}
          />
        ) : (
          <View style={styles.mainContainer}>
            <FlatList
              data={coOwners}
              renderItem={({item}) => renderItem(item)}
              keyExtractor={item => item._id}
            />
          </View>
        )}
      </View>
      <View style={[styles.btnView, {backgroundColor: colors.ground}]}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={handleInviteUser}>
          <Text style={styles.btnText}>Invite User</Text>
        </TouchableOpacity>
      </View>
      <Sheet isModal={isFormOpen} setIsModal={setIsFormOpen} height={660}>
        <CoOwnerForm
          form={form}
          setForm={setForm}
          handleChange={handleChange}
          onFormCancel={onFormCancel}
          isValid={isValid}
          setIsValid={setIsValid}
        />
      </Sheet>
    </>
  );
};
