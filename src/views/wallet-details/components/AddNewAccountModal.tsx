// @flow
import React, {Dispatch, SetStateAction} from 'react';
import {
  View,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {BankLine} from '../../../assets/images/index';
import {close_line} from '../../../assets/icon/svg/close-line';
import {COLORS} from '../../../assets';
import {SVG} from '../../../storybook/svg';
import CustomButton from './CustomButton';
import {modalStyles} from './ModelStyle';
type AddNewAccountModalType = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  onPress: () => void;
};

const AddNewAccountModal = ({
  showModal,
  setShowModal,
  onPress,
}: AddNewAccountModalType) => {
  const {colors} = useTheme();

  return (
    <Modal visible={showModal}>
      <SafeAreaView
        style={[modalStyles.parent, {backgroundColor: colors.background}]}>
        <View style={modalStyles.container}>
          <TouchableOpacity
            onPress={() => {
              setShowModal(false);
            }}
            style={[
              modalStyles.closeButton,
              {backgroundColor: colors.headerCard},
            ]}>
            <SVG name={close_line} width={24} height={24} />
          </TouchableOpacity>
          <View
            style={[
              modalStyles.imageContainer,
              {backgroundColor: colors.headerCard},
            ]}>
            <Image source={BankLine} style={modalStyles.imageStyle} />
          </View>
          <Text style={[modalStyles.text, {color: colors.lightText}]}>
            No bank account available
          </Text>
          <CustomButton
            label="Add Account"
            onPress={onPress}
            customButtonStyle={[
              modalStyles.button,
              {backgroundColor: COLORS['primary-light']},
            ]}
            labelStyle={[modalStyles.byttonLabel, {color: COLORS.white}]}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default AddNewAccountModal;
