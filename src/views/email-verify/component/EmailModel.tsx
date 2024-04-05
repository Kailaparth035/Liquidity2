// @flow
import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {deleteModalStyle} from '../../../views/profile/components/bank-accounts/components/DeleteModal.style';

type EmailModelType = {
  loading: boolean;
  handleProceed: () => void;
  showModel: boolean;
  setShowModel: any;
  isValid: boolean;
};

const EmailModel = ({
  loading,
  handleProceed,
  isValid,
  setShowModel,
  showModel,
}: EmailModelType) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsloading] = useState(loading);
  const {colors} = useTheme();

  const handleEmail = (val: string) => {
    setEmail(val);
  };
  return (
    <View style={styles.parent}>
      <Modal
        visible={showModel}
        transparent
        style={{backgroundColor: 'rgba(255,0,0,0.3)'}}>
        <View
          style={[
            deleteModalStyle.container,
            {backgroundColor: 'rgba(45, 45, 46,0.3)'},
          ]}>
          <View
            style={[
              deleteModalStyle.body,
              {backgroundColor: colors.background},
            ]}>
            <Text style={[deleteModalStyle.deleteLabel, {color: colors.text}]}>
              Enter your Email
            </Text>
            <View
              style={{
                borderWidth: 1,
                margin: 20,
                borderRadius: 8,
                padding: 10,
                borderColor: isValid ? colors.box : 'red',
              }}>
              {isLoading ? (
                <ActivityIndicator size={'small'} />
              ) : (
                <TextInput
                  value={email}
                  onChangeText={text => handleEmail(text)}
                  placeholder={'Enter email'}
                  placeholderTextColor={colors.text}
                  style={{color: colors.text}}
                  keyboardType={'email-address'}
                />
              )}
            </View>
            <View style={[deleteModalStyle.footer, {borderColor: colors.box}]}>
              <TouchableOpacity
                style={deleteModalStyle.cancelBtn}
                onPress={() => {
                  handleProceed();
                }}>
                <Text style={deleteModalStyle.cancelTxt}>Submit</Text>
              </TouchableOpacity>
              <View
                style={[deleteModalStyle.footerLine, {borderColor: colors.box}]}
              />
              <TouchableOpacity
                style={deleteModalStyle.deleteBtn}
                onPress={() => {
                  setShowModel(false);
                  setEmail('');
                }}>
                <Text style={deleteModalStyle.deleteTxt}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {},
});
export default EmailModel;
