import React, {Dispatch, SetStateAction} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {styles} from '../../styles';
import Button from '../Button';
import {COLORS} from '../../../../assets';
import {SVG} from '../../../../storybook';
import {PDF_ICON_SVG} from '../../../../assets/icon/svg/pdf-icon';

type DetailModalType = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isAsset: boolean;
};

const DetailModal = ({setShowModal, isAsset}: DetailModalType) => {
  const {colors} = useTheme();
  return (
    <View style={{backgroundColor: colors.background, flex: 1}}>
      <View>
        <TouchableOpacity
          style={styles.crossButton}
          onPress={() => {
            setShowModal(false);
          }}>
          <Icons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.modalConatiner}>
        <Text style={[styles.headerText, {color: colors.text}]}>
          {isAsset ? '<ABC Name> Minted asset' : 'Co-owner Removal Process'}
        </Text>
        <Text style={[styles.descriptionText, {color: colors.text}]}>
          {isAsset
            ? `Need to press accept to Mint new Asset.`
            : `Account owner has initiated a co-owner removal process. Please find the attached document detailing this request.`}
        </Text>
        {isAsset ? null : (
          <>
            <View style={styles.DocumentTextContainer}>
              <Text
                style={[
                  styles.headerText,
                  {color: colors.text, alignSelf: 'flex-start'},
                ]}>
                Documents
              </Text>
              <Text style={styles.fileText}>2 file</Text>
            </View>
            <View style={[styles.footerButtonContainer, {marginTop: 0}]}>
              <View
                style={[styles.iconContaner, {backgroundColor: colors.box}]}>
                <SVG name={PDF_ICON_SVG} width={24} height={28} />
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[styles.subTitle, {color: colors.text}]}>
                  Removal Request.pdf
                </Text>
                <Text
                  style={[
                    styles.fileText,
                    {
                      color: COLORS['color-text-light-50'],
                      alignSelf: 'flex-start',
                    },
                  ]}>
                  2.4MB
                </Text>
              </View>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <TouchableOpacity style={styles.ViewButton}>
                  <Text
                    style={[
                      styles.subTitle,
                      {color: COLORS['primary-dark'], paddingRight: 8},
                    ]}>
                    View
                  </Text>
                  <Icons
                    name={'remove-red-eye'}
                    color={COLORS['primary-dark']}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        <View style={styles.footerButtonContainer}>
          <Button
            label={'Deny'}
            style={{
              backgroundColor: colors.box,
              marginRight: 8,
            }}
          />
          <Button
            label={'Accept'}
            style={{
              backgroundColor: COLORS['primary-light'],
              marginLeft: 8,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DetailModal;
