import { StyleSheet } from "react-native";
import { COLORS } from "../../assets";

export const OrdersStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS['bg-100-dark'],
    flex: 1,
    marginBottom: 50
  },
  container: {
    height: '100%',
    backgroundColor: COLORS['bg-100-dark'],
  },
  scroll: {
    height: '100%',
  },
})
