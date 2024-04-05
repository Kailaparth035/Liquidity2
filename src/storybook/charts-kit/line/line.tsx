import React, {FC} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import WebView from 'react-native-webview';
import {useCurrency} from '../../../hooks/use-currency';
import {formatNumber} from '../../../views/utils';
export const {width: chartWidth} = Dimensions.get('window');

interface IDataset {
  data: number[];
}

interface Props {
  /**
   * Height of chart -- default: 220.
   */
  height?: number;
  /**
   * Width of chart -- default: Dimensions.get("window").width.
   */
  width?: number;
  datasets: {
    labels: number[];
    values: number[];
    volumes: number[];
    dateTimes: number[];
  };
  intervalPrice: number;
  color: string;
  symbol: string;
}

function trimVolume(num: number) {
  let stringNum = num.toString();
  let preVal = stringNum.slice(0, 2);
  let postVal = stringNum.slice(2, stringNum.length);
  return parseFloat(preVal.concat('.', postVal));
}

export const LineChart: FC<Props> = ({
  height = 240,
  datasets,
  intervalPrice = 0,
  color,
  symbol,
}) => {
  const {currencySymbol} = useCurrency();
  const onMessage = (data: any) => {
    alert(data.nativeEvent.data);
  };

  let {values: numbers, labels: dates, volumes: volume, dateTimes} = datasets;
  const intervalOpenPrice = intervalPrice ?? numbers[0];
  const chartHeight = height;

  const formattedNumbers = numbers.map(num => formatNumber(num, 4));
  const formattedVols = volume.map(vol => formatNumber(vol));

  volume = volume.map(vol => trimVolume(vol));
  const html = `
      <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8" />
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
              <style>
                * {
                  margin: 0;
                  padding: 0;
                  font-family: sans-serif;
                  box-sizing: border-box;
                }
                .chartCard {
                  width: 100%;
                  height: 950px !important;
                }
                #myChart2 {
                  height: 50px !important;
                }
              </style>
            </head>
            <body>
              <div class="chartCard">
                <canvas style="width: 100%; height: ${chartHeight}px" id="myChart"></canvas>
                <!-- <canvas id="myChart2"></canvas> -->
              </div>
              <script
                type="text/javascript"
                src="https://cdn.jsdelivr.net/npm/chart.js"
              ></script>
          
              <script src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"></script>
          
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
                integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=="
                crossorigin="anonymous"
                referrerpolicy="no-referrer"
              />
          
              <script>
                Chart.defaults.font.family =
                  "'FontAwesome', 'Helvetica', 'Helvetica Neue', 'Arial', sans-serif";
          
                const bgColor = "#464C5C"
                const dates = ${JSON.stringify(dates)};
                // const dates = []
                const numbers = ${JSON.stringify(numbers)};
                const volume = ${JSON.stringify(volume)};
                const dateTimes = ${JSON.stringify(dateTimes)}
                const formattedNumbers = ${JSON.stringify(formattedNumbers)}
                const formattedVols = ${JSON.stringify(formattedVols)}
          
                // for (let i = 0; i < numbers.length; i++) {
                //   const date = new Date();
                //   date.setDate(date.getDate() + i);
                //   dates.push(date.setHours(0, 0, 0, 0));
                // }
          
                // console.log(dates)
                // console.log(numbers)
          
                // setup
                const data = {
                  labels: dates,
                  datasets: [
                    {
                      label: '${symbol}',
                      // label: "Weekly Sales icon",
                      data: numbers,
          
                      fill: {
                        target: {
                          value: ${intervalOpenPrice},
                        },
                        below: (context) => {
                          //console.log(context)
                          const chart = context.chart;
                          const { ctx, chartArea, data, scales } = chart;
                          if (!chartArea) {
                            return null;
                          }
                          return belowGradient(ctx, chartArea, data, scales);
                        },
                        above: (context) => {
                          //console.log(context)
                          const chart = context.chart;
                          const { ctx, chartArea, data, scales } = chart;
                          if (!chartArea) {
                            return null;
                          }
                          return aboveGradient(ctx, chartArea, data, scales);
                        },
                      },
                      borderColor: (context) => {
                        // console.log(context)
                        const chart = context.chart;
                        const { ctx, chartArea, data, scales } = chart;
                        if (!chartArea) {
                          return null;
                        }
                        return getGradient(ctx, chartArea, data, scales);
                      },
                      tension: 0,
                      pointRadius: 0,
                      pointHitRadius: 0,
                      pointHoverRadius: 0,
                      borderWidth: 2,
                    },
                    {
                      label: "Stock Volume",
                      type: "bar",
                      data: volume,
                      backgroundColor: "#51545C",
                      pointHitRadius: 0,
                      pointHoverRadius: 0,
                      yAxisID: "volume",
                    },
                  ],
                };
          
                // dottedLine plugin block
                const dottedLine = {
                  id: "dottedLine",
                  beforeDatasetsDraw(chart, args, pluginOptions) {
                    const {
                      ctx,
                      data,
                      chartArea: { left, right, width },
                      scales: { x, y },
                    } = chart;
          
                    const startingPoint = data.datasets[0].data[0];
          
                    ctx.save();
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.setLineDash([1, 5]);
                    ctx.strokeStyle = bgColor;
                    ctx.moveTo(left, y.getPixelForValue(startingPoint));
                    ctx.lineTo(right, y.getPixelForValue(startingPoint));
                    ctx.stroke();
                    ctx.closePath();
                    ctx.setLineDash([]);
          
                    ctx.beginPath();
                    ctx.fillStyle = bgColor;
                    ctx.fillRect(0, y.getPixelForValue(startingPoint) - 10, left, 20);
                    ctx.closePath();
          
                    ctx.font = "12px sans-serif";
                    ctx.fillStyle = "white";
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";
                    ctx.fillText(
                      startingPoint.toFixed(2),
                      left / 2,
                      y.getPixelForValue(startingPoint)
                    );
                  },
                };
          
              // customTooltip plugin block
              const customTooltip = {
                id: "customTooltip",
                afterDraw(chart, args, pluginOptions) {
                  const {
                    ctx,
                    chartArea: { top, bottom, left, right, width, height },
                    scales: { x, y },
                  } = chart;
                  ctx.save();

                  chart.canvas.addEventListener("mousemove", (e) => {
                    tooltipPosition(e);
                  });

                  function tooltipPosition(mousemove) {
                    let xTooltip;
                    let yTooltip;
                    const rightSide = right - mousemove.offsetX;
                    if (rightSide <= 170) {
                      xTooltip = mousemove.offsetX - 170;
                    } else {
                      xTooltip = mousemove.offsetX + 20;
                    }

                    if (mousemove.offsetY <= 100) {
                      yTooltip = mousemove.offsetY + 30;
                    } else {
                      yTooltip = mousemove.offsetY - 80;
                    }

                    let xleft = left;
                    let xright = right;

                    if (
                      mousemove.offsetX >= xleft &&
                      mousemove.offsetX <= xright &&
                      mousemove.offsetY >= top &&
                      mousemove.offsetY <= bottom
                    ) {
                      ctx.beginPath();
                      ctx.fillStyle = bgColor;
                      ctx.strokeStyle = bgColor;
                      ctx.lineJoin = "round";
                      ctx.lineWidth = 9;
                      ctx.fillRect(xTooltip, yTooltip, 150, 60);
                      ctx.strokeRect(xTooltip, yTooltip, 150, 60);
                      ctx.closePath();
                      ctx.restore();

                      const dateCursor = x.getValueForPixel(mousemove.offsetX)
                      
                      const dateIndex = dateCursor

                      const {date, time} = dateTimes[dateCursor]

                      // text date
                      ctx.textAlign = "left";
                      ctx.textBaseline = "middle";
                      ctx.fillStyle = "white";
                      ctx.font = "bolder 12px sans-serif";
                      ctx.fillText(
                        date,
                        xTooltip + 5,
                        yTooltip + 10
                      );
                      ctx.restore();

                      // text time
                      ctx.textAlign = "right";
                      ctx.textBaseline = "middle";
                      ctx.fillStyle = "lightgrey";
                      ctx.font = "bolder 10px sans-serif";
                      ctx.fillText(
                        time,
                        xTooltip + 150 - 5,
                        yTooltip + 10
                      );
                      ctx.restore();

                      // Line 2 Color DOT
                      let dotColor;
                      if (numbers[dateIndex] >= ${intervalOpenPrice}) {
                        dotColor = "rgba(75, 192, 192, 1)";
                      } else {
                        dotColor = "rgba(255, 26, 104, 1)";
                      }

                      const dotSpace = 15;
                      ctx.textAlign = "left";
                      ctx.textBaseline = "middle";
                      ctx.fillStyle = dotColor;
                      ctx.font = "bolder 12px FontAwesome";
                      ctx.fillText("\uf111", xTooltip + 5, yTooltip + 30);
                      ctx.restore();

                      // Line 2 Text Price
                      const priceText = "Price: ";
                      const priceTextWidth = ctx.measureText(priceText).width;
                      ctx.textAlign = "left";
                      ctx.textBaseline = "middle";
                      ctx.fillStyle = "lightgrey";
                      ctx.font = "12px sans-serif";
                      ctx.fillText(priceText, xTooltip + 5 + dotSpace, yTooltip + 30);
                      ctx.restore();

                      const price = formattedNumbers[dateIndex]
                      // Line 2 Price value
                      ctx.textAlign = "left";
                      ctx.textBaseline = "middle";
                      ctx.fillStyle = "white";
                      ctx.font = "bolder 12px sans-serif";
                      ctx.fillText(
                        "${currencySymbol}" + price,
                        xTooltip + 5 + dotSpace + priceTextWidth,
                        yTooltip + 30
                      );
                      ctx.restore();

                      // Line 3 Icon
                      const iconSpace = 15;
                      ctx.textAlign = "left";
                      ctx.textBaseline = "middle";
                      ctx.fillStyle = "white";
                      ctx.font = "bolder 12px FontAwesome";
                      ctx.fillText("\uf080", xTooltip + 5, yTooltip + 50);
                      ctx.restore();

                      // Line 3 Text Value
                      const valueText = "Value: ";
                      const valueTextWidth = ctx.measureText(valueText).width;
                      ctx.textAlign = "left";
                      ctx.textBaseline = "middle";
                      ctx.fillStyle = "lightgrey";
                      ctx.font = "12px sans-serif";
                      ctx.fillText(valueText, xTooltip + 5 + iconSpace, yTooltip + 50);
                      ctx.restore();

                      const vol = formattedVols[dateIndex]

                      // Line 3 Value value
                      ctx.textAlign = "left";
                      ctx.textBaseline = "middle";
                      ctx.fillStyle = "white";
                      ctx.font = "bolder 12px sans-serif";
                      ctx.fillText(
                        vol,
                        xTooltip + 5 + iconSpace + valueTextWidth,
                        yTooltip + 50
                      );
                      ctx.restore();
                    }
                  }
                },
              };
          
                // config
                const config = {
                  type: "line",
                  data,
                  options: {
                    layout: {
                      padding: {
                        left: 10,
                        right: 5,
                      },
                    },
                    scales: {
                      x: {
                        ticks: {
                          maxTicksLimit: 5,
                          maxRotation: 0,
                          minRotation: 0,
                        },
                        grid: {
                          drawOnChartArea: false,
                          drawTicks: true,
                          drawBorder: false,
                          offset: false,
                        },
                      },
                      y: {
                        // beginAtZero: true,
                      },
                      volume: {
                        type: "linear",
                        position: "right",
                        min: 0,
                        max: 1000,
                        grid: {
                          display: false,
                        },
                        ticks: {
                          display: false,
                        },
                      },
                    },
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        enabled: true,
                      }
                    },
                  },
                  plugins: [dottedLine, customTooltip],
                };
          
                // render init block
                const myChart = new Chart(document.getElementById("myChart"), config);
          
                function getGradient(ctx, chartArea, data, scales) {
                  const { left, right, top, bottom, width, height } = chartArea;
                  const { x, y } = scales;
                  const gradientBorder = ctx.createLinearGradient(0, 0, 0, bottom);
                  let shift = y.getPixelForValue(data.datasets[0].data[0]) / bottom;
          
                  if (shift > 1) {
                    shift = 1;
                  }
          
                  if (shift < 0) {
                    shift = 0;
                  }
          
                  gradientBorder.addColorStop(0, "hsla(156, 72%, 42%, 1)"); // profit border
                  gradientBorder.addColorStop(shift, "hsla(156, 72%, 42%, 1)");
                  gradientBorder.addColorStop(shift, "hsla(0, 90%, 61%, 1)"); // loss border
                  gradientBorder.addColorStop(1, "hsla(0, 90%, 61%, 1)");
                  return gradientBorder;
                }
          
                function belowGradient(ctx, chartArea, data, scales) {
                  const { left, right, top, bottom, width, height } = chartArea;
                  const { x, y } = scales;
                  const gradientBackground = ctx.createLinearGradient(
                    0,
                    y.getPixelForValue(data.datasets[0].data[0]),
                    0,
                    bottom
                  );
                  gradientBackground.addColorStop(0, "hsla(0, 90%, 61%, 0)"); // this is for bellow only
                  gradientBackground.addColorStop(1, "hsla(0, 90%, 61%, 0.4)");
                  return gradientBackground;
                }
          
                function aboveGradient(ctx, chartArea, data, scales) {
                  const { left, right, top, bottom, width, height } = chartArea;
                  const { x, y } = scales;
                  const gradientBackground = ctx.createLinearGradient(
                    0,
                    y.getPixelForValue(data.datasets[0].data[0]),
                    0,
                    top
                  );
                  gradientBackground.addColorStop(0, "hsla(156, 72%, 42%, 0)"); // for above only
                  gradientBackground.addColorStop(1, "hsla(156, 72%, 42%, 0.4)");
                  return gradientBackground;
                }
          
                myChart.canvas.addEventListener("mousemove", (e) => {
                  crosshairLine(myChart, e);
                });
          
                function crosshairLine(chart, mousemove) {
                  const {
                    canvas,
                    ctx,
                    chartArea: { left, right, top, bottom },
                  } = chart;
          
                  const coorX = mousemove.offsetX;
                  const coorY = mousemove.offsetY;
          
                  chart.update("none");
                  ctx.restore();
          
                  if (
                    coorX >= left &&
                    coorX <= right &&
                    coorY >= top &&
                    coorY <= bottom
                  ) {
                    canvas.style.cursor = "crosshair";
                  } else {
                    canvas.style.cursor = "default";
                  }
          
                  ctx.strokeStyle = "#666";
                  ctx.lineWidth = 1;
                  ctx.setLineDash([3, 3]);
          
                  if (
                    coorX >= left &&
                    coorX <= right &&
                    coorY >= top &&
                    coorY <= bottom
                  ) {
                    // Horizontal Line
                    ctx.beginPath();
                    ctx.moveTo(left, coorY);
                    ctx.lineTo(right, coorY);
                    ctx.stroke();
                    ctx.closePath();
          
                    // Vertical Line
                    ctx.beginPath();
                    ctx.moveTo(coorX, top);
                    ctx.lineTo(coorX, bottom);
                    ctx.stroke();
                    ctx.closePath();
                    crosshairLabel(chart, mousemove);
                    crosshairPoint(chart, mousemove);
                  }
                  ctx.setLineDash([]);
                }
          
                function crosshairLabel(chart, mousemove) {
                  const {
                    ctx,
                    data,
                    chartArea: { top, bottom, left, right, width, height },
                    scales: { x, y },
                  } = chart;
          
                  const coorX = mousemove.offsetX;
                  const coorY = mousemove.offsetY;
                  const textWidth =
                    ctx.measureText(new Date(x.getValueForPixel(coorX)).toLocaleString())
                      .width + 40;
          
                  ctx.font = "12px sans-serif";
                  ctx.textBaseline = "middle";
                  ctx.textAlign = "center";
          
                  // yLabel
                  ctx.beginPath();
                  ctx.fillStyle = bgColor;
                  ctx.fillRect(0, coorY - 10, left, 20);
                  ctx.closePath();
          
                  ctx.fillStyle = "white";
                  ctx.fillText(y.getValueForPixel(coorY).toFixed(2), left / 2, coorY);
          
                  // Uncomment to enable xAxis label
                  // xLabel
                  // ctx.beginPath();
                  // ctx.fillStyle = bgColor;
                  // ctx.fillRect(coorX - textWidth / 2, bottom, textWidth, 20);
                  // ctx.closePath();
          
                  // const {date, time} = dateTimes[x.getValueForPixel(coorX)]
                  // ctx.fillStyle = "white";
                  // ctx.fillText(
                  //   date + ',' + time,
                  //   coorX,
                  //   bottom + 10
                  // );
                }
          
                function crosshairPoint(chart, mousemove) {
                  const {
                    ctx,
                    data,
                    chartArea: { top, bottom, left, right, width, height },
                    scales: { x, y },
                  } = chart;
          
                  const coorX = mousemove.offsetX;
                  const coorY = mousemove.offsetY;
          
                  ctx.beginPath();
                  ctx.strokeStyle = "#FFF";
                  ctx.lineWidth = 3;
                  ctx.setLineDash([]);
          
                  const angle = Math.PI / 180;
          
                  const leftOffset = x.getPixelForValue(x.min) - left;
                  const rightOffset = right - x.getPixelForValue(x.max);
          
                  const width2 = width - (leftOffset + rightOffset);
          
                  const segments = width2 / (dates.indexOf(x.max) - dates.indexOf(x.min));
          
                  const yOpening = y.getPixelForValue(data.datasets[0].data[0]); // solid
                  let index =
                    Math.floor((coorX - (left + leftOffset)) / segments) +
                    dates.indexOf(x.min);
          
                  let yStart = y.getPixelForValue(data.datasets[0].data[index]);
                  let yEnd = y.getPixelForValue(data.datasets[0].data[index + 1]);
          
                  let yInterpolation =
                    yStart +
                    ((yEnd - yStart) / segments) *
                      (coorX - x.getPixelForValue(data.labels[index]));
          
                  if (yOpening >= yInterpolation) {
                    ctx.fillStyle = "rgba(75, 192, 192, 1)";
                  } else {
                    ctx.fillStyle = "rgba(255, 26, 104, 1)";
                  }
          
                  // draw the circle
                  ctx.arc(coorX, yInterpolation, 5, angle * 0, angle * 360, false);
                  ctx.fill();
                  ctx.stroke();
                }
              </script>
            </body>
          </html>
          
        `;
  return (
    <View
      style={{flex: 1, height: chartHeight, marginTop: 20, marginBottom: 20}}>
      <WebView
        style={{
          backgroundColor: 'transparent',
          width: chartWidth,
          opacity: 0.99,
        }}
        scrollEnabled={false}
        onMessage={onMessage}
        source={{
          html,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    marginBottom: 30,
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    width: 375,
  },
});
