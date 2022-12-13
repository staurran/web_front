import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/user"
import basketReducer from "./slices/basket"

export default configureStore({
    reducer: combineReducers({ user: userReducer, basket: basketReducer })
})
