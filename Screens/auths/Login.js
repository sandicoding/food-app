import React, { useState } from 'react'
import { Text, View, StyleSheet } from "react-native"
import TextBox from "../../components/TextBox"
import Btn from "../../components/Btn"
import { auth } from "../../firebase/firebase"
import { loginService } from '../../services/AuthService'
import { loginAction } from '../../redux/actions/AuthAction'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loading from '../../components/Loading'

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default function Loginscreen({ navigation }) {

    const dispatch = useDispatch()

    const userState = useSelector(state => state.auth)
    const { user, loading, error } = userState

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

        dispatch(loginAction(email, pwd, navigation))
    }

    if(loading) {
        return <Loading/>
    }

    return (
        <View style={styles.view}>
            <Text style={{ fontSize: 34, fontWeight: "800", marginBottom: 20 }}>Login</Text>
            <TextBox placeholder="Email Address" label="Email" onChangeText={text => handleChange(text, "email")} />
            <TextBox placeholder="Password" label="Password" onChangeText={text => handleChange(text, "pwd")} secureTextEntry={true} />
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "92%", }}>
                <Btn onClick={() => Login()} title="Login" style={{ width: "48%" }} />
                <Btn onClick={() => navigation.navigate("Sign Up")} title="Sign Up" style={{ width: "48%", backgroundColor: "#344869" }} />
            </View>
        </View>
    )
}