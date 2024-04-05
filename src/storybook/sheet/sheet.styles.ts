import { StyleSheet } from "react-native";
import { COLORS } from "../../assets";

export const styles = StyleSheet.create({
    modal: {
      margin: 0,
      justifyContent: 'flex-end',
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    modalContainer: {
      justifyContent: 'flex-end',
    },
    container: {
      flex: 1,
      padding: 0,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      backgroundColor: COLORS["bg-90-dark"],
    },
  });
  