import React, { useState } from 'react'
import { Text, View, StyleSheet } from "react-native"
import TextBox from "../../components/TextBox"
import Btn from "../../components/Btn"
import { auth } from "../../firebase/firebase"
import { loginService } from '../../services/AuthService'

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default function Loginscreen({ navigation }) {

    const [values, setValues] = useState({
        email: "",
        pwd: ""
    })

    function handleChange(text, eventName) {
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
    }

    function Login() {

        const { email, pwd } = values

        loginService(email, pwd)
    }

    return <View style={styles.view}>
        <Text style={{ fontSize: 34, fontWeight: "800", marginBottom: 20 }}>Login</Text>
        <TextBox placeholder="Email Address" label="Email" onChangeText={text => handleChange(text, "email")} />
        <TextBox placeholder="Password" label="Password" onChangeText={text => handleChange(text, "pwd")} secureTextEntry={true} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "92%", }}>
            <Btn onClick={() => Login()} title="Login" style={{ width: "48%" }} />
            <Btn onClick={() => navigation.navigate("Sign Up")} title="Sign Up" style={{ width: "48%", backgroundColor: "#344869" }} />
        </View>
    </View>
}