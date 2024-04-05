import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {useNetwork} from '../../../../../../hooks';
import {CoOwnerFooterStyles as styles} from './co-owner-footer.styles';
import {APIS} from '../../../../../../constants';
import {useFetchOweners} from '../../../../hooks';
import {Loader} from '../../../../../../storybook';
import {useTheme} from '@react-navigation/native';
import {COLORS} from '../../../../../../assets';

export const CoOwnerFooter = ({form, onCancel, setIsValid, isValid}: any) => {
  const [loading, setLoading] = useState(false);
  const {post, data} = useNetwork();
  const {fetchOwners} = useFetchOweners();
  const {colors} = useTheme();

  const onInvite = useCallback(() => {
    setLoading(true);
    const nameValidation = /^[a-zA-Z]{3,15}$/;
    const emailValidation =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    setIsValid({
      FirstName: nameValidation.test(form.firstName),
      LastName: nameValidation.test(form.lastName),
      Email: emailValidation.test(form.email),
      countryCode: form?.countryCode !== '',
    });

    if (
      nameValidation.test(form.firstName) &&
      nameValidation.test(form.lastName) &&
      emailValidation.test(form.email) &&
      form?.countryCode !== ''
    ) {
      const payload = {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email.toLowerCase(),
        countryCode: form.countryCode,
        mobile: form.phone,
        type: form.type === 'Co-Owner' ? 'co-owner' : form.type,
        isTradeEnabled: form.tradingPermission,
        isTransactionEnabled: true, //temperory hardcoded changes
      };

      post(APIS.coOwners, payload);
    } else setLoading(false);
  }, [form]);

  const handleAlert = useCallback(() => {
    setIsValid((prev: any) => {
      const newState = {...prev, other: false};
      return newState;
    })
  }, [])

  useEffect(() => {
    if (data?.message) {
      setIsValid((prev: any) => {
        let newState = {};
        if(data?.message == 'Please verify your email first.'){
          newState = {...prev, other: true};
          Alert.alert(data.message, '', [
            {text: 'OK', onPress: handleAlert},
          ])
          
        }
        else if (data.message?.includes('email')) {
          newState = {...prev, Email: data.message};
        } else {
          newState = {...prev, countryCode: data.message};
        }
        setLoading(false);
        return newState;
      });
    } else if (data) {
      try {
        fetchOwners();
      } catch {
        setIsValid((prev: any) => {
          const newState = {...prev, countryCode: 'Something went wrong.'};
          return newState;
        });
      } finally {
        onCancel();
        setLoading(false);
      }
    }
  }, [data]);

  const isDisabled = useMemo(
    () => form?.phone?.length < 8 || loading || isValid.other,
    [form?.phone, loading, isValid.other],
  );

  return (
    <>
      <View style={styles.footerWrapper}>
        <TouchableOpacity
          style={[styles.btnContainer, {backgroundColor: colors.btnCancel}]}
          onPress={onCancel}>
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnContainer,
            {
              backgroundColor:
                isValid.Email &&
                isValid.FirstName &&
                isValid.LastName &&
                !isDisabled
                  ? COLORS.button_blue
                  : COLORS.diabale_button_blue,
            },
          ]}
          onPress={onInvite}
          disabled={isDisabled}>
          {loading ? (
            <Loader top={0} size={'small'} />
          ) : (
            <Text
              style={[
                styles.btnText,
                {
                  color:
                    isValid.Email &&
                    isValid.FirstName &&
                    isValid.LastName &&
                    !isDisabled
                      ? COLORS.white
                      : COLORS['btn-disabled'],
                },
              ]}>
              Invite User
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};
