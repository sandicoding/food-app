import {
    LIST_ORDER_BY_STALLS_ID_REQUEST,
    LIST_ORDER_BY_STALLS_ID_SUCCESS,
    LIST_ORDER_BY_STALLS_ID_FAIL,
} from '../constants/OrderConstant';

import { db } from '../../firebase/firebase';
import { where, query, collection, getDocs } from 'firebase/firestore/lite';

export const listOrderByStallsIdAction = (stallsId) => async (dispatch) => {
    try {
        dispatch({
            type: LIST_ORDER_BY_STALLS_ID_REQUEST
        })

        const order = await query(collection(db, "orders"), where("warungId", "==", stallsId));

        const orders = []
        const querySnapshot = await getDocs(order);

        querySnapshot.forEach((doc) => {
            orders.push({id : doc.id,...doc.data()})
        })

        dispatch({
            type: LIST_ORDER_BY_STALLS_ID_SUCCESS,
            payload: orders
        })
    } catch (error) {
        dispatch({
            type: LIST_ORDER_BY_STALLS_ID_FAIL,
            payload: error.message
        })
    }
}
