import React from 'react'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import { removeWishlist } from '../redux/slices/wishListSlice'
import { addToCart } from '../redux/slices/cartSlice'

const Wishlist = () => {
  const dispatch = useDispatch()
  const userWishlist = useSelector(state=>state.wishListReducer)
  const userCart = useSelector(state=>state.cartReducer)

  const handlecart =(product)=>{
    const existingProduct = userCart?.find(item=>item.id==product.id)
    dispatch(removeWishlist(product.id))
    dispatch(addToCart(product))

    if(existingProduct){
      alert("Product Quantity is Incrementing!!")
    }
    
  }
  return (
    <>
    <Header/>
      <div style={{paddingTop :'100px'}} className="container px-4 mx-auto">
      {
        userWishlist?.length>0 ?
        <>
      <h1 className="text-4xl font-bold text-red-500">My Wishlist</h1>
      <div className="grid grid-cols-4 gap-4">
        {
          userWishlist?.map(product=>(
            <div className="rounded border p-2 shadow">
          <img width={"100%"} height={"200px"} src={product?.thumbnail} alt="" />
          <div className="text-center">
            <h1 className="text-xl font-bold">{product?.title}</h1>
            <div className="flex justify-evenly mt-3">
              <button  onClick={()=>dispatch(removeWishlist(product?.id))} className="text-xl"><i className='fa-solid fa-heart-circle-xmark text-red-600'></i></button>
              <button onClick={()=>handlecart(product)} className="text-xl"><i className='fa-solid fa-cart-plus text-green-600'></i></button>
            </div>
          </div>
        </div>
          ))
        }
      </div>
      </>
      :
      <div className='flex flex-col justify-center items-center text-blue-600'>
        <img className='w-100 h-1/2' src="https://rrmnagaur.com/public/assets/img/adt/empty_wishlist.png" alt="" />
        {/* <h3 className='font-bold text-3xl my-5'>Your Wishlist is Empty!!</h3> */}
      </div>
      }
      </div>
    </>
  )
}

export default Wishlist
