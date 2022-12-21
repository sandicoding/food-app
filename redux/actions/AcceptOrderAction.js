import {
    ACCEPT_ORDER_REQUEST,
    ACCEPT_ORDER_SUCCESS,
    ACCEPT_ORDER_FAIL,
    ACCEPT_PAYMENT_REQUEST,
    ACCEPT_PAYMENT_SUCCESS,
    ACCEPT_PAYMENT_FAIL,
} from '../constants/AcceptOrderConstant';
import { db } from '../../firebase/firebase';
import { addDoc, collection, where, query, getDocs, updateDoc, doc } from 'firebase/firestore/lite';
import { Alert } from 'react-native';

export const acceptOrderAction = (orderId) => async (dispatch) => {
    try {
        dispatch({
            type: ACCEPT_ORDER_REQUEST
        })

        await updateDoc(doc(db, "orders", orderId), {
            status: "Selesai"
        })

        dispatch({
            type: ACCEPT_ORDER_SUCCESS,
            payload: orderId
        })

        Alert.alert("Pesanan Selesai", "Pesanan telah selesai")
    } catch (error) {
        dispatch({
            type: ACCEPT_ORDER_FAIL,
            payload: error.message
        })

        console.log(error)
    }
}

export const acceptPaymentAction = (orderId) => async (dispatch) => {
    try {
        dispatch({
            type: ACCEPT_PAYMENT_REQUEST
        })

        await updateDoc(doc(db, "orders", orderId), {
            Pay: "Selesai"
        })

        dispatch({
            type: ACCEPT_PAYMENT_SUCCESS,
            payload: orderId
        })

        Alert.alert("Pembayaran Selesai", "Pembayaran telah selesai")
    } catch (error) {
        dispatch({
            type: ACCEPT_PAYMENT_FAIL,
            payload: error.message
        })

        console.log(error)
    }
}