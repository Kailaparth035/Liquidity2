import { StyleSheet } from "react-native";
import { COLORS } from "../../../../assets";

export const styles = StyleSheet.create({
    container: {
      padding: 12,
      backgroundColor: COLORS['bg-dark'],
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      width: 150,
      alignSelf: 'center',
      borderRadius: 8,
    },
    txt: {
      color: COLORS['white'],
      marginLeft: 6,
      fontWeight: '500',
    },
  });