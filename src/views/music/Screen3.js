import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const Screen3 = () => {
    return (
        <View style={styles.container}>
            <View style={{ margin: 10, flexDirection: 'row', }}>
                <Image source={require('./image/male.jpg')} style={styles.image} />
                <View style={styles.text1}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#FFFFFF' }}>The hills</Text>
                    <Text style={{ fontSize: 15, color: "#abaeac" }}>The Weekndn</Text>
                </View>
                <View style={styles.text2}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'white', }}>$139.09</Text>
                    <Text style={{ fontSize: 17, fontWeight: '600', color: "#008000", }}>$0.56(+0.25%)</Text>
                </View>
            </View>
        </View>
    )
}
export default Screen3

const styles = StyleSheet.create({
    container: {
       
        paddingVertical: 5,
        borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    marginHorizontal: 15
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 100,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    text1: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
        textAlign: 'center',
        justifyContent: 'space-evenly'
    },
    text2: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 5,
        justifyContent: 'center',
        textAlign: 'center',
        justifyContent: 'space-evenly'
    }
}) 