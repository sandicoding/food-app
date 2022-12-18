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
    DELETE_FOOD_FAIL
} from '../constants/FoodConstant'

export const listFoodReducer = (state = { foods: [] }, action) => {
    switch (action.type) {
        case LIST_FOOD_REQUEST:
            return { loading: true, foods: [] }
        case LIST_FOOD_SUCCESS:
            return { loading: false, foods: action.payload }
        case LIST_FOOD_FAIL:
            return { loading: false, error: action.payload }
        case CREATE_FOOD_REQUEST:
            return {...state, loading: true }
        case CREATE_FOOD_SUCCESS:
            return { loading: false, foods: [...state.foods, action.payload] }
        case CREATE_FOOD_FAIL:
            return { loading: false, error: action.payload }
        case UPDATE_FOOD_REQUEST:
            return {...state, loading: true }
        case UPDATE_FOOD_SUCCESS:
            const newFoodPayload = action.payload;
            const newFoodsState = [...state.foods];
            const index = newFoodsState.findIndex(food => food.id === newFoodPayload.id);
            newFoodsState[index] = newFoodPayload;
            return { loading: false, foods: newFoodsState }
        case UPDATE_FOOD_FAIL:
            return { loading: false, error: action.payload }
        case DELETE_FOOD_REQUEST:
            return {...state, loading: true }
        case DELETE_FOOD_SUCCESS:
            const newFoodsState2 = [...state.foods];
            const index2 = newFoodsState2.findIndex(food => food.id === action.payload);
            newFoodsState2.splice(index2, 1);
            return { loading: false, foods: newFoodsState2 }
        case DELETE_FOOD_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

