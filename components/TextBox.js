import React from 'react'
import {View, Text, TextInput, StyleSheet} from "react-native"
import colors from '../config/Restaurant/colors'

const styles = StyleSheet.create({
    container: {
        width: "92%",
        borderRadius: 8,
        marginTop: 20
    },
    textInput: {
        marginTop: 0,
        width: "100%",
        backgroundColor: "#ecf0f1",
        padding: 10,
        height: 52,
        borderWidth: 1,
        borderColor: "#bdc3c7",
    },
    label: {
        marginBottom: 5,
        fontSize: 14,
        color: colors.grey,
    },
})

export default function Loginscreen(props){
    return <View style={styles.container}>
        {props?.label && <Text style={styles.label}>{props?.label}</Text>}
        <TextInput style={{...styles.container, ...styles.textInput}} {...props} />
    </View>
}