import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Homepage.module.css'
import Header from '../../stuff/Header/Header'
import { supabase } from '../../client'
import TableItem from '../../stuff/TableItem/TableItem'

const Homepage = ({token}) => {
  let navigate = useNavigate()

  function handleLogout(){
    sessionStorage.removeItem('token')
    navigate('/')
  }

  const [items, setItems] = useState([])

  useEffect(() => {

    getitems();

  }, []);

  async function getitems(){
    const { data, error } = await supabase.from('item_t').select()
    setItems(data)
  }
    
  

  return (
    <div className={styles.body}>
    <div>
      <Header />
      <h3>Welcome back, {token.user.user_metadata.username}, {token.user.user_metadata.baranggay}, {token.user.user_metadata.contact}</h3>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <TableItem />
      </div>
    </div>
  </div>
  )
}

export default Homepage
