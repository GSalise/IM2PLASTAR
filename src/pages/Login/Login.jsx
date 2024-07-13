import React, { useState } from 'react';
import { supabase } from '../../client';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import logo from '../../assets/PLASTAR.svg';

const Login = ({ setToken }) => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  function handleChange(event) {
    setFormData(prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      
      setToken(data);
      navigate('/homepage');

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className={styles.html}>
      <div className={styles.body}>
        <form className={styles.loginform} onSubmit={handleSubmit}>
          <center><h2>Welcome Back!</h2></center>
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
          <div>
            You don't have an account? <Link to='/signup'>Sign Up</Link>
          </div>
          <div>
            <Link to='/forgotpass'>Forgot your password</Link>
          </div>
          <img src={logo} className={styles.logo} alt="Company Logo" />
        </form>
      </div>
    </div>
  );
};

export default Login;
