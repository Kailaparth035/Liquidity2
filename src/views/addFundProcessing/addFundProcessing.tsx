import React, {Component} from 'react';
import {View, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {Close} from '../../assets/images';
import TransactionDetails from '../../views/addFundProcessing/components/transactionDetails';
import CustomButton from '../../views/wallet-details/components/CustomButton';
import {addFundProcessingStyles} from './addFundProcessing.style';
import TextDescription from './components/textDescription';
import {Routes} from '../../views/routes/constants';

const AddFundProcessing = ({navigation, route}: any) => {
  const status = route.params?.status;
  const id = route.params?.id;
  const transectionType = route.params?.transectionType;
  const amount = route.params?.amount;
  const {colors} = useTheme();
  return (
    <SafeAreaView
      style={[
        addFundProcessingStyles.balanceSheetContainer,
        {backgroundColor: colors.background},
      ]}>
      <TouchableOpacity
        style={addFundProcessingStyles.closeIconButton}
        onPress={() => navigation.pop(3)}>
        <Image
          source={Close}
          style={[
            addFundProcessingStyles.closeIcon,
            {
              tintColor: colors.text,
            },
          ]}
        />
      </TouchableOpacity>
      <View style={addFundProcessingStyles.mainView}>
        <TextDescription
          firstLine={
            status === 'processing'
              ? 'We are processing your'
              : status === 'Completed'
              ? `Your ${
                  transectionType ?? 'Withdraw'
                } was successfully done for`
              : 'Something went wrong with your transaction.'
          }
          headerText={
            status === 'processing'
              ? 'Almost there... ⏰'
              : status === 'Completed'
              ? 'Yay! 🎉'
              : 'Oops! 😬'
          }
          isPrice={
            status === 'processing'
              ? true
              : status === 'Completed'
              ? true
              : false
          }
          lastLine={
            status === 'processing'
              ? 'deposit. Please wait for a while. This may take 1-2 working'
              : status === 'Completed'
              ? ` ${transectionType === 'Deposit' ? 'to' : 'from'} your wallet`
              : 'Please check your payment information and try again.'
          }
          price={` $${amount.replace(/ /g, '')}`}
        />
        <TransactionDetails
          ProcessingStatus={
            status === 'processing'
              ? 'Processing'
              : status === 'Completed'
              ? 'Completed'
              : 'Failure'
          }
          statusView={
            status === 'processing'
              ? 'Processing'
              : status === 'Completed'
              ? 'Completed'
              : 'Failure'
          }
          isStatus={true}
          textFirst={'Status'}
        />
        <TransactionDetails
          ProcessingStatus={id}
          isStatus={false}
          textFirst={'Transaction ID'}
          statusView=""
        />
        <CustomButton
          onPress={() => {
            navigation.pop(3);
          }}
          customButtonStyle={addFundProcessingStyles.addBtn}
          label={'View Transaction'}
          labelStyle={addFundProcessingStyles.addBtnText}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddFundProcessing;
