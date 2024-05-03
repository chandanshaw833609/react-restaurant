import { useState } from 'react'
import './App.css'
import Header from './Component/Header/Header'
import { useDispatch } from 'react-redux'
import Layout from './Component/Layout/Layout'


function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  console.log(token);
  if (token) {
    dispatch(authLogin(token))
  }
  return (
    <>
      <Layout/>
    </>
  )
}

export default App
