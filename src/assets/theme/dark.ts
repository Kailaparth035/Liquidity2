export const COLORS = {
  black: '#000000',
  white: '#ffffff',

  primary: '#0D0E0F',
  dark_blue: '#090D35',
  light_blue: '#20285B',
  light_black: '#252F3F',
  green_download: '#1A9E4F',
  button_blue: '#377EC0',
  diabale_button_blue: 'rgba(55, 126, 192, 0.3)',
  green_dot: '#2E845C',
  dark_button: 'rgba(255, 255, 255, 0.12)',
  blue_border: '#84A0EB',
  dark_blue2: '#1472ff',
  yellow: '#ED8827',
  green: '#14B855',
  // color variables
  'primary-light': '#3C65D6',
  'primary-dark': '#4574F5',
  'accent-light': '#E5AE40',
  'accent-dark': '#F5C462',
  'bg-100-light': '#FFFFFF',
  'bg-90-light': '#F5F5F5',
  'bg-80-light': '#E6E6E6',
  'bg-100-dark': '#0D0E0F',
  'bg-90-dark': '#1B1C1F',
  'bg-80-dark': '#282A2E',
  'bg-dark': '#373D76',
  'input-border-light': '#E6EAF5',
  'input-border-focus-light': '#3C65D6',
  'input-border-dark': '#36383D',
  'input-border-focus-dark': '#A2A7B8',
  'font-color-light': '#878C99',
  'btn-primary-light': '#458BF5',
  'btn-disabled': '#696969',
  'btn-cancel': '#FFFFFF1F',
  'btn-more': '#87CEEB',
  'bg-model': '#8b7ada',
  'bg-reject': 'rgba(255, 30, 57, 0.7)',
  buy: '#33B87A',
  sell: '#F54545',

  red: '#F54545',
  green: '#33B87A',

  'price-up': '#31C489',
  'price-down': '#D63C3C',
  compulsory: '#ff0000',

  'color-text-dark-100': '#FFFFFF',
  'color-text-dark-90': '#D7DFF5',
  'color-text-dark-80': '#BCC3D6',
  'color-text-dark-70': '#A2A7B8',
  'color-text-dark-60': '#878C99',
  'color-text-dark-50': '#6C707A',
  'color-text-dark-40': '#51545C',

  'color-text': '#667085',

  'color-text-light-100': '#1B1C1F',
  'color-text-light-90': '#36383D',
  'color-text-light-80': '#51545C',
  'color-text-light-70': '#6C707A',
  'color-text-light-60': '#878C99',
  'color-text-light-50': '#A2A7B8',
  'color-text-light-40': '#BCC3D6',

  'color-border-dark-100': '#36383D',
  'color-border-dark-90': '#43464D',
  'color-border-dark-80': '#51545C',

  'color-bg-dark-100': '#1B1C1F',
  'color-bg-dark-90': '#282A2E',
  'color-bg-dark-80': '#36383D',

  'color-bg-light-100': '#FFFFFF',
  'color-bg-light-90': '#EBEEF5',
  'color-bg-light-80': '#E1E6F5',

  'color-blue': '#4388EF',
  'color-orange': '#EFB643',
  'color-green': '#33B87A',
  'color-purple': '#CC43EF',
  'color-red': '#F54545',
  'color-yellow': '#F5AF45',

  'color-radial-red': '#C54585',
  'color-radial-green': '#4EBF75',
  'color-radial-blue': '#2EC1BF',
  'color-radial-orange': '#F34F2A',
  'color-radial-purple': '#513EAD',
  'color-radial-skyblue': '#4343EF',
  'color-transparent-dark-white': 'rgba(255, 255, 255, 0.12)',
  'color-transparent-dark-primary': 'rgba(69, 116, 245, 0.12)',
  'color-transparent-green': 'rgba(51,184,122,.2)',
};

export const darkTheme = {
  dark: true,
  colors: {
    primary: '#FFFFFF',
    background: '#0D0E0F',
    card: '#0D0E0F',
    headerCard: COLORS['bg-80-dark'],
    text: '#F4F4F6',
    border: COLORS['input-border-dark'],
    buy: '#33B87A',
    sell: '#F54545',
    compulsory: '#ff0000',
    box: COLORS['input-border-dark'],
    ground: COLORS['bg-90-dark'],
    yellow: COLORS['accent-dark'],
    inputlogin: COLORS['font-color-light'],
    lightText: '#8D93A5',
    imagebg: '#a9a9a9',
    radiobutton: '#ffffff',
    lineBorder: '#D7DFF5',
    btnCancel: '#FFFFFF1F',
    placeholderText: '#51545C',
  },
};

export const lightTheme = {
  dark: false,
  colors: {
    primary: '#000000',
    background: '#FFFFFF',
    card: COLORS['bg-90-light'],
    headerCard: COLORS['bg-80-light'],
    text: '#1D1E21',
    border: COLORS['input-border-light'],
    buy: '#33B87A',
    sell: '#F54545',
    compulsory: '#ff0000',
    box: '#cccccc',
    ground: COLORS['bg-90-light'],
    yellow: COLORS['accent-light'],
    inputlogin: COLORS['bg-90-dark'],
    lightText: '#6C7489',
    imagebg: '#d3d3d3',
    radiobutton: '#33B87A',
    lineBorder: '#36383D',
    btnCancel: '#808080',
    placeholderText: '#C7C7CD',
  },
};
