import React, {useMemo} from 'react';
import {View, Dimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';
import WebView from 'react-native-webview';
import {useRecoilValue} from 'recoil';
import {windowWidth} from 'views/asset-details/hooks/window';

import {NewsStateData} from '../../../../../../states/news/states';

import {mainStyle as styles} from '../main-style';

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

export const TechnicalCharts = () => {
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
       <script src="https://code.highcharts.com/modules/series-label.js"></script>
       <script src="https://code.highcharts.com/modules/accessibility.js"></script>
       <script src="https://code.highcharts.com/highcharts-more.js"></script>
     
       <style>
         .karus-container {
           width:${chartWidth}px,
           background: #1b1c1f;
           padding: 0px 8px;
           display: flex;
           flex-direction: column;
           gap: 28px;
         }
         .header {
           display: flex;
           justify-content: space-between;
         }
         .header-title {
           font-weight: 600;
           font-size: 14px;
           color: #ffffff;
         }
         .filter-drop {
           width: 100%;
           display: flex;
           flex-direction: column;
           gap: 16px;
         }
         .filter-drop-chart {
           display: flex;
           flex-direction: column;
           gap: 4px;
           width: 100%;
         }
         .filter-drop-header {
           font-weight: 500;
           font-size: 12px;
           color: #878c99;
         }
         .filter-drop-content {
           display: flex;
           flex-direction: row;
           align-items: center;
           padding: 12px 16px;
           /* width: 100%; */
           background: rgba(255, 255, 255, 0.03);
           border: 1px solid #36383d;
           border-radius: 4px;
           font-weight: 500;
           font-size: 14px;
           color: #ffffff;
         }
         .filter-drop-chart-date {
           display: flex;
           flex-direction: row;
           gap: 16px;
           width: 100%;
         }
         .filter-drop-content > option {
           background-color: black;
         }
       </style>
       <div class="karus-container">
         <div id="container1"></div>
         <div id="container2"></div>
         <div id="container3"></div>
         <div id="container4"></div>
         <div id="container5"></div>
       </div>
     </body>
     <script>
       Highcharts.chart("container1", {
         chart: {
           type: "line",
           backgroundColor:${JSON.stringify(colors.background)},
           scrollablePlotArea: {
          
             scrollPositionX: 0,
             opacity: 1,
           },
         },
   
         credits: {
           enabled: false,
         },
   
         colors: ${JSON.stringify(line?.colors)},
   
         title: {
           text: ${JSON.stringify(line?.title)},
           align: "left",
           style: {
             color: ${JSON.stringify(colors.text)},
             fontWeight: "600",
             fontSize: "14px",
           },
         },
   
         subtitle: {
           text: ${JSON.stringify(line?.sub_title)},
           align: "left",
           style: {
             color: ${JSON.stringify(colors.text)},
             fontWeight: "500",
             fontSize: "12px",
           },
         },
   
         yAxis: {
           title: {
             text: null,
           },
           gridLineWidth: 0.2,
           labels: {
             format: "{value}%",
             style: {
              color: ${JSON.stringify(colors.text)}, 
            },
           },
         },
   
         xAxis: {
           type: "datetime",
           labels: {
             overflow: "justify",
             style: {
              color: ${JSON.stringify(colors.text)}, 
            },
           },
           gridLineWidth: 0.2,
         },
   
         legend: {
           title: {
             text: ${JSON.stringify(line?.legend_text)},
             style: {
               color: ${JSON.stringify(colors.text)},
               fontWeight: "500",
               fontSize: "12px",
             },
           },
           itemStyle: {
             color: ${JSON.stringify(colors.text)},
             fontWeight: "500",
             fontSize: "12px",
           },
           itemHoverStyle: {
             color:${JSON.stringify(colors.text)},
           },
           // itemDistance: 13,
           // symbolHeight: 4,
           // symbolPadding: 4,
           // symbolWidth: 16,
         },
         navigation: {
           menuStyle: {
             border: "0px",
           },
           buttonOptions: {
             theme: {
               "stroke-width": 1,
               r: 5,
               fill: "transparent",
               states: {
                 hover: {
                   fill: "rgb(167 172 160)",
                 },
               },
             },
           },
         },
   
         plotOptions: {
           series: {
             pointStart: Date.UTC(2018),
             pointIntervalUnit: "year",
             marker: {
               enabled: false,
               states: {
                 hover: {
                   enabled: false,
                 },
               },
             },
             label: {
               enabled: false,
             },
           },
         },
   
         series: ${JSON.stringify(line.series)},
       });
   
       Highcharts.chart("container2", {
         chart: {
           type: "line",
           backgroundColor: ${JSON.stringify(colors.background)},
           scrollablePlotArea: {
          
             scrollPositionX: 0,
             opacity: 1,
           },
         },
   
         credits: {
           enabled: false,
         },
   
         colors: ${JSON.stringify(line2.colors)},
   
         title: {
           text: ${JSON.stringify(line2.title)} ,
           align: "left",
           style: {
             color: ${JSON.stringify(colors.text)},
             fontWeight: "600",
             fontSize: "14px",
           },
         },
   
         subtitle: {
           text: ${JSON.stringify(line2.sub_title)},
           align: "left",
           style: {
             color: ${JSON.stringify(colors.text)},
             fontWeight: "500",
             fontSize: "12px",
           },
         },
   
         yAxis: {
           title: {
             text: null,
           },
           
           gridLineWidth: 0.2,
         },
   
         xAxis: {
           title: {
             text: null,
           },
           gridLineWidth: 0.2,
           categories: [
             "M3",
             "M5",
             "M6",
             "128i",
             "135i",
             "320i",
             "325i",
             "320i",
             "325i",
             "328i",
             "330i",
             "335i",
             "428i",
             "525i",
             "530i",
             "535i",
             "550i",
             "645i",
             "650i",
             "740i",
             "745i",
             "750i",
             "X1 Series",
             "X3 Series",
             "X4 Series",
             "X5 Series",
             "Z4 Series",
           ],
         },
   
         legend: {
           title: {
            text: ${JSON.stringify(line2?.legend_text)},
             style: {
               color: ${JSON.stringify(colors.text)},
               fontWeight: "500",
               fontSize: "12px",
             },
           },
           itemStyle: {
             color: ${JSON.stringify(colors.text)},
             fontWeight: "500",
             fontSize: "12px",
           },
           itemHoverStyle: {
             color: ${JSON.stringify(colors.text)},
           },
           align: "left",
         },
   
         navigation: {
           menuStyle: {
             border: "0px",
           },
           buttonOptions: {
             theme: {
               "stroke-width": 1,
               r: 5,
               fill: "transparent",
               states: {
                 hover: {
                   fill: "rgb(167 172 160)",
                 },
               },
             },
           },
         },
   
         plotOptions: {
           series: {
             marker: {
               enabled: false,
               states: {
                 hover: {
                   enabled: false,
                 },
               },
             },
             label: {
               enabled: false,
             },
           },
         },
   
         series:${JSON.stringify(line?.series)},
       });
   
       Highcharts.chart("container3", {
         chart: {
           type: "gauge",
           plotBackgroundColor: null,
           plotBackgroundImage: null,
           plotBorderWidth: 0,
           plotShadow: false,
           backgroundColor: ${JSON.stringify(colors.background)},
           scrollablePlotArea: {
             scrollPositionX: 0,
             opacity: 1,
           },
         },
   
         credits: {
           enabled: false,
         },
   
         title: {
           text: ${JSON.stringify(gauge?.title)},
           align: "left",
           style: {
             color: "#FFFFFF",
             fontWeight: "600",
             fontSize: "14px",
           },
         },
   
         subtitle: {
           text:  ${JSON.stringify(gauge?.sub_title)},
           align: "left",
           style: {
             color: "#878C99",
             fontWeight: "500",
             fontSize: "12px",
           },
         },
         navigation: {
           menuStyle: {
             border: "0px",
           },
           buttonOptions: {
             theme: {
               "stroke-width": 1,
               r: 5,
               fill: "transparent",
               states: {
                 hover: {
                   fill: "rgb(167 172 160)",
                 },
               },
             },
           },
         },
         pane: {
           startAngle: -90,
           endAngle: 89.9,
           background: null,
           center: ["50%", "75%"],
           size: "100%",
         },
   
         // the value axis
         yAxis: {
          min: ${JSON.stringify(gauge.min)},
          max: ${JSON.stringify(gauge.max)},
           tickPixelInterval: 72,
           tickPosition: "outside",
           tickLength: 20,
           tickWidth: 0,
           minorTickInterval: null,
   
           tickPositions: [0, 100],
           labels: {
             distance: -10,
             y: 20,
             align: "center",
             format: "{value}%",
             style: {
               fontSize: "12px",
               color: " #878C99",
             },
           },
   
           plotBands: [
             {
               from: 0,
               to: 50,
               thickness: 20,
               color: {
                 linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                 stops: [
                   [0, "#FC0404"], //green
                   [1, "#FFD964"], //yellow
                 ],
               },
             },
             {
               from: 50,
               to: 100,
               thickness: 20,
               color: {
                 linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                 stops: [
                   [0, "#FFD964"], //yellow
                   [1, "#1ADB67"], //green
                 ],
               },
             },
           ],
         },
   
         plotOptions: {
           series: {
             tooltip: {
               valueSuffix: " %",
             },
             dataLabels: {
               format: "{y} %",
               borderWidth: 0,
               style: {
                 fontSize: "24px",
               },
             },
             dial: {
               radius: "80%",
               backgroundColor: "#BCC3D6",
               baseWidth: 12,
               baseLength: "0%",
               rearLength: "0%",
             },
             pivot: {
               backgroundColor: "#BCC3D6",
               radius: 6,
             },
           },
         },
   
         series: [
           {
            name: ${JSON.stringify(gauge?.series?.name)},
            data: ${JSON.stringify(gauge.series.data)},
           },
         ],
       });
   
       Highcharts.chart("container4", {
         chart: {
           backgroundColor: ${JSON.stringify(colors.background)},
           scrollablePlotArea: {
          
             scrollPositionX: 0,
             opacity: 1,
           },
         },
   
         credits: {
           enabled: false,
         },
   
         colors: ${JSON.stringify(chart4.colors)},
         title: {
           text: ${JSON.stringify(chart4.title)},
           align: "left",
           style: {
             color: "#FFFFFF",
             fontWeight: "600",
             fontSize: "14px",
           },
         },
   
         subtitle: {
           text:${JSON.stringify(chart4.sub_title)},
           align: "left",
           style: {
             color: "#878C99",
             fontWeight: "500",
             fontSize: "12px",
           },
         },
         xAxis: {
           type: "datetime",
           gridLineWidth: 0.25,
           title: {
             text: "Date",
             style: {
               color: "#BCC3D6",
               fontWeight: "500",
               fontSize: "12px",
             },
           },
         },
   
         yAxis: [
           {
             // Primary yAxis
             labels: {
               format: "{value}",
               style: {
                 color: "#878C99",
                 fontWeight: "500",
                 fontSize: "10px",
               },
             },
             gridLineWidth: 0.25,
   
             title: {
               text: ${JSON.stringify(chart4.yAxis.primary_title)} ,
               style: {
                 color: "#BCC3D6",
                 fontWeight: "500",
                 fontSize: "12px",
               },
             },
           },
           {
             // Secondary yAxis
             title: {
               text: ${JSON.stringify(chart4.yAxis.secondary_title)} ,
               style: {
                 color: "#BCC3D6",
                 fontWeight: "500",
                 fontSize: "12px",
               },
             },
             gridLineWidth: 0,
             labels: {
               format: "{value}M",
               style: {
                 color: "#878C99",
                 fontWeight: "500",
                 fontSize: "10px",
               },
             },
             opposite: true,
           },
         ],
         tooltip: {
           shared: true,
         },
         legend: {
           enabled: true,
           itemStyle: {
             color: "#BCC3D6",
             fontWeight: "500",
             fontSize: "12px",
           },
           itemHoverStyle: {
             color: "#FFF",
           },
           // itemDistance: 13,
           // symbolPadding: 4,
           // symbolWidth: 160,
           symbolHeight: 10,
           symbolRadius: 0,
         },
   
         navigation: {
           menuStyle: {
             border: "0px",
           },
           buttonOptions: {
             theme: {
               "stroke-width": 1,
               r: 5,
               fill: "transparent",
               states: {
                 hover: {
                   fill: "rgb(167 172 160)",
                 },
               },
             },
           },
         },
   
         plotOptions: {
           series: {
             pointStart: Date.UTC(2018),
             pointIntervalUnit: "year",
             tooltip: {
               valueSuffix: "$",
             },
             marker: {
               enabled: false,
               states: {
                 hover: {
                   enabled: false,
                 },
               },
             },
             label: {
               enabled: false,
             },
           },
           column: {
             zoneAxis: "x",
             zones: [
               {
                 value: Date.UTC(new Date().getFullYear()),
                 color: "#458BF5",
               },
               {
                 color: "#F5AF45",
               },
             ],
             showInLegend: false,
             borderWidth: 0,
             groupPadding: 0.05,
             pointPadding: 0,
           },
         },
   
         series: ${JSON.stringify(chart4.series)},
       });
   
       Highcharts.chart("container5", {
         chart: {
           type: "spline",
           backgroundColor: ${JSON.stringify(colors.background)},
           scrollablePlotArea: {
          
             scrollPositionX: 0,
             opacity: 1,
           },
         },
   
         credits: {
           enabled: false,
         },
   
         colors: ${JSON.stringify(chart5.colors)},
   
         title: {
           text: ${JSON.stringify(chart5.title)},
           align: "left",
           style: {
             color: "#FFFFFF",
             fontWeight: "600",
             fontSize: "14px",
           },
         },
   
         subtitle: {
           text: ${JSON.stringify(chart5.sub_title)},
           align: "left",
           style: {
             color: "#878C99",
             fontWeight: "500",
             fontSize: "12px",
           },
         },
   
         xAxis: {
           type: "datetime",
           gridLineWidth: 0.25,
           title: {
             text: "Date",
             style: {
               color: "#BCC3D6",
               fontWeight: "500",
               fontSize: "12px",
             },
           },
         },
   
         yAxis: [
           {
             // Primary yAxis
             labels: {
               format: "{value}%",
               style: {
                 color: "#878C99",
                 fontWeight: "500",
                 fontSize: "10px",
               },
             },
             gridLineWidth: 0.15,
             title: {
               text: "Net Loss",
               style: {
                 color: "#BCC3D6",
                 fontWeight: "500",
                 fontSize: "12px",
               },
             },
             opposite: true,
           },
           {
             // Secondary yAxis
             gridLineWidth: 0.1,
             title: {
               text: "Gross Charge off",
               style: {
                 color: "#BCC3D6",
                 fontWeight: "500",
                 fontSize: "12px",
               },
             },
             labels: {
               format: "{value}%",
               style: {
                 color: "#878C99",
                 fontWeight: "500",
                 fontSize: "10px",
               },
             },
           },
         ],
         tooltip: {
           shared: true,
         },
         legend: {
           enabled: true,
           itemStyle: {
             color: "#BCC3D6",
             fontWeight: "500",
             fontSize: "12px",
           },
           itemHoverStyle: {
             color: "#FFF",
           },
         },
   
         navigation: {
           menuStyle: {
             border: "0px",
           },
           buttonOptions: {
             theme: {
               "stroke-width": 1,
               r: 5,
               fill: "transparent",
               states: {
                 hover: {
                   fill: "rgb(167 172 160)",
                 },
               },
             },
           },
         },
   
         plotOptions: {
           series: {
             pointStart: Date.UTC(2018),
             pointIntervalUnit: "year",
             tooltip: { valueSuffix: " %" },
             marker: {
               enabled: false,
               states: {
                 hover: {
                   enabled: false,
                 },
               },
             },
             label: {
               enabled: false,
             },
           },
         },
         series: ${JSON.stringify(chart5.series)},
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
