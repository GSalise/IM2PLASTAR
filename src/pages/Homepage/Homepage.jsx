import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Homepage.module.css'
import Header from '../../stuff/Header/Header'
import { supabase } from '../../client'
import TableItem from '../../stuff/TableItem/TableItem'
import TableBorrower from '../../stuff/TableBorrower/TableBorrower'
import TableLogsBorrow from '../../stuff/TableLogs/TableLogs'
import Sidebar from '../../stuff/Sidebar/Sidebar'

const Homepage = ({token}) => {
  let navigate = useNavigate()

  function handleLogout(){
    sessionStorage.removeItem('token')
    navigate('/')
  }

  const [items, setItems] = useState([])

  const [showTable, setShowTable] = useState(false)

  useEffect(() => {

    getitems();

  }, []);

  async function getitems(){
    const { data, error } = await supabase.from('item_t').select()
    setItems(data)
  }

  const toggleTable = () => {
    setShowTable(!showTable)
  }
    
  

  return (
    <div className={styles.body}>
    <div>
      <Header />
      <Sidebar/>
      <div style={{marginLeft:"300px"}}>
      <h3>Welcome back, {token.user.user_metadata.username}, {token.user.user_metadata.baranggay}, {token.user.user_metadata.contact}</h3>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={toggleTable}>Switch View</button>
      <div>
        {/* {showTable? (
          <TableItem />
        ) : (
          <TableBorrower />
        )} */}
        <TableLogsBorrow />
      </div>
    </div>
  </div>
  </div>
  )
}

export default Homepage
