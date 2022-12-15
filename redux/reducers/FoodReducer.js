import {
    LIST_FOOD_REQUEST,
    LIST_FOOD_SUCCESS,
    LIST_FOOD_FAIL,
} from '../constants/FoodConstant'

export const listFoodReducer = (state = { foods: [] }, action) => {
    switch (action.type) {
        case LIST_FOOD_REQUEST:
            return { loading: true, foods: [] }
        case LIST_FOOD_SUCCESS:
            return { loading: false, foods: action.payload }
        case LIST_FOOD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

