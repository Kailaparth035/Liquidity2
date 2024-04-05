import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {Header} from '../../components';
import CustomeDetailsView from './components/customeDetailsView';
import CustomButton from '../wallet-details/components/CustomButton';
import {Exclaimnation} from '../../assets/images';
import {useNetwork} from '../../hooks';
import {APIS} from '../../constants';
import {styles} from './wireDeposite.style';
import {useRecoilValue} from 'recoil';
import {ProfileDataState} from '../../states';

const WireDeposite = ({navigation}: any) => {
  const [depositeWire, setDepositeWire] = useState<any>({});
  const userInfo = useRecoilValue(ProfileDataState);
  const {colors} = useTheme();
  const {get, data} = useNetwork();

  const accountID = userInfo?.accounts?.[0]?.accountId;

  useEffect(() => {
    get(APIS.paymentInitiation + '/123');
  }, []);

  useEffect(() => {
    if (data?.data) {
      setDepositeWire(data.data);
    }
  }, [data]);

  const {wire} = depositeWire ?? {};
  return (
    <View style={[styles.wireContainer, {backgroundColor: colors.background}]}>
      <Header
        goBack={() => navigation.goBack()}
        title={'Wire transfer details'}
      />

      <>
        <Text
          style={[
            styles.headerText,
            {
              color: colors.text,
            },
          ]}>
          Please wire transfer money to the given account details below.
        </Text>
        <ScrollView
          style={styles.pageContainer}
          showsVerticalScrollIndicator={false}>
          <CustomeDetailsView
            title="Account number"
            detailsText={wire?.accountNumber ?? 'NA'}
          />
          <CustomeDetailsView
            title="Banking name"
            detailsText={wire?.receiverBankName ?? 'NA'}
          />
          <CustomeDetailsView
            title="Routing number"
            detailsText={wire?.routingNumber ?? 'NA'}
          />
          <CustomeDetailsView
            title="Address"
            detailsText={`${wire?.receiverBankAddress?.street1 ?? ''} ${
              wire?.receiverBankAddress?.street2 ?? ''
            },${wire?.receiverBankAddress?.city ?? ''},${
              wire?.receiverBankAddress?.state ?? ''
            },${wire?.receiverBankAddress?.country ?? ''}, ${
              wire?.receiverBankAddress?.postalCode ?? ''
            }`}
          />
          <CustomeDetailsView
            title="Comment/Memo ID"
            detailsText={`${accountID ?? 'NA'}`}
          />
        </ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View style={styles.noteView}>
            <Image
              source={Exclaimnation}
              style={[
                styles.exclaimnationImage,
                {
                  tintColor: colors.text,
                },
              ]}
            />
            <Text
              style={[
                styles.noteText,
                {
                  color: colors.text,
                },
              ]}>
              Note: $15 will be charged for every transaction done using wire
              transfer.
            </Text>
          </View>
          <View
            style={[
              styles.customeButtonView,
              {backgroundColor: colors.ground},
            ]}>
            <View style={{flex: 1}}>
              <CustomButton
                label="Back"
                onPress={() => navigation.goBack()}
                isDarkButton={true}
                customButtonStyle={[
                  styles.button,
                  styles.buttonextraStyle,
                  {
                    backgroundColor: colors.box,
                  },
                ]}
                labelStyle={[styles.buttonText, {color: colors.text}]}
              />
            </View>
            {/* <View style={{flex: 1}}>
              <CustomButton
                label="Verify wire"
                onPress={() => {
                  alert('under development');
                }}
                customButtonStyle={[
                  styles.button,
                  {marginLeft: 7, padding: 5, borderRadius: 8},
                ]}
                labelStyle={styles.buttonText}
              />
            </View> */}
          </View>
        </View>
      </>
    </View>
  );
};

export default WireDeposite;
