import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
} from "../constants/AuthConstant";

export const loginAction = (email, password, navigation) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const user = await loginService(email, password, navigation)

        async AsyncStorage.setItem('user', JSON.stringify(user))

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: user
        })

    } catch (error) {
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





