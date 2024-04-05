import React, {useCallback, useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilState} from 'recoil';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '@react-navigation/native';

import {auctionStyles as styles} from './../auction.styles';
import {SVG} from '../../../storybook';
import {Svg_Asset_Flag, Svg_Bank} from '../../../assets';
import {auctionListState} from '../states';
import {Routes} from '../../../views/routes/constants';
import {Auction_Image} from '../../../assets/images';
import Timer from '../../../views/auction-details/components/Timer';
import {timeConverter} from '../../../views/auction-details/comman/utility';
import {useNetwork} from '../../../hooks';
import {APIS} from '../../../constants';
import {useCurrency} from '../../../hooks/use-currency';
import { Svg_Blue_Bank } from '../../../assets/icon/svg/blue-bank';

export const AuctionList = ({navigation, item, index}: any) => {
  const {
    assetImage,
    assetIcon,
    stepPrice,
    currentBidPrice,
    startPrice,
    name,
    isWatchlist,
    symbol,
    status,
    tradeType,
    startTime,
    endTime,
    id,
    symbolValue,
    category,
  } = item ?? {};
  const [auctionList, setAuctionList] = useRecoilState(auctionListState);
  const [isLike, setIsLike] = useState(isWatchlist);
  const [outerStatus, setOuterStatus] = useState(status);
  const {colors} = useTheme();
  const {formatCurrency} = useCurrency();
  const {post: manageWishlist} = useNetwork();
  const {days, hours, minutes, remainingSeconds} = timeConverter(
    status !== 'Live' ? endTime : startTime,
  );

  const handleCallBack = (val: any) => {
    setOuterStatus(val);
  };
  const handleLike = useCallback(() => {
    setIsLike(!isLike);
    const payload = {
      auctionId: id,
      isWatchlist: !isLike,
    };
    manageWishlist(APIS.auctionWatchlist, payload)
      .then(res => {
        console.log('Success', res);
        if (res == 'Success') {
          setIsLike(!isLike);
        } else {
          setIsLike(isLike);
        }
      })
      .catch(e => {
        setIsLike(isLike);
        console.log('Error in auction Wishlist=', e);
      });
  }, [isLike]);

  useEffect(() => {
    setOuterStatus(status);
  }, [status]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(Routes.AuctionDetails, {
          auctionId: item.id,
          isWatchlist: isWatchlist,
        })
      }
      style={[
        styles.listWrapper,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <View style={styles.imageWrapper}>
        <View style={styles.imageContainer}>
          <Image
            source={assetImage[0] ? {uri: assetImage[0]} : Auction_Image}
            style={styles.heroImage}
          />
          <View style={styles.flagContainer}>
            <Text style={styles.flagText}>{category}</Text>
            <SVG name={Svg_Asset_Flag} width={6} height={20} />
          </View>
          {/*  need to work on this timer styles */}

          <View style={styles.timerContainer}>
            <Timer
              type={tradeType}
              startDate={startTime}
              endTime={endTime}
              formList={true}
              status={outerStatus}
              setOuterStatus={handleCallBack}
            />
            {/* <View>
              <Text style={styles.timerLabel}>{getStatus(status)}</Text>
              {status !== 'completed' ? (
                <Text
                  style={
                    styles.timerText
                  }>{`${days}d ${hours}:${minutes}:${remainingSeconds}`}</Text>
              ) : null}
            </View> */}
          </View>
        </View>
      </View>

      <View style={styles.headingContainer}>
        <View style={styles.profileImageContainer}>
          {!assetIcon ? (
            <SVG name={Svg_Blue_Bank} height={20} width={20} />
          ) : (
            <Image source={{uri: assetIcon}} style={styles.profileImage} />
          )}
        </View>
        <View style={styles.nameWrapper}>
          <View>
            <Text style={[styles.title, {color: colors.text}]}>{name}</Text>
            <View style={styles.textContainer}>
            <Text style={styles.detail}>
                {symbol ?? '--'}{' '}
              </Text>
              <View style={styles.separator} />
              <Text style={[styles.detail, {textTransform: 'uppercase'}]}>
              {' '}{symbolValue ?? '--'}{' '}
              </Text>
              <View style={styles.separator} />
              <Text style={[styles.detail,{textTransform: 'uppercase'}]}>
              {' '}{tradeType ?? '--'}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => handleLike()}>
            <Icon
              name={isLike ? 'heart' : 'heart-o'}
              size={16}
              color={isLike ? 'red' : colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* details section */}
      <View style={styles.upperRow}>
        <View style={styles.mainContainer}>
          <Text style={styles.tagKey}>Current bid prices</Text>
          <Text style={[styles.values, {color: colors.text}]}>
            {formatCurrency(currentBidPrice, 2) ?? 0}
          </Text>
          <Text style={styles.tagKey}>Price step</Text>
          <Text style={[styles.values, {color: colors.text}]}>
            {formatCurrency(stepPrice, 2) ?? 0}
          </Text>
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.tagKey}>Starting bid</Text>
          <Text style={[styles.values, {color: colors.text}]}>
            {formatCurrency(startPrice, 2) ?? 0}
          </Text>
        </View>
      </View>

      {/* lower section of details */}
      {/* <View style={styles.row}>
        <View style={styles.mainContainer}>
          <Text style={styles.tagKey}>Sub category</Text>
          <Text style={[styles.values, {color: colors.text}]}>
            {item?.subCategory ?? '--'}
          </Text>
          <Text style={styles.tagKey}>No. of individual loan</Text>
          <Text style={[styles.values, {color: colors.text}]}>
            {item?.individualLoan ?? '--'}
          </Text>
        </View>
        <View style={styles.mainContainer}>
          <Text style={styles.tagKey}>Loan type</Text>
          <Text style={[styles.values, {color: colors.text}]}>
            {item?.loanType ?? '--'}
          </Text>
        </View>
      </View> */}
    </TouchableOpacity>
  );
};
