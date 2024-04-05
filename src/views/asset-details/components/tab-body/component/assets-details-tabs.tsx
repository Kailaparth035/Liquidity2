import * as React from 'react';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {COLORS} from '../../../../../assets';
import ScrollSpy from '../../../../../storybook/scroll-spy/scroll-spy';

const SECTIONS = [
  {
    index: 0,
    title: 'Overview',
  },
  {
    index: 1,
    title: 'Technical Charts',
  },

  {
    index: 2,
    title: 'The Problem',
  },
  {
    index: 3,
    title: 'The Solution',
  },
  {
    index: 4,
    title: 'What We Do',
  },
  {
    index: 5,
    title: 'Reasons to Invest',
  },
  {
    index: 6,
    title: 'Media Coverage',
  },
  {
    index: 7,
    title: 'Prominent Investor',
  },
  {
    index: 8,
    title: 'Partnership',
  },
  {
    index: 9,
    title: 'Team',
  },
  {
    index: 10,
    title: 'Market Overview',
  },
];

const MUSICAL_SECTIONS = [
  {
    index: 0,
    title: 'Overview',
  },
  // {
  //   index: 1,
  //   title: 'News',
  // },
];
export const AssetDetailsTabs = ({scrollSection, currentIndex, type}: any) => {
  const [ab, setAb] = React.useState(0);
  const ref = React.useRef(null);
  const {colors} = useTheme();

  const handleScroll = React.useCallback(x => {
    setAb(x);
    scrollSection(x);
  }, []);

  React.useEffect(() => {
    if (currentIndex && currentIndex > 3) {
      setAb(currentIndex - 4);
    }
  }, [currentIndex]);

  return (
    <View style={styles.container} ref={ref}>
      <ScrollSpy
        sections={type ? MUSICAL_SECTIONS : SECTIONS}
        colors={colors}
        keyExtractor={item => item.title}
        stickySectionHeadersEnabled={false}
        showsHorizontalScrollIndicator={false}
        scrollOnClick={(value: string, index: number) => {
          if (value === 'desc') {
            if (ab === 0) {
              return;
            }
            setAb(ab - 1);
            scrollSection(ab - 1);
          }
          if (value === 'inc') {
            if (ab === SECTIONS.length - 1) {
              return;
            }
            setAb(ab + 1);
            scrollSection(ab + 1);
          }
        }}
        scrollToLocationOffset={50}
        tabBarStyle={styles.tabBar}
        index={ab}
        renderTab={({title, index}) => {
          const isActive = index === ab;
          return (
            <TouchableOpacity
              style={{
                borderBottomWidth: 2,
                borderBottomColor: isActive ? '#F5C462' : 'transparent',
              }}
              onPress={() => handleScroll(index)}>
              <Text
                style={
                  isActive
                    ? styles.activeLink
                    : [styles.link, {color: colors.text}]
                }>
                {title}
              </Text>
            </TouchableOpacity>
          );
        }}
        renderItem={({item}) => <></>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 16,
    color: '#878C99',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  activeLink: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 15,
    color: '#F5C462',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS['bg-90-dark'],
  },
  tabBar: {
    borderBottomColor: '#36383D',
    borderBottomWidth: 0,
  },
  tabContainer: {
    borderBottomColor: '#090909',
  },
  tabText: {
    padding: 15,
    color: '#9e9e9e',
    fontSize: 18,
    fontWeight: '500',
  },
  separator: {
    height: 0.5,
    width: '96%',
    alignSelf: 'flex-end',
    backgroundColor: '#eaeaea',
  },
  sectionHeaderContainer: {
    height: 10,
    backgroundColor: '#f6f6f6',
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
  },
  sectionHeaderText: {
    color: '#010101',

    fontSize: 23,
    fontWeight: 'bold',
    paddingTop: 25,
    paddingBottom: 5,
    paddingHorizontal: 15,
  },
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  itemTitle: {
    flex: 1,
    fontSize: 20,
    color: '#131313',
  },
  itemPrice: {
    fontSize: 18,
    color: '#131313',
  },
  itemDescription: {
    marginTop: 10,
    color: '#b6b6b6',
    fontSize: 16,
  },
  itemRow: {
    flexDirection: 'row',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  line: {
    width: 24,
    height: 4,
    backgroundColor: '#F5C462',
    borderRadius: 16,
  },
  heading: {
    color: '#F5C462',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 8,
  },
});
