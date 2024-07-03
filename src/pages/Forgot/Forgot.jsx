import React from 'react'
import { supabase } from '../../client';
import { useState } from 'react';
import { redirect } from 'react-router-dom';


function PasswordRecovery() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  

  const handlePasswordRecovery = async () => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  

  return (

    
    <div>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handlePasswordRecovery}>Reset Password</button>
      {success && <p>Password reset instructions sent to your email.</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
}

export default PasswordRecovery;


