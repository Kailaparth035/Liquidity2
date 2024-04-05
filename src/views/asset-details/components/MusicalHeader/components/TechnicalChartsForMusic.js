import React, {useMemo} from 'react';
import {View, Dimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';
import WebView from 'react-native-webview';
import {useRecoilValue} from 'recoil';
import {windowWidth} from 'views/asset-details/hooks/window';

import {NewsStateData} from '../../../../../../src/states/news/states';

import {mainStyle as styles} from '../../../components/tab-body/component/';

const {width: chartWidth} = Dimensions.get('window');

interface Props {
  /**
   * Height of chart -- default: 220.
   */
  height?: number;
  /**
   * Width of chart -- default: Dimensions.get("window").width.
   */
  width?: number;
  chartData: number[][];
  symbol: string;
}

export const TechnicalChartsMusic = () => {
  const onMessage = (data: any) => {
    alert(data.nativeEvent.data);
  };
  const {colors} = useTheme();
  const newsInfo = useRecoilValue(NewsStateData);

  const {line, line2, gauge, chart4, chart5} = useMemo(
    () => newsInfo?.technical_chart ?? {},
    [],
  );
  
  const html = useMemo(
    () =>
      `
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
     </head>
     <body>
       <script src="https://code.highcharts.com/highcharts.js"></script>
    
         
     
       <style>
         
        .highcharts-data-table table {
          min-width: 310px;
          max-width: 800px;
          margin: 1em auto;
        }

        #container {
          height: 400px;
          padding:20px;
          
        }

       
       </style>
            
       <div id="container"></div>
       
     </body>
     <script>


     Highcharts.chart('container', {
        chart: {
          type: 'column',
          backgroundColor: ${JSON.stringify(colors.background)},
        },
        title: {
          text: null,
        },
        subtitle: {
          text:null            
        },
        xAxis: {
          categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'],
          crosshair: true,  
          accessibility: {
            description: 'Countries'
          }
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Amount Paid Per Share(USD) '
          }
        },
        tooltip: {
          valueSuffix: '(0.5 MT)'
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0            
          }
        },
        series: [
          {
            name: '2021',
            data: [50, 600, 200, 800, 699, 454,213]
          },
          {
            name: '2022',
            data: [100, 565, 899, 123, 361, 545,232]
          }
        ]
      });
   </script>
   </html>
   `,
    [],
  );

  return (
    <View style={[styles.chartWrapper, {backgroundColor: colors.background}]}>
      <WebView
        style={{backgroundColor: 'transparent', width: '100%', opacity: 0.99}}
        scrollEnabled={false}
        onMessage={onMessage}
        source={{html}}
      />
    </View>
  );
};
