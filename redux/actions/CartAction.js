import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import {
    SHOW_CART,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    INCREASE_QUANTITY,
    DECREASE_QUANTITY,
    CLEAR_CART
} from '../constants/CartConstant'

export const showCart = () => (dispatch, getState) => {
    const cartItems = getState().cart.cart;
    dispatch({
        type: SHOW_CART,
        payload: cartItems
    })
}

export const addToCart = (item) => async (dispatch, getState) => {
    
    const cartItems = getState().cart.cart.slice();
    
    const existWarung = cartItems.find(x => x.warung === item.warung);

    if (existWarung) {
        dispatch({
            type: ADD_TO_CART,
            payload: item
        })
    Alert.alert('Success', 'Item added to cart')
    } else {
        dispatch(clearCart())
        dispatch({
            type: ADD_TO_CART,
            payload: item
        })
        Alert.alert('Success', 'Item added to cart')
    }

    await AsyncStorage.setItem('cartItems', JSON.stringify(item))
}

export const removeFromCart = (item) => (dispatch, getState) => {
    const cartItems = getState().cart.cart.slice().filter(x => x.id !== item.id);
    dispatch({
        type: REMOVE_FROM_CART,
        payload: cartItems
    })
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

export const increaseQuantity = (item) => async (dispatch, getState) => {
    const cartItems = getState().cart.cart.slice();
    cartItems.forEach(x => {
        if (x.id === item.id) {
            x.qty++;
        }
    })
    dispatch({
        type: INCREASE_QUANTITY,
        payload: cartItems
    })
    await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems))
}

export const decreaseQuantity = (item) => async (dispatch, getState) => {
    const cartItems = getState().cart.cart
    cartItems.forEach(x => {
        if (x.id === item.id) {
            x.qty--;
        }
    })

    dispatch({
        type: DECREASE_QUANTITY,
        payload: cartItems
    })
    await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems))
}

export const clearCart = () => async (dispatch) => {
    dispatch({
        type: CLEAR_CART
    })
    await AsyncStorage.removeItem('cartItems')
}