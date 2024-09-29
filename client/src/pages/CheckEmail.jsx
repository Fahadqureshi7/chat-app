import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import {Link, useNavigate, } from "react-router-dom";
import axios from 'axios'
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";


const CheckEmail = () => {
  const [data, setData] = useState({
    email: ""
  })
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

 const handleSubmit = async  (e) =>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${import.meta.env.REACT_APP_BACKEND_URL}/api/email` 

    try {
      const response = await axios.post(URL,data);
      toast.success(response.data.message)
      if(response.data.success){
            setData({
              email: "",
            })

            navigate('/password' , {
              state : response?.data?.data
            }) 
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }

  }
  return (
    <div className=' mt-5  '>
      <div className=' bg-white w-full max-w-md overflow-hidden rounded p-4 mx-auto'>
        <div className='w-fit mx-auto mb-2'><PiUserCircle size={80}/></div>
        <h3 className='font-semibold text-center text-xl text-primary '>Welcome to Chat App!</h3>
        <form className='grid gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor="email">Email :</label>
            <input type="email"
              id="email"
              name="email"
              placeholder='Enter your email'
              className='bg-slate-50 px-2 py-1 focus:outline-primary'
              value={data.email}
              onChange={handleOnChange}
              required />
          </div>
          
          <div className='flex flex-col gap-1'>
          <button className='bg-primary text-lg py-1 px-4 rounded hover:bg-secondary mt-4 text-white font-bold leading-relaxed'>
            Let's Go
          </button>
          </div>
        </form>
              <p className='my-3 text-center'>New User ? <Link className='hover:text-primary font-semibold'  to={'/register'}>Register</Link></p>
      </div>
    </div>
  )
}

export default CheckEmail
