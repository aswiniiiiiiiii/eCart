import { configureStore } from "@reduxjs/toolkit"
import productSlice from './slices/productSlice'
import wishListSlice from './slices/wishListSlice'
import cartSlice from './slices/cartSlice'



const cartStore = configureStore({
    reducer:{
        productReducer : productSlice,
        wishListReducer :  wishListSlice,
        cartReducer : cartSlice
    }
})


export default cartStore