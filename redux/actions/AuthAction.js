import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginService } from "../../services/AuthService";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REQUEST,
    USER_SUCCESS,
    USER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_ID_REQUEST,
    USER_ID_SUCCESS,
    USER_ID_FAIL,
    USER_LOGOUT,
    USER_LOGGED
} from "../constants/AuthConstant";

import { auth, db } from '../../firebase/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, doc, setDoc, getDoc } from 'firebase/firestore/lite';
import { View, StyleSheet, Button, Alert } from "react-native";
import { clearCart } from "./CartAction";

const showAlert = () =>
    Alert.alert(
        "Alert Title",
        "My Alert Msg",
        [
            {
                text: "Cancel",
                onPress: () => Alert.alert("Cancel Pressed"),
                style: "cancel",
            },
        ],
        {
            cancelable: true,
            onDismiss: () =>
                Alert.alert(
                    "This alert was dismissed by tapping outside of the alert dialog."
                ),
        }
    );

export const loginAction = (email, password, navigation) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const user = await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return user
            })

        const getCollectionUser = doc(db, "users", user.uid)
        const getUser = await getDoc(getCollectionUser)

        if (getUser.exists()) {
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: { ...getUser.data(), id: user?.uid }
            })

            await AsyncStorage.setItem('token', user.accessToken)
            await AsyncStorage.setItem("user", JSON.stringify(getUser.data()))
            await AsyncStorage.setItem("uid", user.uid)

            Alert.alert("Login berhasil.")

        }
        
    } catch (error) {
        console.log(error, "error")
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message
        })
        Alert.alert("Email dan password salah.")

    }
}

export const registerAction = (fullname, email, password, role, navigation) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        const user = await signupService(fullname, email, password, role, navigation)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: user
        })
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.message
        })
    }
}

export const getUserAction = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_REQUEST
        })

        const user = await AsyncStorage.getItem("user")

        dispatch({
            type: USER_SUCCESS,
            payload: JSON.parse(user)
        })
    } catch (error) {
        dispatch({
            type: USER_FAIL,
            payload: error.message
        })
    }
}

export const getIdUserAction = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_ID_REQUEST
        })

        const uid = await AsyncStorage.getItem("uid")

        dispatch({
            type: USER_ID_SUCCESS,
            payload: uid
        })
    } catch (error) {
        dispatch({
            type: USER_ID_FAIL,
            payload: error.message
        })
    }
}

export const logoutAction = (navigation) => async (dispatch) => {
    try {
        await AsyncStorage.clear()
        dispatch(clearCart())

        dispatch({
            type: USER_LOGOUT
        })

        navigation.navigate("Login")
    } catch (error) {
        console.log(error)
    }
}

//** Get User Logged
export const getUserLoggedAction = () => async (dispatch) => {
    try {
        const token = await AsyncStorage.getItem("token")

        if (token) {
            dispatch({
                type: USER_LOGGED,
                payload: true
            })
        }

    } catch (error) {
        console.log(error)
    }
}





