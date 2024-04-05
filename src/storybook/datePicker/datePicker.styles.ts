import { StyleSheet } from "react-native";
import { COLORS } from "../../assets";

export const datePicker = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    footer: {
      alignItems: 'flex-end',
      right: 24,
    },
    saveBtn: {
      backgroundColor: COLORS['primary-dark'],
      padding: 12,
      width: 100,
      alignItems: 'center',
      borderRadius: 4,
    },
    saveTxt: {
      color: COLORS['white'],
    },
  });