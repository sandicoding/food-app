import {
    CHECKOUT_LIST_REQUEST,
    CHECKOUT_LIST_SUCCESS,
    CHECKOUT_LIST_FAIL,
    CHECKOUT_REQUEST,
    CHECKOUT_SUCCESS,
    CHECKOUT_FAIL,
} from '../constants/CheckoutConstant';

const initialState = {
    loading: false,
    transaction: {},
    transactions: [],
    error: '',
}

export const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECKOUT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CHECKOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                transactions: [...state.transactions, action.payload]
            }
        case CHECKOUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CHECKOUT_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CHECKOUT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                transactions: action.payload
            }
        case CHECKOUT_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

