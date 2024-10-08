import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import {Link, useNavigate, } from "react-router-dom";
import uploadFile from "../helpers/uploadFile"
import axios from 'axios'
import toast from 'react-hot-toast';




const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  })
  const navigate = useNavigate()

  const [uploadPhoto, setUploadPhoto] = useState("")

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0]
    const uploadPhoto = await uploadFile(file)
    
    setUploadPhoto(file)

    setData((preve) =>{
    return{
      ...preve,
      profile_pic: uploadPhoto?.url
    }
    })
}
  const handleClearPhoto = (e) =>{
    setUploadPhoto(null)
    e.preventDefault()
    e.stopPropagation()
  }
 const handleSubmit = async  (e) =>{
    e.preventDefault()
    e.stopPropagation()

    const URL = `${import.meta.env.REACT_APP_BACKEND_URL}/api/register` 

    try {
      const response = await axios.post(URL,data);
      toast.success(response.data.message)
      if(response.data.success){
            setData({
              name: "",
              email: "",
              password: "",
              profile_pic: ""
            })

            navigate('/email') 
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }

  }
  return (
    <div className=' mt-5  '>
      <div className=' bg-white w-full max-w-md overflow-hidden rounded p-4 mx-auto'>
        <h3 className='font-semibold text-center text-xl text-primary '>Welcome to Chat App!</h3>

        <form className='grid gap-4' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2 mt-5'>
            <label htmlFor="name">Name :</label>
            <input type="text"
              id="name"
              name="name"
              placeholder='Enter your name'
              className='bg-slate-50 px-2 py-1 focus:outline-primary'
              value={data.name}
              onChange={handleOnChange}
              required />
          </div>
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
            <label htmlFor="profile_pic">Photo :

              <div className=' h-14 bg-slate-200 flex justify-center items-center border-2 rounded hover:border-primary pointer cursor-pointer'>
                <p className='text-sm'>
               {
                 uploadPhoto ? uploadPhoto?.name : "Upload profile photo"
               }
                </p>
                {
                   uploadPhoto?.name && (
                <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearPhoto}>
                  <IoCloseSharp />
                  </button>
                   )
                }

                
              </div>
            </label>
            <input type="file"
              id="profile_pic"
              name="profile_pic"
              className='bg-slate-50 px-2 py-1 focus:outline-primary hidden'
              onChange={handleUploadPhoto}
            />
          <button className='bg-primary text-lg py-1 px-4 rounded hover:bg-secondary mt-4 text-white font-bold leading-relaxed'>
            Register
          </button>
          </div>
        </form>
              <p className='my-3 text-center'>Already have account ? <Link className='hover:text-primary font-semibold'  to={'/email'}>Login</Link></p>
      </div>
    </div>
  )
}

export default Register