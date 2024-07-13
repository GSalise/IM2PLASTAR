import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Homepage.module.css'
import Header from '../../stuff/Header/Header'
import { supabase } from '../../client'
import TableItem from '../../stuff/TableItem/TableItem'
import TableBorrower from '../../stuff/TableBorrower/TableBorrower'
import TableLogsBorrow from '../../stuff/TableLogs/TableLogs'
import Sidebar from '../../stuff/Sidebar/Sidebar'
import TableFines from '../../stuff/TableFines/TableFines'

const Homepage = ({token}) => {
  let navigate = useNavigate()
  function handleLogout(){
    sessionStorage.removeItem('token')
    navigate('/')
  }

  const [items, setItems] = useState([])
  const [activeTable, setActiveTable] = useState('items')



  useEffect(() => {

    getitems()
    
  }, [])

  async function getitems(){
    const { data, error } = await supabase.from('item_t').select()
    setItems(data)
  }


  function handleTableSelect(tableType) {
    setActiveTable(tableType);
  }
  
  

  return (
    <div className={styles.body}>
      <div>
        <Header token={token} handleLogout={handleLogout} currentpage='homepage'/>
        <Sidebar handleTableSelect={handleTableSelect} />
        <div style={{marginLeft:"300px"}}>
          {activeTable === 'items' && <TableItem items={items} />}
          {activeTable === 'log' && <TableLogsBorrow />}
          {activeTable === 'borrower' && <TableBorrower />}
          {activeTable === 'fines' && <TableFines />}
      </div>
    </div>
  </div>
  )
}

export default Homepage