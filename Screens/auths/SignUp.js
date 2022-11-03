import React, { useState } from 'react'
import { Text, View, StyleSheet } from "react-native"
import TextBox from "../../components/TextBox"
import Btn from "../../components/Btn"
import { signupService } from '../../services/AuthService'
import DropDownPicker from "react-native-dropdown-picker"

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    dropdown: {
        borderColor: "#bdc3c7",
        backgroundColor: "#ecf0f1",
        height: 50,
        marginTop: 25,
        
    },
    dropdownGender: {
        marginHorizontal: 10,
        width: "92%",
    },
    placeholderStyles: {
        color: "grey",
    },
})

const SignUpScreen =  ({ navigation })  => {

    const [values, setValues] = useState({
        email: "",
        pwd: "",
        pwd2: "",
    })

    const [roleOpen, setRoleOpen] = useState(false);
    const [roleValue, setRoleValue] = useState(null);

    const [role, setRole] = useState([
        { label: "user", value: "user" },
        { label: "warung", value: "warung" },
    ]);


    function handleChange(text, eventName) {
        setValues(prev => {
            return {
                ...prev,
                [eventName]: text
            }
        })
    }

    function SignUp() {

        const { email, pwd, pwd2 } = values

        signupService(email, pwd)

        // if (pwd == pwd2) {
        //     firebase.auth().createUserWithEmailAndPassword(email, pwd)
        //         .then(() => {
        //         })
        //         .catch((error) => {
        //             alert(error.message)
        //             // ..
        //         });
        // } else {
        //     alert("Passwords are different!")
        // }
    }

    const onGenderOpen = React.useCallback(() => {
        setCompanyOpen(false);
    }, []);

    return (<View style={styles.view}>
        <Text style={{ fontSize: 34, fontWeight: "800", marginBottom: 20 }}>Create Account</Text>
        <TextBox placeholder="Email Address" label="Email" onChangeText={text => handleChange(text, "email")} />
        <View style={styles.dropdownGender}>
        <DropDownPicker
            style={styles.dropdown}
            open={roleOpen}
            value={roleValue} //roleValue
            items={role}
            setOpen={setRoleOpen}
            setValue={setRoleValue}
            setItems={setRole}
            placeholder="Select Role"
            placeholderStyle={styles.placeholderStyles}
            onOpen={onGenderOpen}
            zIndex={3000}
            zIndexInverse={1000}
        />
        </View>
        <TextBox placeholder="Password" label="password" secureTextEntry={true} onChangeText={text => handleChange(text, "pwd")} />
        <TextBox placeholder="Confirme Password" label="Confirme Password" secureTextEntry={true} onChangeText={text => handleChange(text, "pwd2")} />
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "92%", }}>
            <Btn onClick={() => SignUp()} title="Sign Up" style={{ width: "48%" }} />
            <Btn onClick={() => navigation.replace("Login")} title="Login" style={{ width: "48%", backgroundColor: "#344869" }} />
        </View>
    </View>)
}

export default SignUpScreen
