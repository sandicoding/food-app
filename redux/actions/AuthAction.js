import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginService } from "../../services/AuthService";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from "../constants/AuthConstant";

import {auth, db} from '../../firebase/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc, doc, setDoc, getDoc } from 'firebase/firestore/lite';

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
        
        if(getUser.exists()){
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: getUser.data()
            })

            await AsyncStorage.setItem('token', user.accessToken)
            await AsyncStorage.setItem("user", JSON.stringify(getUser.data()))
            await AsyncStorage.setItem("uid", user.uid)
        }

    } catch (error) {
        console.log(error, "error")
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message
        })

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





