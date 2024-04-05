import React, {useCallback, useMemo, useState} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {useRecoilValue} from 'recoil';
import FontIcon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';

import {Loader, SVG, Sheet} from '../../../../../storybook';
import {CoOwnersDetailsState} from '../states';
import {Header, NoData} from '../../../../../components';
import {capitalize} from '../../../../utils';
import {Svg_Indeterminate_Circle} from '../../../../../assets/icon/svg/indeterminate-block';
import {
  COLORS,
  Svg_Remove_Auth_User,
  Svg_Setting,
  Svg_Vertical_Options_dots,
} from '../../../../../assets';
import {useNetwork} from '../../../../../hooks';
import {APIS, ENVIRONMENT} from '../../../../../constants';
import {toast} from '../../../../../libs';
import {Routes} from '../../../../../views/routes/constants';
import {useFetchOweners} from '../../../../../views/profile/hooks';
import {coOwnersDetailsStyles as styles} from './co-onwer-details.styles';

export const OnwerDetails = ({navigation}: any) => {
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [isRemoveAuth, setIsRemoveAuth] = useState(false);
  const ownersDetails = useRecoilValue(CoOwnersDetailsState);
  const [isLoading, setIsLoading] = useState(false);
  const {colors} = useTheme();
  const {remove} = useNetwork();
  const {fetchOwners, loading} = useFetchOweners();

  const {
    name,
    email,
    phone,
    countryCode,
    type,
    status,
    image,
    _id: id,
    customerId,
  } = ownersDetails ?? {};

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const openRemoveOption = useCallback(() => {
    setIsRemoveOpen(true);
  }, []);

  const handleRemove = useCallback(() => {
    setIsRemoveOpen(false);
    if (type === 'co-owner' && status === 'joined') {
      navigation.navigate(Routes.RemoveCoOwner);
    } else {
      setIsRemoveAuth(true);
    }
  }, [type, status]);

  const handleManageRequest = () => {
    setIsRemoveOpen(false);
    navigation.navigate(Routes.ManageCoOwner);
  };

  const handleClose = useCallback(() => {
    setIsRemoveAuth(false);
  }, []);

  const confirmRemove = useCallback(async () => {
    setIsLoading(true);
    await remove(`${APIS.coOwners}/${id}`).then(data => {
      if (data?.data?.success) {
        try {
          fetchOwners().then(() => {
            handleClose();
            navigation.navigate(Routes.CoOwners);
          });
        } catch {
          (err: any) => console.log(err);
        }
      } else if (data?.message) {
        toast(data.message);
      }
    });
    setIsLoading(false);
  }, [id, navigation]);

  const renderRemoveConfirmation = useMemo(() => {
    return (
      <>
        <View style={styles.removeMainContainer}>
          <View style={styles.removeConfirmationContainer}>
            <TouchableOpacity style={styles.cancelBtn} onPress={handleClose}>
              <FontIcon
                name="close"
                color="gray"
                size={20}
                style={{alignSelf: 'flex-end'}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.confirmationContainer}>
            <NoData
              svg={Svg_Remove_Auth_User}
              msg="Remove Authorised User"
              height={180}
            />
            <Text style={[styles.cancelHeadingTxt, {color: colors.text}]}>
              Are you sure you want to remove Authorised User?
            </Text>
            <Text style={[styles.cancelDescTxt, {color: colors.text}]}>
              Do you want to cancel it?
            </Text>
          </View>
          <View style={styles.cancelBtnContainer}>
            <TouchableOpacity
              style={[styles.cancelContainer, {backgroundColor: colors.ground}]}
              onPress={handleClose}>
              <Text style={{fontWeight: '500', color: colors.text}}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.removeContainer}
              onPress={confirmRemove}
              disabled={isLoading}>
              {isLoading ? (
                <Loader size={'small'} top={0} />
              ) : (
                <Text style={{fontWeight: '500', color: colors.text}}>
                  Remove
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }, [id, isLoading]);

  return (
    <>
      {!isRemoveAuth ? (
        <View>
          <Header
            goBack={goBack}
            title={name ?? 'Owner details'}
            rightIcon={Svg_Vertical_Options_dots}
            rightFunction={openRemoveOption}
          />
          <View style={styles.container}>
            <View>
              <View
                style={[styles.profileCard, {backgroundColor: colors.ground}]}>
                <View style={styles.headerContainer}>
                  <View
                    style={[
                      styles.ImageContainer,
                      {backgroundColor: colors.border},
                    ]}>
                    <Image source={{uri: image}} style={styles.image} />
                  </View>
                  <Text style={[styles.headerNameTxt, {color: colors.text}]}>
                    {name ?? ''}
                  </Text>
                  {
                    customerId ? 
                    <Text style={styles.AccountID}>
                    Account ID: {customerId}
                    </Text> : null
                  }
                </View>

                <View style={styles.detailContainer}>
                  <View style={styles.details}>
                    <Text style={styles.txtKeys}>Email</Text>
                    <Text style={[styles.txtValue, {color: colors.text}]}>
                      {email ?? ''}
                    </Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.txtKeys}>Phone</Text>
                    <Text style={[styles.txtValue, {color: colors.text}]}>
                      {`(${countryCode}) ${phone}`}
                    </Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.txtKeys}>User Type</Text>
                    <Text style={[styles.txtValue, {color: colors.text}]}>
                      {capitalize(type ?? '')}
                    </Text>
                  </View>
                  <View style={styles.detailsLast}>
                    <Text style={styles.txtKeys}>Status</Text>
                    <View style={styles.statusContainer}>
                      <View
                        style={[
                          styles.statusIndicator,
                          {
                            backgroundColor:
                              status === 'pending'
                                ? 'orange'
                                : status === 'removal pending'
                                ? COLORS['color-blue']
                                : 'green',
                          },
                        ]}
                      />
                      <Text style={[styles.txtValue, {color: colors.text}]}>
                        {capitalize(status ?? '')}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : (
        renderRemoveConfirmation
      )}
      <Sheet
        isModal={isRemoveOpen}
        setIsModal={() => setIsRemoveOpen(false)}
        height={170}
        backgroundColor={colors.ground}>
        <View style={styles.actionsContainer}>
          <Text style={[styles.actionTxt,{color:colors.text}]}>Actions</Text>
          <TouchableOpacity onPress={() => setIsRemoveOpen(false)}>
            <FontIcon
              name="close"
              color={colors.text}
              size={20}
              style={{alignSelf: 'flex-end'}}
            />
          </TouchableOpacity>
        </View>
        {status !== 'removal pending' ? (
          <TouchableOpacity style={[styles.removePopBtn,{backgroundColor:colors.border}]} onPress={handleRemove}>
            <SVG name={Svg_Indeterminate_Circle} width={20} height={20} />
            <Text style={styles.removePopTxt}>Remove</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.removePopBtn,{backgroundColor:colors.border}]}
            onPress={handleManageRequest}>
            <SVG
              name={Svg_Setting}
              width={20}
              height={20}
              color={colors.lightText}
            />
            <Text style={[styles.removePopTxt, {color: colors.lightText}]}>
              Manage Removal Request
            </Text>
          </TouchableOpacity>
        )}
      </Sheet>
    </>
  );
};
