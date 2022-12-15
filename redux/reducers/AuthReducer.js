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


const initialState = {
    loading: false,
    user: {},
    error: null,
    isLogged: false,
    message: '',
    status: '',
    uid: ''
}

export const userLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                isLogged: true
            }
        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case USER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case USER_ID_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_ID_SUCCESS:
            const uid = action.payload
            const newUser = {...state.user, uid}
            return {
                ...state,
                loading: false,
                user: newUser
            }
        case USER_ID_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case USER_LOGOUT:
            return {
                ...state,
                user: {},
                isLogged: false
            }
        case USER_LOGGED:
            return {
                ...state,
                isLogged: action.payload
            }
        
        default:
            return state;
    }
}

export const userRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
                status: 'success'
            }
        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case "USER_RESET_REGISTER" :
            return initialState
        default:
            return state;
    }
}


