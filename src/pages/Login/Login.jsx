import React from 'react'
import { useState } from 'react'
import { supabase } from '../../client'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

//The Logic
const Login = ({setToken}) => {
  let navigate = useNavigate()

  const [formData, setFormData] = useState({
    email:'',
    password:''
  })

  console.log(formData)

  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  async function handleSubmit(e){
    e.preventDefault()

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error
      console.log(data)
      setToken(data)
      navigate('/homepage')
      

    } catch (error) {
      alert(error)
    }
    
  }

  //The HTML
  return (
    <div className={styles.html}>
    <div className={styles.body}>
      <form onSubmit={handleSubmit}>

        <input 
          placeholder='Email'
          name='email'
          onChange={handleChange}
        />

        <input 
          placeholder='Password'
          name='password'
          type="password"
          onChange={handleChange}
        />

        <button type='submit'>
          Log In
        </button>



      </form>
      You don't have an account? <Link to='/signup'>Sign Up</Link>
    </div>
    </div>
  )
}

export default Login