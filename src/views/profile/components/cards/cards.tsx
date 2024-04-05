import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {isDarkModeState} from '../../../../states';
import {COLORS, Svg_No_Transaction} from '../../../../assets';
import {Header} from '../../../../components';
import {NoData} from '../../../../components/empty-state';
import {CardsStyles as styles} from './cards.styles';
import {Svg_No_Transaction_light} from '../../../../assets/icon/svg/noTransactions-light';
import {useTheme} from '@react-navigation/native';
import CustomButton from '../../../wallet-details/components/CustomButton';
import {
  AmericanExpress,
  Dote,
  Mastercard,
  MenuSection,
  Visa,
  Close,
  Calendarline,
} from '../../../../assets/images';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TextInput} from 'react-native-gesture-handler';
import CustomeTextinpute from './components/customeTextinpute';

export const Cards = ({navigation}: any) => {
  const {colors} = useTheme();
  const refRBSheet = useRef();

  const cardData = [
    {
      cardNumber: '1234',
      cardImage: Mastercard,
      expiryDate: '11/24',
      backgroundColor: COLORS['color-transparent-dark-white'],
    },
    {
      cardNumber: '8888',
      cardImage: Visa,
      expiryDate: '11/24',
      backgroundColor: '#84C2EB',
    },
    {
      cardNumber: '4567',
      cardImage: AmericanExpress,
      expiryDate: '11/24',
      backgroundColor: '#016FD0',
    },
  ];

  const [cards, setCards] = useState(cardData);

  const [isDarkMode, setIsDarkMode] = useRecoilState(isDarkModeState);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderItem = ({item, index}) => {
    return (
      <View style={[styles.renderItem_mainview, {backgroundColor: colors.box}]}>
        <View style={styles.firstView}>
          <View
            style={[styles.imageView, {backgroundColor: item.backgroundColor}]}>
            <Image
              source={item.cardImage}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={{marginHorizontal: 12}}>
            <View style={styles.detailsView}>
              <Image
                source={Dote}
                style={[styles.doteImage, {tintColor: colors.text}]}
              />
              <Text style={[styles.dots, {color: colors.text}]}>
                {item.cardNumber}
              </Text>
            </View>
            <Text style={styles.expiryText}>Exp. {item.expiryDate}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            alignSelf: 'flex-start',
          }}>
          <Image
            source={MenuSection}
            style={[
              styles.menuImage,
              {
                tintColor: colors.text,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.mainContainer, {backgroundColor: colors.background}]}>
      <Header title="Cards" goBack={goBack} />
      {cards.length > 0 ? (
        <View style={{flex: 1}}>
          <FlatList data={cards} renderItem={renderItem} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <NoData
            msg="Nothing Here"
            subMsg="Add card to trade"
            svg={
              isDarkMode === true
                ? Svg_No_Transaction
                : Svg_No_Transaction_light
            }
            height={200}
          />
        </View>
      )}
      <View
        style={{
          backgroundColor: colors.ground,
          padding: 10,
        }}>
        <CustomButton
          onPress={() => refRBSheet.current.open()}
          customButtonStyle={styles.addBtn}
          label={'Add New Card'}
          labelStyle={styles.addBtnText}
        />
      </View>
      <RBSheet
        ref={refRBSheet}
        height={Dimensions.get('window').height / 1.5}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            backgroundColor: colors.box,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          },
          wrapper: {
            backgroundColor: 'transparent',
          },
        }}>
        <View>
          <View style={styles.headerMainView}>
            <View style={{flex: 0.12}} />
            <View style={styles.headerMiddleView}>
              <Text style={[styles.rbsheetHeaderText, {color: colors.text}]}>
                Add card
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => refRBSheet.current.close()}
              style={styles.closeButton}>
              <Image
                source={Close}
                style={[styles.closeImage, {tintColor: colors.text}]}
              />
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal: 15}}>
            <CustomeTextinpute
              headerText={'Card Number'}
              placeholderText={'1234 1234 1234 1234'}
              keyboardType={'numeric'}
              isIcon={false}
              icon={''}
              maxlength={12}
            />
            <CustomeTextinpute
              headerText={'Card Holders Name'}
              placeholderText={'Pratik shingh'}
              keyboardType={'default'}
              isIcon={false}
              icon={''}
              maxlength={150}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, marginRight: 5}}>
                <CustomeTextinpute
                  headerText={'Expiry'}
                  placeholderText={'11/14'}
                  keyboardType={'numbers-and-punctuation'}
                  isIcon={true}
                  icon={Calendarline}
                  maxlength={5}
                />
              </View>
              <View style={{flex: 1, marginLeft: 5}}>
                <CustomeTextinpute
                  headerText={'CVV'}
                  placeholderText={'123'}
                  keyboardType={'numeric'}
                  isIcon={false}
                  icon={''}
                  maxlength={3}
                />
              </View>
            </View>
          </View>
          <View style={styles.rbsheetBottomView}>
            <CustomButton
              onPress={() => refRBSheet.current.close()}
              customButtonStyle={[styles.addBtn, {marginTop: 0}]}
              label={'Add Card'}
              labelStyle={styles.addBtnText}
            />
          </View>
        </View>
      </RBSheet>
    </View>
  );
};
