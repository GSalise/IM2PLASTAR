import React from 'react'
import Header from '../../stuff/Header/Header'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../../client';

const Account = ({ token }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    contact: '',
    address: '',
    baranggay: '',
  });
  const [editMode, setEditMode] = useState(false);

  console.log(formData);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e){
    e.preventDefault()

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          username: formData.username,
          contact: formData.contact,
          baranggay: formData.baranggay,
          address: formData.address,
        },
      });

      const { data:refreshD, error: refreshE} = await supabase.auth.refreshSession();
  

      if(error){
          console.log(refreshE);
      }else{
        console.log(refreshD);
        const { data: D, error: E } = await supabase.auth.setSession({
          access_token: refreshD.session.access_token,
          refresh_token: refreshD.session.refresh_token,
        })
        if(E){
          console.log(E);
        }else{
          console.log(D);
        }
      }

      
    } catch (error) {
      console.log('out', error)
      
    }
  }

 

  function returnHome() {
    navigate('/homepage');
  }

  function handleLogout(){
    sessionStorage.removeItem('token')
    navigate('/')
  }

  const transformToEdit = () => {
    setEditMode(!editMode);
  }


  return (
    <div>
      <Header returnHome={returnHome} currentpage='account'/>
      <p>Account Details</p>

      {
        !editMode ? (
        
          <div id='accDetails'>
              <p> Name: {token.user.user_metadata.username}</p>
              <p>Contact Number: {token.user.user_metadata.contact}</p>
              <p>Email: {token.user.user_metadata.email}</p>
              <p>Address: {token.user.user_metadata.address}</p>
              <p>Baranggay Assignment: {token.user.user_metadata.baranggay}</p>
              <button onClick={transformToEdit}>EDIT</button>
          </div>

        ) : (

          <div id='editmode'>
            <form onSubmit={handleSubmit}>
                <div>
                  {/* The labels are there but you can't see them cause their color is white */}
                  <label>Name</label>
                  <input
                    placeholder='Enter username'
                    name='username'
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label>Address</label>
                  <input
                    placeholder='Enter address'
                    name='address'
                    onChange={handleChange}
                  />
                </div>

                <div>
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

                <div>
                  <label>Assigned Baranggay</label>
                  <input
                    placeholder='Enter baranggay'
                    name='baranggay'
                    onChange={handleChange}
                  />
                </div>

                <button type='submit'>
                  SAVE CHANGES
                </button>
              </form>

              <button onClick={transformToEdit}>Cancel</button>
            </div>

        )
      }

      
        
      
      <div>
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <div>
        <button>Retire</button>
      </div>

    </div>
  )
}

export default Account