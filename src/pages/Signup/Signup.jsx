import React from 'react'
import { useState } from 'react'
import { supabase } from '../../client'
import { Link } from 'react-router-dom'
import styles from './Signup.module.css'

const Signup = () => {

  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:'',
    contact: '',
    address: '',
    baranggay: '',
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
            username: formData.username,
            contact: formData.contact,
            baranggay: formData.baranggay,
            address: formData.address,
          }
        }
      })
      alert('Check email for verification')

    } catch (error) {
      alert(error)
    }
    
  }


  return (
    <div className={styles.body}> 
      <div className={styles.container}>
        <h1>Sign Up</h1>

        <form onSubmit={handleSubmit}>

          <div className={styles['form-group']}>
          <label>Name</label>
            <input 
              placeholder='Enter username'
              name='username'
              onChange={handleChange}
            />
          </div>

          <div className={styles['form-group']}>
            <label>Email</label>
            <input 
              placeholder='Enter email'
              name='email'
              onChange={handleChange}
            />
          </div>

          <div className={styles['form-group']}>
            <label>Contact</label>
            <input 
              placeholder='Enter password'
              name='password'
              type="password"
              onChange={handleChange}
            />
          </div>

          <div className={styles['form-group']}>
            <label>Address</label>
            <input 
              placeholder='Enter address'
              name='address'
              onChange={handleChange}
            />
          </div>

          <div className={styles['form-group']}>
            <label>Contact No.</label>
            <input 
              placeholder='Enter contact'
              name='contact'
              type='text'
              pattern='\d*'
              maxLength={11}
              onChange={handleChange}
            />
          </div>

          <div className={styles['form-group']}>
            <label>Assigned Baranggay</label>
            <input 
              placeholder='Enter baranggay'
              name='baranggay'
              onChange={handleChange}
            />
          </div>
          
          <button type='submit'className={styles.signup}>
            Sign Up!
          </button>



        </form>
        Already have an account? <Link to='/'>Login</Link>
      </div>
    </div>
  )
}

export default Signup