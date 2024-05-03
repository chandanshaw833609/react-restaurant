import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {login as authLogin} from '../Store/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { login, signup } from '../Backend/config'
import { CircularProgress } from '@mui/material'
import { useDispatch } from 'react-redux'

const RegisterUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const isLoggedIn = localStorage.getItem("isLoggedIn")
  const dispatch = useDispatch()
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
  })

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevFormData) =>  ({...prevFormData, [name]: value,}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signup(formData);
      console.log(formData);
      const loginData = {
        "email":formData.email,
        "password":formData.password,
      }
      const response = await login(loginData);
      console.log(loginData);
      dispatch(authLogin({"token" : response.data.token, "name" :  response.data.name}));
      navigate("/")
      setIsLoading(false)
      setError(false)
    } catch (error) {
      setError(true)
      setIsLoading(false)
      console.log("error", error);
      console.log("Error while login");
      navigate("/signup")
    }
  }
  
  return (
    <div className='border-2 m-auto mt-10 rounded-sm py-3 p-10 w-[350px] shadow-lg'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input 
            type="text"
            name='firstName'
            value={formData.firstName}
            onChange={handleInputChange}
            className='border w-full block rounded-sm ring-gray-300 ring-inset p-1 ring-1'
            />
          </div>

          <div>
          <label htmlFor="email">Email</label>
            <input 
            type="text"
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            className='border w-full block rounded-sm ring-gray-300 ring-inset p-1 ring-1'
            />
            {error && <p className='h-4 text-red-500'>Email already exist.</p>}
          </div>
          

          <div>
          <label htmlFor="email">Password</label>
            <input 
            type="text"
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            className='border w-full block rounded-sm ring-gray-300 ring-inset p-1 ring-1'
            />
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link to="/" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </Link>
          {isLoading ? (
             <button
             type="submit"
             className="h-8 w-20 rounded-md bg-indigo-600 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
           >
             <CircularProgress color="error" size={16}/>
           </button>
          ) : (
            <button
            type="submit"
            className="rounded-md bg-indigo-600 h-8 w-20 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
          )}
         
        </div>
        
        </form>
    </div>
  )
}

export default RegisterUser