// @flow
import React from 'react';
import {View, Modal, Text, TouchableOpacity} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {deleteModalStyle} from './DeleteModal.style';

type DeleteModalType = {
  isOpen: boolean;
  setIsOpen?: any;
  handleConfirm?: any;
  handleCancel: any;
  title: string;
  message: string;
};

const DeleteModal = ({
  title,
  message,
  isOpen,
  handleConfirm,
  handleCancel,
}: DeleteModalType) => {
  const {colors} = useTheme();

  return (
    <Modal visible={isOpen} transparent>
      <View style={deleteModalStyle.container}>
        <View style={[deleteModalStyle.body, {backgroundColor: colors.ground}]}>
          <Text style={[deleteModalStyle.deleteLabel, {color: colors.text}]}>
            {title}
          </Text>
          <Text style={[deleteModalStyle.deleteDesc, {color: colors.text}]}>
            {message}
          </Text>
          <View style={[deleteModalStyle.footer, {borderColor: colors.box}]}>
            <TouchableOpacity
              style={deleteModalStyle.cancelBtn}
              onPress={handleCancel}>
              <Text style={deleteModalStyle.cancelTxt}>No</Text>
            </TouchableOpacity>
            <View
              style={[deleteModalStyle.footerLine, {borderColor: colors.box}]}
            />
            <TouchableOpacity
              style={deleteModalStyle.deleteBtn}
              onPress={handleConfirm}>
              <Text style={deleteModalStyle.deleteTxt}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
