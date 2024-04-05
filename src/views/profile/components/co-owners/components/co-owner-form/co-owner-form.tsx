import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilValue} from 'recoil';
import {useTheme} from '@react-navigation/native';

import {COLORS} from '../../../../../../assets';
import RadioButton from '../../../../../add-funds/components/RadioButton';
import {CoOwnerFooter} from '../footer';
import {SVG, SelectScroll} from '../../../../../../storybook';
import {COUNTRIES} from '../../../../../login/constants/countries';
import {isDarkModeState} from '../../../../../../states';
import {coOwnersStyles as styles} from '../../co-onwers.styles';
import {
  pickerSelectStylesNew as dummy,
  pickerSelectStyles,
} from '../../co-onwers.styles';
import {SvgUri} from 'react-native-svg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const CoOwnerForm = ({
  form,
  setForm,
  handleChange,
  onFormCancel,
  isValid,
  setIsValid,
}: any) => {
  const isDark = useRecoilValue(isDarkModeState);
  const {colors} = useTheme();
  const [country, setCountry] = useState();
  const assetType = ['Co-Owner', 'Authorised User'];

  useEffect(() => {
    const countryObj: any = COUNTRIES.find(
      item => item.value == form.countryCode,
    );
    setCountry(countryObj?.image);
  }, [form.countryCode]);

  return (
    <>
      <View style={[styles.formContainer, {backgroundColor: colors.ground}]}>
        <View style={styles.formHeader}>
          <Text style={[styles.headingTxt, {color: colors.text}]}>
            Invite User
          </Text>
          <TouchableOpacity onPress={onFormCancel} style={styles.wrapper}>
            <Text style={[styles.closeBtn, {color: colors.text}]}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formInputContainer}>
          <View style={styles.inputWrapper}>
            <View style={styles.firstInput}>
              <Text style={[styles.keyTxt, {color: colors.text}]}>
                First Name
              </Text>
              <TextInput
                style={[
                  styles.inputField,
                  {borderColor: colors.inputlogin, color: colors.text},
                ]}
                onChangeText={val => handleChange('firstName', val)}
                placeholder="First Name"
                value={form.firstName}
                placeholderTextColor={'#51545C'}
              />
              {!isValid?.FirstName && isValid?.FirstName != null ? (
                <Text style={styles.errorMessage}>Invalid first name</Text>
              ) : (
                <Text> </Text>
              )}
            </View>
            <View style={styles.secondColomn}>
              <Text style={[styles.keyTxt, {color: colors.text}]}>
                Last Name
              </Text>
              <TextInput
                style={[
                  styles.inputField,
                  {borderColor: colors.inputlogin, color: colors.text},
                ]}
                onChangeText={val => handleChange('lastName', val)}
                placeholder="Last Name"
                value={form.lastName}
                placeholderTextColor={'#51545C'}
              />
              {!isValid?.LastName && isValid?.LastName != null ? (
                <Text style={styles.errorMessage}>Invalid last name</Text>
              ) : (
                <Text> </Text>
              )}
            </View>
          </View>
          <View style={styles.row}>
            <Text style={[styles.keyTxt, {color: colors.text}]}>
              Email Address
            </Text>
            <TextInput
              style={[
                styles.inputField,
                {borderColor: colors.inputlogin, color: colors.text},
              ]}
              onChangeText={val => handleChange('email', val)}
              placeholder="Enter Email"
              value={form.email}
              placeholderTextColor={'#51545C'}
            />
            {(!isValid?.Email && isValid?.Email != null) ||
            isValid.Email?.length > 0 ? (
              <Text style={styles.errorMessage}>
                {isValid.Email?.length > 0 ? isValid.Email : 'Invalid email'}
              </Text>
            ) : (
              <Text> </Text>
            )}
          </View>
          <View style={styles.row}>
            <Text style={[styles.keyTxt, {color: colors.text}]}>
              Phone Number
            </Text>
            <View style={styles.inputWrapper}>
              <View style={styles.head}>
                <View
                  style={[
                    styles.countrySelect,
                    {borderRightColor: colors.border},
                  ]}>
                  <View style={{marginTop: -5, marginRight: 5}}>
                    <SvgUri width={40} height={40} uri={country} />
                  </View>

                  <SelectScroll
                    style={isDark === true ? dummy : pickerSelectStyles}
                    name="country"
                    options={COUNTRIES}
                    label="Country"
                    selectedItem={form.countryCode}
                    setSelectedItem={val => handleChange('countryCode', val)}
                    placeholder="Select Country"
                    Icon={() => {
                      return (
                        <FontAwesome
                          name="caret-down"
                          size={18}
                          color={colors.text}
                        />
                      );
                    }}
                    iconContainer={{top: 6, left: 8}}
                  />
                  <View style={styles.verticalLine} />
                </View>

                <Text style={[styles.countryCode, {color: colors.text}]}>
                  {form.countryCode}
                </Text>

                <TextInput
                  style={[
                    styles.loginInput,
                    {
                      color: colors.text,
                      marginLeft: form.countryCode.length > 3 ? 115 : 100,
                    },
                  ]}
                  placeholder="XXXXXXXXXX"
                  keyboardType="numeric"
                  placeholderTextColor={'#51545C'}
                  maxLength={10}
                  onChangeText={val => handleChange('phone', val)}
                  value={form.phone}
                />
              </View>
            </View>
            {(!isValid.countryCode && isValid.countryCode != null) ||
            isValid.countryCode?.length > 0 ? (
              <Text style={styles.errorMessage}>
                {isValid.countryCode?.length > 0
                  ? isValid.countryCode
                  : 'Please enter coutry code'}
              </Text>
            ) : (
              <Text> </Text>
            )}
          </View>
          <View>
            <Text style={[styles.inputContainer, {color: colors.text}]}>
              Select User Type
            </Text>
            {assetType.map(type => (
              <RadioButton
                isSelected={form.type === type}
                subType={type}
                onPress={() => handleChange('type', type)}
              />
            ))}
          </View>
          <View style={styles.goodTillcancelView}>
            <View style={styles.goodTillcancelTextView}>
              <Text style={[styles.goodTillCancelText, {color: colors.text}]}>
                Trading Permission
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                setForm((prev: any) => {
                  const newState = {
                    ...prev,
                    tradingPermission: !prev.tradingPermission,
                  };
                  return newState;
                })
              }
              style={[
                styles.toggleView,
                {
                  backgroundColor: form.tradingPermission
                    ? COLORS['primary-light']
                    : colors.box,

                  alignItems: form.tradingPermission
                    ? 'flex-end'
                    : 'flex-start',
                },
              ]}>
              <TouchableOpacity
                onPress={() =>
                  setForm((prev: any) => {
                    const newState = {
                      ...prev,
                      tradingPermission: !prev.tradingPermission,
                    };
                    return newState;
                  })
                }
                style={styles.toggleButton}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={[styles.footerContainer, {borderTopColor: colors.inputlogin}]}>
        <CoOwnerFooter
          form={form}
          onCancel={onFormCancel}
          isValid={isValid}
          setIsValid={setIsValid}
        />
      </View>
    </>
  );
};
