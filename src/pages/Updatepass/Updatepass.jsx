import React, { useState } from 'react';
import { supabase } from '../../client'; // Assuming supabase is correctly imported

function PasswordReset() {
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handlePasswordReset = async () => {
    try {
      const user = supabase.auth.user();
      if (user) {
        if (newPass !== confirmPass) {
          throw new Error('New passwords do not match');
        }

        // Attempt to update the password
        const { error } = await supabase.auth.update({
          password: newPass,
        });

        if (error) {
          throw error;
        }

        // Password updated successfully
        console.log('Password updated successfully');
        // Optionally, you can add a success message or redirect to another page
      } else {
        throw new Error('User not authenticated');
      }
    } catch (error) {
      console.error('Password update error:', error.message);
      // Handle error state - display error message to the user
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
      {/* You can show a loading indicator or success message based on state */}
    </div>
  );
}

export default PasswordReset;
