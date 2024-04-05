import type { INewsAtom } from './types';

import { atom } from 'recoil';

export const NewsState = atom<INewsAtom>({
  key: 'news',
  default: {},
});

export const NewsStateData = atom<any>({
  key: 'news-state-data',
  default: {
    "technical_chart": {
      "line": {
        "title": "Cashflow Percentage ",
        "sub_title": "over a six month period",
        "type": "line",
        "background_color": "#1b1c1f",
        "legend_text": "Age In Days",
        "colors": [
          "#458BF5",
          "#F5AF45",
          "#33B87A",
          "#8B45F5",
          "#F55353"
        ],
        "series": [
          {
            "name": "0-30",
            "data": [
              0.4,
              0.6,
              0.5,
              0.7,
              0.4,
              0.43,
              0.5,
              0.48,
              0.7,
              0.45,
              0.62
            ]
          },
          {
            "name": "31-60",
            "data": [
              0.24,
              0.36,
              0.28,
              0.47,
              0.3,
              0.13,
              0.13,
              0.44,
              0.27,
              0.24,
              0.26
            ]
          },
          {
            "name": "61-90",
            "data": [
              0.14,
              0.16,
              0.25,
              0.27,
              0.23,
              0.23,
              0.33,
              0.12,
              0.17,
              0.18,
              0.16
            ]
          },
          {
            "name": "90-120",
            "data": [
              0.08,
              0.06,
              0.15,
              0.17,
              0.13,
              0.13,
              0.23,
              0.14,
              0.27,
              0.14,
              0.08
            ]
          },
          {
            "name": "120+",
            "data": [
              0.04,
              0.06,
              0.05,
              0.07,
              0.03,
              0.03,
              0.03,
              0.04,
              0.07,
              0.04,
              0.06
            ]
          }
        ]
      },
      "line2": {
        "title": "Car Model Broken down  ",
        "sub_title": "Over number of times",
        "type": "line",
        "background_color": "#1b1c1f",
        "legend_text": "Age In Days",
        "colors": [
          "#458BF5",
          "#F5AF45",
          "#33B87A",
          "#8B45F5",
          "#F55353",
          "#FFFFFF",
          "#D4F553",
          "#53D4F5",
        ],
        "series": [
          {
            "name": "Balance",
            "data": [4.8, 6.6, 5.4, 7.2, 6.3, 4.3, 5.3],
          },
          {
            "name": "Net Loss",
            "data": [3.4, 2.6, 1.5, 2.7, 1.3, 3.3, 1.3],
          },
          {
            "name": "Total Paid",
            "data": [4, 6, 5, 7, 3, 3, 3],
          },
          {
            "name": "Principal Paid",
            "data": [2.4, 1.6, 0.5, 2.7, 2.3, 1.3, 3.3],
          },
          {
            "name": "Net Loss",
            "data": [1.19, 1.26, 1.25, 1.11, 1.17, 1.25, 1.18],
          },
          {
            "name": "Recovered Amt.",
            "data": [0.14, 0.16, 0.15, 0.17, 0.13, 0.2, 0.1],
          },
          {
            "name": "Charge Off Amt.",
            "data": [0.4, 0.2, 0.25, 0.27, 0.23, 0.13, 0.23],
          },
          {
            "name": "Schedule Payment",
            "data": [0.1, 0.6, 0.5, 0.7, 0.3, 0.3, 0.4],
          },
        ],
      },
      "gauge": {
        "title": "Cashflow Percentage",
        "sub_title": "over a six month period",
        "type": "gauge",
        "background_color": "#1b1c1f",
        "legend_text": "Age In Days",
        "min": 0,
        "max": 100,
        "series": {
          "name": "Growth",
          "data": [
            90
          ]
        }
      },
      "chart5": {
        "title": "Cashflow Percentage",
        "sub_title": "over a six month period",
        "colors": [
          "#F5AF45",
          "#458BF5"
        ],
        "xAxis": {
          "categories": [
            "2020",
            "2021",
            "2022",
            "2023",
            "2024",
            "2025",
            "2026",
            "2027",
            "2028",
            "2029",
            "2030",
            "2031"
          ]
        },
        "yAxis": {
          "primary_title": "Net Loss",
          "secondary_title": "Gross Charge off"
        },
        "series": [
          {
            "name": "Gross Charge off",
            "type": "spline",
            "yAxis": 1,
            "data": [
              49.9,
              71.5,
              106.4,
              129.2,
              144,
              176,
              135.6,
              148.5,
              216.4,
              194.1,
              95.6,
              54.4
            ],
            "tooltip": {
              "valueSuffix": " mm"
            }
          },
          {
            "name": "Net Loss",
            "type": "spline",
            "data": [
              7,
              6.9,
              9.5,
              14.5,
              18.2,
              21.5,
              25.2,
              26.5,
              23.3,
              18.3,
              13.9,
              9.6
            ],
            "tooltip": {
              "valueSuffix": " %"
            }
          }
        ]
      },
      "chart4": {
        "title": "Payment cashflows ",
        "sub_title": "over a six month period ",
        "colors": ["#458BF5", "#FFFFFF", "#F5AF45"],
        "xAxis": {
          "categories": [
            "2020",
            "2021",
            "2022",
            "2023",
            "2024",
            "2025",
            "2026",
            "2027",
            "2028",
            "2029",
            "2030",
            "2031",
          ]
        },
        "yAxis": {
          "primary_title": "Cashflow",
          "secondary_title": "Running Sum of Payments"
        },
        "series": [
          {
            "name": "Cashflow",
            "type": "column",
            "yAxis": 1,
            "data": [
              27.6, 28.8, 21.7, 34.1, 29.0, 28.4, 45.6, 51.7, 39.0, 60.0, 28.6,
              32.1,
            ],
            "borderWidth": 0,
            "groupPadding": 0.1,
            "pointPadding": 0,
            "tooltip": {
              "valueSuffix": "$",
            },
          },
          {
            "name": "Running Sum of Payments",
            "type": "spline",
            "data": [0.6, 0.9, 1.8, 1.97, 2.0, 2.1, 2.5, 2.8, 3.8, 4.7, 5.0, 6.4],
            "tooltip": {
              "valueSuffix": "$",
            },
          },
        ],
      }
    }
  }
})

