import React from 'react'
import { useState } from 'react'
import { supabase } from '../client'
import { Link } from 'react-router-dom'

const Signup = () => {

  const [formData, setFormData] = useState({
    fullName:'',
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
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_Name: formData.fullName,
          }
        }
      })
      alert('Check email for verification')

    } catch (error) {
      alert(error)
    }
    
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder='FullName'
          name='fullName'
          onChange={handleChange}
        />

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
          Sign Up!
        </button>



      </form>
      Already have an account? <Link to='/'>Login</Link>
    </div>
  )
}

export default Signup
