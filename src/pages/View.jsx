import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../redux/slices/productSlice'
import { addToWishlist } from '../redux/slices/wishListSlice'
import { addToCart } from '../redux/slices/cartSlice'

const View = () => {
  const {id} = useParams()
  console.log(id)
  // const dispatch = useDispatch()
  const [product,setProduct] = useState({})
  // wishlist
  const userWishlist = useSelector(state=>state.wishListReducer)
  const dispatch = useDispatch()
  const userCart = useSelector(state=>state.cartReducer)

  useEffect(()=>{
    // dispatch(fetchAllProducts())
    if(sessionStorage.getItem("allProducts")){
      const allProducts = JSON.parse(sessionStorage.getItem("allProducts"))
      setProduct(allProducts?.find(item=>item.id==id))
    }
  },[])
  // console.log(product);
  
  const handleWishlist = (product)=>{
    const existingProduct = userWishlist?.find(item=>item.id==product.id)
    if(existingProduct){
      alert("Product already in your wishlist!!")
    }
    else{
      dispatch(addToWishlist(product))
    }
  }

  // handlecart
  const handlecart =(product)=>{
    const existingProduct = userCart?.find(item=>item.id==product.id)
    dispatch(addToCart(product))

    if(existingProduct){
      alert("Product Quantity is Incrementing!!")

    }
   
  }
  return (

    <>
      <Header />
      <div style={{ paddingTop: '100px' }} className='flex content-center items-center mx-5'>
        <div className="grid grid-cols-2 items-center">
          <img width={'100%'} height={'250px'} src={product?.thumbnail} alt="" />
          <div>
            <h3>PID : {product?.id}</h3>
            <h1 className="text-5xl font-bold">{product?.title}</h1>
            <h4 className="font-bold text-red-600 text-2xl">${product?.price}</h4>
            <h4><span className='font-bold'>Brand</span> : {product?.brand}</h4>
            <h4><span className="font-bold">Category : {product?.category}</span></h4>
            <p>
              <span className='font-bold'>Description</span> : {product?.description}
            </p>
            <h3 className='mt-2'><span className="font-bold text-xl text-yellow-500">Rating </span >: {product?.rating} / 5</h3>
            
            <h2 className="font-bold my-5">Client Review</h2>

              {
              product?.reviews?.length>0  ?
              product?.reviews?.map(item=>(
                <div key={item?.date} className='border rounded p-2 mb-2'>
                  <h5>
                    <span>{item?.reviewerName} : </span> {item?.comment}
                    <h4> {item?.rating}  <i className='fa-solid fa-star text-yellow-500'> </i></h4>
                  </h5>
                </div>
              ))
              :
              <p className="text-red-600">No Reviews Yet!!</p>
              }

          <div className="flex justify-between mt-5">
              <button onClick={()=>handleWishlist(product)} className="text-white bg-blue-500 rounded p-2">ADD TO WISHLIST</button>
              <button onClick={()=>handlecart(product)} className="text-white bg-green-500 rounded p-2">ADD TO CART</button>
              </div>   
          </div>
        </div>
      </div>
    </>
  )
}

export default View
