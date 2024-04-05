import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Screen1 from './Screen1'

const Screen4 = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>2021 Q1</Text>
            <Text style={styles.text2}>$1.54</Text>
        </View>
    )
}

export default Screen4

const styles = StyleSheet.create({
    container: {
       flex: 1,
       marginHorizontal: 20,
       paddingVertical: 5,
        flexDirection:'row',
    },
    text1: {
        fontSize: 17,
        color: '#abaeac',
        flex:1,
        textAlign:'left'
    },
    text2: {
        fontSize: 17,
        color: 'white',
        fontWeight:'bold',
        flex:1,
        textAlign:'right'
    }
})