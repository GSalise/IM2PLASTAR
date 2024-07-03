import React, { useState, useEffect } from 'react';
import { supabase } from '../../client';
import { useNavigate } from 'react-router-dom';

function ResetPassword({token}) {
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (!token) {
      setMessage('Invalid or missing token.');
    }
  }, []);

  const handlePasswordReset = async () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    try {
      if (newPass !== confirmPass) {
        throw new Error('New passwords do not match');
      }

      const { data, error } = await supabase.auth.updateUser({
        access_token: token,
        password: newPass,
      });

      if (error) {
        throw error;
      }

      setMessage('Password updated successfully');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      console.error('Password update error:', error.message);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <input
        type="password"
        placeholder="New Password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
      />
      <button onClick={handlePasswordReset}>Reset Password</button>
      {message && <p>{message}</p>}
      <h3>Welcome,</h3>
    </div>
  );
}

export default ResetPassword;