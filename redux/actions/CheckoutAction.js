import {
    CHECKOUT_LIST_REQUEST,
    CHECKOUT_LIST_SUCCESS,
    CHECKOUT_LIST_FAIL,
    CHECKOUT_REQUEST,
    CHECKOUT_SUCCESS,
    CHECKOUT_FAIL,
} from '../constants/CheckoutConstant';
import { db } from '../../firebase/firebase';
import { addDoc, collection, where, query, getDocs } from 'firebase/firestore/lite';
import { clearCart } from './CartAction';

export const checkoutAction = (order, navigation) => async (dispatch) => {
    try {
        dispatch({
            type: CHECKOUT_REQUEST
        })

        await addDoc(collection(db, "orders"), order)

        dispatch({
            type: CHECKOUT_SUCCESS,
            payload: order
        })

        dispatch(clearCart())

        navigation.navigate("Transactions")
    } catch (error) {
        dispatch({
            type: CHECKOUT_FAIL,
            payload: error.message
        })

        console.log(error)
    }
}

export const checkoutListAction = (userId) => async (dispatch) => {
    try {
        dispatch({
            type: CHECKOUT_LIST_REQUEST
        })

        const order = await query(collection(db, "orders"), where("userId", "==", userId));

        const orders = []
        const querySnapshot = await getDocs(order);

        querySnapshot.forEach((doc) => {
            orders.push({id : doc.id,...doc.data()})
        })

        dispatch({
            type: CHECKOUT_LIST_SUCCESS,
            payload: orders
        })
    } catch (error) {
        dispatch({
            type: CHECKOUT_LIST_FAIL,
            payload: error.message
        })
    }
}

