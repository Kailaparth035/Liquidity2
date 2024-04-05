import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../assets';


export const qrstyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS['primary'] },
    devices: {
        borderBottomWidth: 1,
        padding: 10,
        flexDirection: 'row',
        marginTop: 10
    },
    title: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 16,
    },
    imageView: {
        backgroundColor: '#84735a',
        // backgroundColor: '#2d4569',
        width: 48,
        height: 48,
        borderRadius: 24,
        padding: 8,
        gap:8

    },
    arrow:{fontSize: 14},
    lastActive:{
        color: 'darkgrey',
        marginLeft: 8,
        fontSize: 12,
        marginTop: 4,
        fontWeight:"500",
        lineHeight:16
      },
      logoutCon:{
        position: 'absolute',
        right: 16,
        top: 72,
        backgroundColor: '#878C99',
        width: 74,
        height: 32,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      },
      noLinked:{marginTop: 10, fontWeight: '600'},
      noDevice:{flex: 1, justifyContent: 'center', alignItems: 'center'},
      logOutBtn:{color: 'white', fontSize: 12, fontWeight: '600'},
    brand:{ marginLeft: 8, fontWeight: '600',fontSize:14,lineHeight:20},
    imageStyle:{width: 30, height: 30, borderRadius: 30, padding: 10},
    contain: { backgroundColor: '#ccc', borderRadius: 8, padding: 16 },
    row: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    label: {
        width: 120,
        fontSize: 14,
        fontWeight: '500',
        color: COLORS['color-text-light-100'],
    },
    colon: {
        width: 20,
        fontSize: 16,
        fontWeight: '500',
        color: COLORS['color-text-light-100'],
    },
    value: {
        color: COLORS['color-text-light-90'],
        fontSize: 14,
        fontWeight: '500',
    },
    version: {
        color: COLORS['color-text-light-90'],
        fontSize: 10,
        marginLeft: 2,
    },
    logoutBtn: {
        backgroundColor: COLORS.red,
        padding: 12,
        marginTop: 8,
        marginBottom: 20,
        borderRadius: 8,
    },
    logoutTxt: {
        textAlign: 'center',
        color: COLORS.white,
        fontWeight: '600',
    },
    centerText: {
        fontSize: 16,
        paddingHorizontal: 16,
        color: '#777',
        textAlign: 'center',
    },
});
