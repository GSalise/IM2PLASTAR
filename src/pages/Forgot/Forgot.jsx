import React, { useState } from 'react';
import { supabase } from '../../client';
import { redirect } from 'react-router-dom';
import styles from './Forgot.module.css';

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
    <div className={styles.forgotBody}>
      <div className={styles.forgotResetForm}>
        <h2>Reset Password</h2>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <button onClick={handlePasswordRecovery}>Reset Password</button>
        {success && <p>Password reset instructions sent to your email.</p>}
        {error && <p>Error: {error}</p>}
      </div>
    </div>
  );
}

export default PasswordRecovery;
