import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const Pnf = () => {
  return (
    <>
      <Header/>
      <div style={{paddingTop:"100px",height :"80vh"}} className='flex justify-center items-center flex-col'>
      <img  className='mt-2' src="https://i.pinimg.com/originals/a3/59/56/a35956ec9f42082d3eeee4ba1b506060.gif" alt="" />
      <h1  className='text-6xl mb-2 font-bold text-red-500'>404</h1>
      <h1 className="font-bold text-4xl mb-2">Looks like you'r lost</h1>
      <p className='mb-2'>The page your looking for is not available</p>
      <Link className="bg-blue-600 p-2  text-white rounded" to={'/home'}>Home</Link>
      </div>
    </>
  )
}

export default Pnf
