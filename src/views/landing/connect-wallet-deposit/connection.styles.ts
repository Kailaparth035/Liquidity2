import { StyleSheet } from "react-native";
import { COLORS } from "../../../assets";

export const ConnectionStyles = StyleSheet.create({
    backdrop: {
    },
    modalView: {
      margin: 20,
      marginTop: 'auto',
      marginBottom: 'auto',
      backgroundColor: COLORS["bg-90-dark"],
      borderRadius: 8,
      shadowColor: COLORS['black'],
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalSize: {
      marginTop: 100,
    },
  });
  