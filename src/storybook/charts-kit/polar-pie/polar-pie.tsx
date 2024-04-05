import React, {FC, useMemo} from 'react';
import {View, Dimensions} from 'react-native';
import {useRecoilState} from 'recoil';
import WebView from 'react-native-webview';
import {useTheme} from '@react-navigation/native';
import {isDarkModeState} from '../../../states';

interface Props {
  height?: number;
  width?: number;
  screen?: any;
  data: {
    name: string;
    y: number;
    z: number;
  }[];
  colors: string[][];
}

const {width: chartWidth} = Dimensions.get('window');
export const PolarPieChart: FC<Props> = ({
  height = 400,
  data: chartData,
  screen,
  colors: chartColors,
}) => {
  const [isdarkApp] = useRecoilState(isDarkModeState);
  const {colors} = useTheme();

  const onMessage = (data: any) => {
    alert(data.nativeEvent.data);
  };
  const data = chartData;
  const newData = data.map(item => {
    if (item.name === 'Privates') {
      item.name = 'Pre-IPO';
      return item;
    }
    return item;
  });

  const html = useMemo(
    () => `
      <!DOCTYPE html>
      <html>
        <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <script src="https://code.highcharts.com/highcharts.js"></script>
        <script src="https://code.highcharts.com/modules/variable-pie.js"></script>
        <script src="https://code.highcharts.com/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/modules/export-data.js"></script>
        <script src="https://code.highcharts.com/modules/accessibility.js"></script>
        <style>
        
          * {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
            box-sizing: border-box;
          }
          #container {
            width: 100%;   
            margin-top:${screen === 'music' ? '-50px' : '0px'};
          } 
          .prevent-select {
            -webkit-user-select: none; /* Safari */
            -ms-user-select: none; /* IE 10 and IE 11 */
            user-select: none; /* Standard syntax */
          }
          }
        </style>
      </head>
      <body>
        <div id="container" class="prevent-select"> </div>
      </body>
    <script>
        const data =  ${JSON.stringify(data)}
        Highcharts.chart('container', {
          chart: {
            type: 'variablepie',
           backgroundColor:${JSON.stringify(colors.background)},
          },   
          title: {
            text: null,
          },       
          subtitle: {
            text:null       
          },
          credits: {
            enabled: false,
          },
       
          tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">\u25CF</span><span style="color:${
              isdarkApp ? '#FFFFFF' : 'F0000'
            }"><b> {point.name}</b></span><br/>' +
                '<span style="color:${
                  isdarkApp ? '#FFFFFF' : 'F0000'
                }">Current:  </span> <span style="color:${
      isdarkApp ? '#FFFFFF' : 'F0000'
    }"><b>{point.currentPrice}</b></span><br/>' +
                '<span style="color:${
                  isdarkApp ? '#FFFFFF' : 'F0000'
                }">P&L:  </span> <span style="color:${
      isdarkApp ? '#FFFFFF' : 'F0000'
    }"><b> {point.gainLoss}</b></span> <span style="color:{point.lgColor}"> ({point.changePercentage}%)</span>',
            backgroundColor: "${colors.background}",
        },
          exporting: false,
          plotOptions: {
            variablepie: {
              animation: false,
              colors: 
                screen === 'music'
                  ? ['#2AB87E', '#F55353', '#FFFF','#2AB87E']
              : ${JSON.stringify(chartColors)}, 
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false,
              },
              showInLegend: false,
            },
          },
          series: [
            {
              minPointSize: ${screen === 'music' ? '30' : '10'} ,
              innerSize: "30%"   ,
              zMin: ${screen === 'music' ? 10 : 0},
              name: 'countries',
              borderWidth: 1,
              borderColor: null,
              slicedOffset: 0,
              data,
            },
            
          ],
        });
      </script>
    </html>
    `,
    [colors, screen, chartData, isdarkApp],
  );

  return data ? (
    <View
      style={{
        flex: 1,
        height: height,
        alignSelf: 'center',
      }}>
      <WebView
        style={{
          backgroundColor: 'transparent',
          width: chartWidth,
          opacity: 0.99,
        }}
        scrollEnabled={false}
        onMessage={onMessage}
        source={{html}}
      />
    </View>
  ) : null;
};
