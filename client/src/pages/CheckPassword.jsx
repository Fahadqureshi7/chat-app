import React, { useEffect, useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import {Link, useLocation, useNavigate, } from "react-router-dom";
import axios from 'axios'
import toast from 'react-hot-toast';
import { PiUserCircle } from "react-icons/pi";
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';


const CheckPassword = () => {
  const [data, setData] = useState({
    password: "",
  })
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
    
  useEffect(()=>{
      if(!location?.state?.name){
        navigate('/email')
      }
  },[])
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

    const URL = `${import.meta.env.REACT_APP_BACKEND_URL}/api/password`
    

    try {
      const response = await axios({
        method : 'post',
        url : URL, 
        data : {
          userId :location?.state?._id,
          password : data.password
        },
        withCredentials : true
      })  






      toast.success(response.data.message)

      if(response.data.success){
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token' , response?.data?.token)
         
            setData({
              password: "",
            })
            navigate('/') 
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }

  }
  return (
    <div className=' mt-5  '>
      <div className=' bg-white w-full max-w-md overflow-hidden rounded p-4 mx-auto'>
        <div className='w-fit mx-auto mb-2 flex justify-center items-center flex-col'>
          {/* <PiUserCircle size={80}/> */}
          <Avatar
          width={70}
          height={70}
          name={location?.state?.name}
          imageUrl={location?.state?.profile_pic}
          />
          <h2 className=' font-semibold text-lg mt-1'>{location?.state?.name}</h2>
          </div>
        <h3 className='font-semibold text-center text-xl text-primary '>Welcome to Chat App!</h3>
        <form className='grid gap-4' onSubmit={handleSubmit}>



        <div className='flex flex-col gap-1'>
            <label htmlFor="password">Password :</label>
            <input type="password"
              id="password"
              name="password"
              placeholder='Enter your password'
              className='bg-slate-50 px-2 py-1 focus:outline-primary'
              value={data.password}
              onChange={handleOnChange}
              required />
          </div>
          
          <div className='flex flex-col gap-1'>
          <button className='bg-primary text-lg py-1 px-4 rounded hover:bg-secondary mt-4 text-white font-bold leading-relaxed'>
            Login
          </button>
          </div>
        </form>
              <p className='my-3 text-center'><Link className='hover:text-primary font-semibold'  to={'/forgot-password'}>Forgot Password ?</Link></p>
      </div>
    </div>
  )
}

export default CheckPassword
