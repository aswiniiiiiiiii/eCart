import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {searchProduct} from '../redux/slices/productSlice'

const Header = ({insideHome}) => {
  const userCart = useSelector(state=>state.cartReducer)
  const userWishlist = useSelector(state=>state.wishListReducer)
  const dispatch = useDispatch()
  return (
    <nav className='flex bg-yellow-500 fixed w-full p-5'>
      <Link className='text-white font-bold text-2xl' to={'/'}><i className='fa-solid fa-truck-fast me-1'></i>E Cart</Link>
      <ul className='flex-1 text-right'>
       { insideHome && <li className='list-none inline-block px-5'><input onChange={(e)=>dispatch(searchProduct(e.target.value.toLowerCase()))} type="text" placeholder='Search Products here' className='rounded p-1' style={{width :"300px"}} /></li>}
        <li className='list-none inline-block px-5'><Link to={'/Wishlist'} className='text-white font-bold'><i className='fa-solid fa-heart text-red-500'></i> Wishlist<span className='p-1 rounded bg-black '>{userWishlist?.length}</span></Link></li>
        
        <li className='list-none inline-block px-5'><Link className='text-white font-bold' to={'/Cart'}><i className='fa-solid fa-cart-plus text-green-600'></i>Cart <span className='rounded bg-black p-1'>{userCart?.length}</span></Link></li>
      </ul>
    </nav>
  )
}

export default Header
