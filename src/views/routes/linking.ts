import {Routes} from './constants';

const config = {
  screens: {
    onboarding: {
      path: `${Routes.Onboarding}/:code`,
    },
    login: {
      path: Routes.Login,
    },
  },
};

export const linking = {
  prefixes: [
    'https://secure.stage.satschel.com',
    'satschel://app',
    'stealthmode://',
  ],
  config,
};
