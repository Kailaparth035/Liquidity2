import React, {FC, useEffect, useMemo, useState} from 'react';
import {View, Dimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';
import WebView from 'react-native-webview';

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

export const CandleChart: FC<Props> = ({height = 280, chartData, symbol}) => {
  const onMessage = (data: any) => {
    alert(data.nativeEvent.data);
  };

  const chartHeight = height;

  const [isLoaded, setIsLoaded] = useState(false);
  const {colors} = useTheme();

  useEffect(() => {
    if (chartData && !isLoaded) {
      setIsLoaded(true);
    }
  }, [chartData]);

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
        <script src="https://code.highcharts.com/stock/highstock.js"></script>
        <script src="https://code.highcharts.com/stock/modules/data.js"></script>
        <script src="https://code.highcharts.com/stock/modules/exporting.js"></script>
        <script src="https://code.highcharts.com/stock/modules/hollowcandlestick.js"></script>
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
            height: 280px;
          }
        </style>
      </head>
      <body>
        <div id="container"></div>
      </body>

    <script>
        const data = ${JSON.stringify(chartData)}
        Highcharts.stockChart('container', {
          plotOptions: {
            candlestick: {
                color: '#F55353',
                lineColor:  '#F55353',
                upLineColor: '#33B87A',
                upColor: '#33B87A',
            }
        },
          credits: {
            enabled: false,
          },
            rangeSelector: {
                enabled: false
            },
            navigator: {
                series: {
                    color: '#666',
                    fillOpacity: 0.12,
                    lineColor: '#666'
                },
                maskFill: 'rgba(255, 255, 255, 0.06)',
                outlineColor: '#282A2E',
                outlineWidth: 1,
                handles:{
                    backgroundColor: '#ADB0B8',
                    borderColor: '#999999',
                    enabled:true,
                    height: 32,
                    lineWidth: 0,
                    width: 8,
                    },
                    xAxis: {
                      labels:{enabled: false,style:{color:"red"}},
                      gridLineColor: '#36383D',
                      gridLineWidth: 0.8,
                      tickPixelInterval: 100,
                  }
            },
            series: [{
                type: 'candlestick',
                name: '${symbol}',
                data: data,
            }],
            chart: {
                backgroundColor: ${JSON.stringify(colors.background)},
            },
            scrollbar: {
                enabled: false
            },
            xAxis:[{lineWidth: 1, lineColor: '#36383D', tickWidth:1, tickColor: '#36383D'}],
            yAxis:[{gridLineColor: '#36383D', gridLineWidth: 1 }],
            exporting: {
                enabled: false
              },
              tooltip: {
                changeDecimals: 4,
              },
        });

      </script>
    </html>
    `,
    [isLoaded, chartData, symbol],
  );

  return chartData ? (
    <View style={{flex: 1, height: chartHeight}}>
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
