import { combineReducers } from 'redux';
import { userLoginReducer, userRegisterReducer } from './AuthReducer';


const rootReducer = combineReducers({
    auth: userLoginReducer,
    
});

export default rootReducer;