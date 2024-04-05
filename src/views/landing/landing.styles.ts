import { StyleSheet } from 'react-native';

import { COLORS } from '../../assets';

export const landingStyles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS['bg-100-dark'],
  },
  logo: {
    backgroundColor: COLORS['bg-100-dark'],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingTop: 0,
  },
  logoSize: {
    height: 49,
    width: 186,
    position: 'absolute',
    bottom: 70,
  },
  bg: {
    backgroundColor: COLORS['bg-100-dark'],
  },
  try: {
    padding: 16,
    borderColor: COLORS['color-text-dark-40'],
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 48,
  }
});
