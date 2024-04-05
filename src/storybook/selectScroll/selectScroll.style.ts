import { StyleSheet } from "react-native";
import { COLORS } from "../../assets";
  
export const styles = StyleSheet.create({
    dobContain: {
      width: '100%',
    },
    formField: {
      flex: 1,
      display: 'flex',
      gridGap: 4,
    },
    label: {
      display: 'flex',
      flexDirection: 'row',
      gridGap: 2,
    },
    labelText: {
      color: COLORS['font-color-light'],
      fontSize: 12,
      fontWeight: '600',
    },
    star: {
      fontSize: 16,
      color: COLORS['compulsory'],
      marginLeft: 1,
    },
  });
  