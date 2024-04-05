import * as React from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  LayoutChangeEvent,
  LayoutRectangle,
  SectionListData,
  RegisteredStyle,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {COLORS} from '../../assets';

import {scrollSpy as styles} from './scroll-spy.style';

//keep it on top as it is global Variable
const WindowWidth = Dimensions.get('window').width;

interface IProps {
  sections: any[];
  renderTab: (section: SectionListData<any>) => React.ReactNode;
  tabBarStyle?: ViewStyle | RegisteredStyle<ViewStyle>;
  currentIndex: number;
  onPress: (index: number) => void;
  scrollOnClick: (value: string, index: number) => void;
  colors:any;
}

interface ITabMeasurements {
  left: number;
  right: number;
  width: number;
  height: number;
}

interface ITabsLayoutRectangle {
  [index: number]: ITabMeasurements;
}

export default class TabBar extends React.PureComponent<IProps, any> {
  private scrollView: React.RefObject<ScrollView> = React.createRef();
  private clickScrollView: React.RefObject<ScrollView> = React.createRef();
  private _tabContainerMeasurements!: LayoutRectangle;
  private _tabsMeasurements: ITabsLayoutRectangle = {};

  componentDidUpdate(prevProps: IProps) {
    if (this.props.currentIndex !== prevProps.currentIndex) {
      if (this.scrollView.current) {
        this.scrollView.current.scrollTo({
          x: this.getScrollAmount(),
          animated: true,
        });
      }
    }
  }

  getScrollAmount = () => {
    const {currentIndex} = this.props;
    const position = currentIndex;
    const pageOffset = 0;

    const containerWidth = WindowWidth;
    const tabWidth = this._tabsMeasurements[position].width;
    const nextTabMeasurements = this._tabsMeasurements[position + 1];
    const nextTabWidth =
      (nextTabMeasurements && nextTabMeasurements.width) || 0;
    const tabOffset = this._tabsMeasurements[position].left;
    const absolutePageOffset = pageOffset * tabWidth;
    let newScrollX = tabOffset + absolutePageOffset;

    newScrollX -=
      (containerWidth -
        (1 - pageOffset) * tabWidth -
        pageOffset * nextTabWidth) /
      2;
    newScrollX = newScrollX >= 0 ? newScrollX : 0;

    const rightBoundScroll = Math.max(
      this._tabContainerMeasurements.width - containerWidth,
      0,
    );

    newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
    return newScrollX;
  };

  onTabContainerLayout = (e: LayoutChangeEvent) => {
    this._tabContainerMeasurements = e.nativeEvent.layout;
  };

  onTabLayout = (key: number) => (ev: LayoutChangeEvent) => {
    const {x, width, height} = ev.nativeEvent.layout;
    this._tabsMeasurements[key] = {
      left: x,
      right: x + width,
      width,
      height,
    };
  };
  scroll = (value: number) => {
    if (this.clickScrollView.current) {
      this.clickScrollView.current.scrollTo({
        x: value,
        animated: true,
      });
    }
  };

  renderTab = (section: SectionListData<any>, key: number) => {
    const {renderTab, onPress, currentIndex, sections} = this.props;
    const isActive: boolean = currentIndex === key;
    return (
      <TouchableOpacity
        onPress={() => onPress(key)}
        key={key}
        onLayout={this.onTabLayout(key)}>
        <View style={styles.scrollSpyItems}>
          {renderTab({isActive, ...section})}
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {sections, tabBarStyle, scrollOnClick,colors} = this.props;
    return (
      <React.Fragment>
        <View
          style={[
            {
              width: WindowWidth,
              backgroundColor:colors.ground,
            },
            tabBarStyle,
            styles.tabBarWrapper,
          ]}>
          <TouchableOpacity
            style={{height: '100%', justifyContent: 'center'}}
            onPress={() => scrollOnClick('desc', 0)}>
            <Icon
              name="md-chevron-back-sharp"
              size={22}
              color={COLORS['font-color-light']}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <ScrollView
            ref={this.scrollView}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{flexDirection: 'row'}}>
            <View
              onLayout={this.onTabContainerLayout}
              style={[{flexDirection: 'row'}]}>
              {sections.map(this.renderTab)}
            </View>
          </ScrollView>

          <TouchableOpacity
            style={{height: '100%', justifyContent: 'center'}}
            onPress={() => scrollOnClick('inc', 1)}>
            <Icon
              name="md-chevron-forward-sharp"
              size={22}
              color={COLORS['font-color-light']}
              style={styles.forwardIcon}
            />
          </TouchableOpacity>
        </View>
      </React.Fragment>
    );
  }
}
