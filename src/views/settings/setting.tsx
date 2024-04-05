import React, {useCallback, useState} from 'react';
import {Text, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import RNPickerSelect from 'react-native-picker-select';
import {useTheme} from '@react-navigation/native';

import {
  Svg_Arrow_Right,
  Svg_Finance_Coin_Line,
  Svg_Business_Global_Line,
} from '../../assets';
import {Header} from '../../components';
import {APIS} from '../../constants';
import {useNetwork, usePlatform} from '../../hooks';
import {
  useKeyChain,
  ProfileDataState,
  SelectedCurrencyState,
  SelectedLanguageState,
} from '../../states';
import {Loader} from '../../storybook/loader';
import {SVG} from '../../storybook/svg';
import {capitalize} from '../utils';
import {CURRENCIES, LANGUAGE_PAYLOAD, LANGUAGES} from './constants';
import {SettingStyles as styles} from './setting.styles';

export const Setting = ({navigation}: any) => {
  const [currency, setCurrency] = useRecoilState(SelectedCurrencyState);
  const [language, setLanguage] = useRecoilState(SelectedLanguageState);
  const profileData = useRecoilValue(ProfileDataState);

  const {isAndroid} = usePlatform();

  const [isLangLoading, setIsLangLoading] = useState(false);
  const [isCurrencyLoading, setIsCurrencyLoading] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({
    language: language.key ?? 'en',
    currency: currency.code ?? 'USD',
    theme: 'dark',
  });
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    language.language ?? 'english',
  );
  const [selectedLang, setSelectedLang] = useState(language.key ?? 'en');
  const [selectedCurr, setSelectedCurr] = useState(currency.code ?? 'USD');

  const {getProfileData} = useKeyChain();
  const {patch} = useNetwork();
  const {post} = useNetwork();
  const {colors} = useTheme();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const updateData = (language, currency) => {
    const {id} = profileData ?? {};
    const {
      currency: oldCurrency,
      language: selectedLanguage,
      theme,
    } = selectedCurrency ?? {};

    const payload = {
      settings: {
        currency: currency ?? oldCurrency,
        language: language ?? selectedLanguage,
        theme: theme,
      },
    };

    patch(`${APIS.Users}/${id}`, payload)
      .then(currencyData => {
        if (currencyData) {
          const {settings} = currencyData ?? {};
          setCurrency(settings.currency);
          if (settings?.language) {
            const {
              language,
              Trade,
              navigation,
              orders,
              portfolio,
              news,
              key,
              profile,
            } = settings.language ?? {};
            setLanguage((prevState: any) => {
              return {
                ...prevState,
                key,
                language,
                Trade,
                navigation,
                orders,
                portfolio,
                news,
                profile,
              };
            });
          }
        }
      })
      .catch(err => {
        console.log('err', err);
      })
      .finally(() => {
        setIsCurrencyLoading(false);
        setIsLangLoading(false);
        getProfileData();
      });
  };

  const onDoneLanguage = () => {
    if (selectedLang === null) {
      return;
    }

    setSelectedCurrency((prevState: any) => {
      return {...prevState, language: selectedLang};
    });
    setIsLangLoading(true);

    const languageLabel = LANGUAGES.find(lang => lang.value === selectedLang);
    let obj = {
      ...LANGUAGE_PAYLOAD,
      language: languageLabel?.label ?? '',
      key: languageLabel?.value ?? '',
    };

    setSelectedLanguage(languageLabel.label);

    post(APIS.MultiLanguage, obj)
      .then(resp => {
        if (resp === 'default') {
          setIsLangLoading(false);
          return;
        }
        updateData(obj.key, null);
      })
      .catch(err => {
        setIsLangLoading(false);
      });
  };

  const handleCurrency = useCallback(() => {
    if (selectedCurr === null) {
      return;
    }
    setSelectedCurrency((prevState: any) => {
      return {...prevState, currency: selectedCurr};
    });
    setIsCurrencyLoading(true);
    updateData(null, selectedCurr);
  }, [setSelectedCurrency, selectedCurr]);

  return (
    <>
      <Header title="Settings" goBack={goBack} />
      <View
        style={[styles.mainContainer, {backgroundColor: colors.background}]}>
        <View style={styles.tabs}>
          <RNPickerSelect
            onValueChange={val => {
              setSelectedLang(val);
              isAndroid ? onDoneLanguage() : null;
            }}
            value={selectedLang}
            items={LANGUAGES}
            onDonePress={onDoneLanguage}
            onClose={onDoneLanguage}>
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <View style={styles.row}>
                  <View
                    style={[
                      styles.iconContainer,
                      {backgroundColor: colors.box},
                    ]}>
                    <SVG
                      name={Svg_Business_Global_Line}
                      height={20}
                      width={20}
                    />
                  </View>
                  <Text style={[styles.txt, {color: colors.text}]}>
                    Language
                  </Text>
                </View>
              </View>
              <View style={styles.title}>
                <Text style={[styles.titleTxt, {color: colors.text}]}>
                  {isLangLoading ? (
                    <Loader size={20} />
                  ) : (
                    capitalize(selectedLanguage)
                  )}
                </Text>
                <SVG name={Svg_Arrow_Right} height={20} width={20} />
              </View>
            </View>
          </RNPickerSelect>
        </View>
        <View style={styles.tabs}>
          <RNPickerSelect
            onValueChange={val => {
              setSelectedCurr(val);
              isAndroid ? handleCurrency() : null;
            }}
            value={selectedCurr}
            items={CURRENCIES}
            onDonePress={handleCurrency}
            onClose={handleCurrency}>
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <View style={styles.row}>
                  <View
                    style={[
                      styles.iconContainer,
                      {backgroundColor: colors.box},
                    ]}>
                    <SVG name={Svg_Finance_Coin_Line} height={20} width={20} />
                  </View>
                  <Text style={[styles.txt, {color: colors.text}]}>
                    Preferred Currency
                  </Text>
                </View>
              </View>
              <View style={styles.title}>
                <Text style={[styles.titleTxt, {color: colors.text}]}>
                  {isCurrencyLoading ? (
                    <Loader size={20} />
                  ) : (
                    selectedCurrency.currency
                  )}
                </Text>
                <SVG name={Svg_Arrow_Right} height={20} width={20} />
              </View>
            </View>
          </RNPickerSelect>
        </View>
      </View>
    </>
  );
};
