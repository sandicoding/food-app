import { combineReducers } from 'redux';
import { userLoginReducer, userRegisterReducer } from './AuthReducer';
import { cartReducer } from './CartReducer';
import { checkoutReducer } from './CheckOutReducer';
import { listFoodReducer } from './FoodReducer';
import { orderReducer } from './OrderReducer';


const rootReducer = combineReducers({
    auth: userLoginReducer,
    foods: listFoodReducer,
    cart: cartReducer,
    orders: checkoutReducer,
    ordersStalls: orderReducer
    
});

export default rootReducer;