import * as React from 'react';
import {
  View,
  SectionList as RNSectionList,
  SectionListProps,
  ViewStyle,
  RegisteredStyle,
  SectionListData,
} from 'react-native';

import TabBar from './tab-bar';

interface IProps extends SectionListProps<any> {
  scrollToLocationOffset?: number;
  tabBarStyle?: ViewStyle | RegisteredStyle<ViewStyle>;
  renderTab: (section: SectionListData<any>) => React.ReactNode;
  index: any;
  sections: any[];
  colors: any;
}

interface IState {
  currentIndex: number;
}

export default class ScrollSpy extends React.PureComponent<IProps, IState> {
  state: IState = {
    currentIndex: 0,
  };

  private blockUpdateIndex: boolean = false;
  private sectionList: React.RefObject<RNSectionList<any>> = React.createRef();
  componentDidMount() {
    this.setState({currentIndex: this.props.index});
}
  render() {
    const {sections, renderTab, tabBarStyle, scrollToLocationOffset, colors,index,scrollOnClick} =
      this.props; 
    const prepareSections = sections.map((item, index) => ({...item, index}));

    return (
      <View style={{flex: 1}}>
        <TabBar
          sections={prepareSections}
          renderTab={renderTab}
          colors={colors}
          tabBarStyle={tabBarStyle}
          currentIndex={index}
          scrollOnClick={scrollOnClick}
          onPress={(index: number) => {
            this.setState({currentIndex: index});
            this.blockUpdateIndex = true;

            const sectionList = this.sectionList.current;
            if (sectionList && sectionList.scrollToLocation) {
              sectionList.scrollToLocation({
                animated: true,
                itemIndex: 0,
                viewOffset: scrollToLocationOffset || 0,
                sectionIndex: index,
              });
            }
          }}
        />
      </View>
    );
  }
}
