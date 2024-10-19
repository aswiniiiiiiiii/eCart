import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
    name:'wishlist',
    initialState : [],
    reducers:{
        addToWishlist:(state,dataFromView)=>{
            state.push(dataFromView.payload)
        },
        removeWishlist:(state,dataFromWishlist)=>{
          return  state.filter(item=>item.id!=dataFromWishlist.payload)
        }
    }
})

export const {addToWishlist,removeWishlist} = wishlistSlice.actions
export default wishlistSlice.reducer