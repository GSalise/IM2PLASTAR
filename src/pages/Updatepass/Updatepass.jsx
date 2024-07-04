import React, { useState } from 'react';
import { supabase } from '../../client';
import { useNavigate } from 'react-router-dom';

function ResetPassword({ token }) {
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    try {
      if (newPass !== confirmPass) {
        throw new Error('New passwords do not match');
      }

      // Update the user's password using Supabase auth API
      const { error } = await supabase.auth.updateUser({
        access_token: token,
        password: newPass,
      });

      if (error) {
        throw error;
      }

      // Password updated successfully
      setMessage('Password updated successfully');
      setTimeout(() => {
        navigate('/'); // Redirect to login page after 3 seconds
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
    </div>
  );
}

export default ResetPassword;
