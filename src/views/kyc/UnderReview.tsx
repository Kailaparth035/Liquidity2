import {View, Text, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SVG} from '../../storybook';
import {REVIEW} from '../../constants';
import {SVG_REVIEW} from '../../assets/icon/svg/review';
import {Routes} from '../routes/constants';
import {ProfileDataState} from '../../states';
import {useRecoilValue} from 'recoil';
import {useInterval,useNetwork} from '../../hooks';
import {KycStyles as styles} from './Kyc.styles';
import {APIS} from '../../constants';

const UnderReview = ({navigation}: any) => {
  const [userData, SetUserData] = useState({});
  const userDetails = useRecoilValue(ProfileDataState);
  const {get} = useNetwork(false);


  const getProfileData = useCallback(() => {
    get(APIS.Users).then(userData => {
      if (userData?.data) {
        SetUserData(userData.data);
      }
    });
  }, [get]);

  useInterval(getProfileData, 3000);

  const Kyc = userData?.onboardingData;

  useEffect(() => {
    if (
      Kyc?.isOnboardingComplete == true
    ) {
      navigation.navigate(Routes.SuccessRejected);
    }
  },[userData]);

  const handleCall = useCallback(() => {
    navigation.navigate(Routes.SuccessRejected);
  }, [navigation]);

  return (
    <View style={styles.underMain}>
      <SVG name={SVG_REVIEW} height={120} />
      <View style={styles.underView}>
        <Text style={styles.underText}>
          Verification submission is under review
        </Text>
        <Text style={styles.reviewDesc}>{REVIEW}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.disbaleExpBtn,
          {
            backgroundColor:
            userData?.onboardingData?.isOnboardingComplete == true
                ? '#4574F5'
                : '#696969',
          },
        ]}
        onPress={handleCall}
        disabled={
          userData?.onboardingData?.isOnboardingComplete == true
            ? false
            : true
        }>
        <Text style={styles.exploreTxt}>Explore Liquidity</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UnderReview;
