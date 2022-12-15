import {
    LIST_FOOD_REQUEST,
    LIST_FOOD_SUCCESS,
    LIST_FOOD_FAIL,
} from '../constants/FoodConstant'
import { getFirestore, collection, getDocs, addDoc, doc, setDoc, getDoc, query } from 'firebase/firestore/lite';
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
            foods.push({id : doc.id,...doc.data()})
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