import React from 'react'
import Header from '../../stuff/Header/Header'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase, supabaseAD } from '../../client';
import { useEffect } from 'react';
import Deleteacc from '../../stuff/ModalAcc/Deleteacc'
const Account = ({ token }) => {
  const [name, setName] = useState('');
  const [cntct, setCntct] = useState('');
  const [addrs, setAddrs] = useState('');
  const [brgy, setBrgy] = useState('');

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setName(userData.username || '');
      setCntct(userData.contact || '');
      setAddrs(userData.address || '');
      setBrgy(userData.baranggay || '');
    } else {
    
      setName(token.user.user_metadata.username);
      setCntct(token.user.user_metadata.contact);
      setAddrs(token.user.user_metadata.address);
      setBrgy(token.user.user_metadata.baranggay);
    }

  }, []);

 

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
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: {
          username: formData.username,
          contact: formData.contact,
          baranggay: formData.baranggay,
          address: formData.address,
        },
      });

    localStorage.setItem('userData', JSON.stringify({
      username: formData.username,
      contact: formData.contact,
      address: formData.address,
      baranggay: formData.baranggay,
    }));

    windows.location.reload();

    } catch (error) {
      console.log('out', error)
      
    }
    
  }

  

 
  function returnHome() {
    navigate('/homepage');
  }

  function handleLogout(){
    sessionStorage.removeItem('token')
    localStorage.clear();
    navigate('/')
  }

  const transformToEdit = () => {
    setEditMode(!editMode);
  }

  async function handleDelete(e){
    e.preventDefault();


    try {

      const { data, error } = await supabaseAD.auth.admin.deleteUser(
        token.user.id
      );  
      handleLogout();

    } catch (error) {
      console.log(error);
    }

  }


  return (
    <div>
      <Header returnHome={returnHome} currentpage='account'/>
      <p>Account Details</p>

      {
        !editMode ? (
        
          <div id='accDetails'>
              <p> Name: {name}</p>
              <p>Contact Number: {cntct}</p>
              <p>Email: {token.user.user_metadata.email}</p>
              <p>Address: {addrs}</p>
              <p>Baranggay Assignment: {brgy}</p>
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
        <Deleteacc onDelete={handleDelete} />
        {/* <button onClick={handleDelete}>Retire</button> */}
      </div>

    </div>
  )
}

export default Account