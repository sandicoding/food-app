import {
    SHOW_CART,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    CLEAR_CART
} from '../constants/CartConstant'

const initialState = {
    cart: [],
    total: 0
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_CART:
            return {
                ...state,
                cart: action.payload
            }
        case ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cart.find(x => x.id === item.id);
            if (existItem) {
                return {
                    ...state,
                    cart: state.cart.map(x => x.id === existItem.id ? item : x)
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart, item]
                }
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(x => x.id !== action.payload)
            }
        case INCREASE_QUANTITY:
            return {
                ...state,
                cart: action.payload
            }
        case DECREASE_QUANTITY:
            return {
                ...state,
                cart: action.payload
            }
        case CLEAR_CART:
            return {
                ...state,
                cart: []
            }
        default:
            return state
    }
}