import {
    ACCEPT_ORDER_REQUEST,
    ACCEPT_ORDER_SUCCESS,
    ACCEPT_ORDER_FAIL,
    ACCEPT_PAYMENT_REQUEST,
    ACCEPT_PAYMENT_SUCCESS,
    ACCEPT_PAYMENT_FAIL,
} from '../constants/AcceptOrderConstant';

import {
    LIST_ORDER_BY_STALLS_ID_REQUEST,
    LIST_ORDER_BY_STALLS_ID_SUCCESS,
    LIST_ORDER_BY_STALLS_ID_FAIL,
} from '../constants/OrderConstant';

const initialState = {
    loading: false,
    orders: [],
    error: null,
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_ORDER_BY_STALLS_ID_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case LIST_ORDER_BY_STALLS_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload,
            }
        case LIST_ORDER_BY_STALLS_ID_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case ACCEPT_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ACCEPT_ORDER_SUCCESS:
            const orderId = action.payload;
            const newOrders = [...state.orders];
            const orderIndex = newOrders.findIndex(order => order.id === orderId);
            newOrders[orderIndex].status = "Selesai";

            return {
                ...state,
                loading: false,
                orders: newOrders,
            }
        case ACCEPT_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case ACCEPT_PAYMENT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ACCEPT_PAYMENT_SUCCESS:
            const paymentId = action.payload;
            const newPayments = [...state.orders];
            const paymentIndex = newPayments.findIndex(payment => payment.id === paymentId);
            newPayments[paymentIndex].Pay = "Selesai";

            return {
                ...state,
                loading: false,
                orders: newPayments,
            }
        case ACCEPT_PAYMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state;

    }
}