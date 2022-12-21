import {
    LIST_FOOD_REQUEST,
    LIST_FOOD_SUCCESS,
    LIST_FOOD_FAIL,
    CREATE_FOOD_REQUEST,
    CREATE_FOOD_SUCCESS,
    CREATE_FOOD_FAIL,
    UPDATE_FOOD_REQUEST,
    UPDATE_FOOD_SUCCESS,
    UPDATE_FOOD_FAIL,
    DELETE_FOOD_REQUEST,
    DELETE_FOOD_SUCCESS,
    DELETE_FOOD_FAIL,
    LIST_FOOD_BY_STALLS_ID_REQUEST,
    LIST_FOOD_BY_STALLS_ID_SUCCESS,
    LIST_FOOD_BY_STALLS_ID_FAIL
} from '../constants/FoodConstant'
import { getFirestore, collection, getDocs, addDoc, doc, setDoc, getDoc, query, where } from 'firebase/firestore/lite';
import { Alert } from 'react-native';
import { db } from '../../firebase/firebase';

export const listFoodAction = () => async (dispatch) => {
    try {
        dispatch({
            type: LIST_FOOD_REQUEST
        })
        const q = query(collection(db, "foods"));
        const querySnapshot = await getDocs(q);

        const foods = [];
        querySnapshot.forEach((doc) => {
            foods.push({ id: doc.id, ...doc.data() })
        })

        dispatch({
            type: LIST_FOOD_SUCCESS,
            payload: foods
        })

    } catch (error) {
        dispatch({
            type: LIST_FOOD_FAIL,
            payload: error.message
        })
    }
}

export const listFoodByStallsIdAction = (stallsId) => async (dispatch) => {
    try {
        dispatch({
            type: LIST_FOOD_BY_STALLS_ID_REQUEST
        })

        const q = query(collection(db, "foods"), where("userId", "==", stallsId));
        const querySnapshot = await getDocs(q);

        const foods = [];
        querySnapshot.forEach((doc) => {
            foods.push({ id: doc.id, ...doc.data() })
        })

        dispatch({
            type: LIST_FOOD_BY_STALLS_ID_SUCCESS,
            payload: foods
        })

    } catch (error) {
        dispatch({
            type: LIST_FOOD_BY_STALLS_ID_FAIL,
            payload: error.message
        })
    }
}

export const createFoodAction = (food) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_FOOD_REQUEST
        })
        const docRef = await addDoc(collection(db, "foods"), food);
        dispatch({
            type: CREATE_FOOD_SUCCESS,
            payload: { id: docRef.id, ...food }
        })

        Alert.alert("Success", "Create food successfully")
    } catch (error) {
        dispatch({
            type: CREATE_FOOD_FAIL,
            payload: error.message
        })
    }
}

export const updateFoodAction = (foodId, food) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_FOOD_REQUEST
        })
        await setDoc(doc(db, "foods", foodId), food);
        dispatch({
            type: UPDATE_FOOD_SUCCESS,
            payload: { id: foodId, ...food }
        })

        Alert.alert("Success", "Update food successfully")
    } catch (error) {
        dispatch({
            type: UPDATE_FOOD_FAIL,
            payload: error.message
        })
    }
}

export const deleteFoodAction = (foodId) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_FOOD_REQUEST
        })
        await setDoc(doc(db, "foods", foodId), { isDeleted: true });
        dispatch({
            type: DELETE_FOOD_SUCCESS,
            payload: foodId
        })

        Alert.alert("Success", "Delete food successfully")
    } catch (error) {
        dispatch({
            type: DELETE_FOOD_FAIL,
            payload: error.message
        })
    }
}