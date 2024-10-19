import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {  decQuantity, emptyCarts, incQuantity, removeCartItem } from '../redux/slices/cartSlice'



const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userCart = useSelector(state=>state.cartReducer)
  const [cartTotal,setCartTotal] = useState(0)

  useEffect(()=>{
    if(userCart?.length>0){
      setCartTotal(userCart?.map(item=>item.totalPrice)?.reduce((a,b)=>a+b))

    }
  },[userCart])

  const handleDecrementQuantity =(product)=>{
    if(product.quantity>1){
      dispatch(decQuantity(product))
    }else{
      dispatch(removeCartItem(product.id))
    }
  }

  const handleCheckout = ()=>{
    dispatch(emptyCarts())
    alert("Order Confirmed...Thank you for purchasing with us !!")
    navigate('/')
  }
  return (
    <>
      <Header/>
      <div style={{paddingTop :"100px"}} className='container px-4 mx-auto'>
       { 
        userCart?.length>0 ?
        <>
        <h1 className="text-5xl text-blue-600">Cart Summary</h1>
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div className="col-span-2 border shadow rounded p-5">
            {/* table */}
            <table className='table-auto w-full'>
              <thead>
                <tr>
                  <td className='font-semibold'>#</td>
                  <td className='font-semibold'>Name</td>
                  <td className='font-semibold'>Image</td>
                  <td className='font-semibold'>Quantity</td>
                  <td className='font-semibold'>Price</td>
                  <td className='font-semibold'>..</td>
                </tr>
              </thead>
              <tbody>
                {
                  userCart.map((product,index)=>(
                    <tr key={index}>
                    <td>{index+1}</td>
                    <td>{product.title}</td>
                    <td><img width={'70px'} height={'70px'} src={product.thumbnail} alt="" /></td>
                    <td>
                      <div className="flex">
                        <button onClick={()=>dispatch(handleDecrementQuantity(product))} className="font-bold">-</button>
                        <input style={{width : '40px'}} readOnly value={product?.quantity}  type="text" className='border p-1 rounded ms-2 me-2' />
                        <button onClick={()=>dispatch(incQuantity(product))} className="font-bold">+</button>
                      </div>
                    </td>
                    <td>$ 250</td>
                    <td><button  className="text-red-600"><i className='fa-solid fa-trash'></i></button></td>
                  </tr>
                  ))
                }
              </tbody>
            </table>
            <div className="float-right mt-4">
              <button onClick={()=>dispatch(emptyCarts())} className="bg-red-600 text-white p-2 rounded me-3">EMPTY CART</button>
              <Link className="bg-blue-600 text-white p-2 rounded" to={'/'}>SHOP MORE</Link>
            </div>
          </div>
          <div className="col-span-1 border shadow rounded p-5">
            {/* checkout */}
            <h1 className="text-2xl font-bold">Total Amount : <span className='text-red-600'>{cartTotal}</span></h1>
             <button onClick={()=>dispatch(handleCheckout)} className="w-full bg-green-600 rounded p-5 text-white font-bold mt-5 text-xl">Checkout</button>
          </div>
        </div>
        </>
        :
        <div className='flex flex-col justify-center items-center text-blue-600'>
        <img className='w-100 h-1/2' src="https://jewelevina.com/assets/images/empty-wishlist.png" alt="" />
        <h3 className='font-bold text-3xl my-5'>Your Cart is Empty!!</h3>
      </div>}
     </div>
    </>
  )
}

export default Cart
