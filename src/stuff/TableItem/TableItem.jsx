import React, { useEffect, useState } from 'react'
import { supabase } from '../../client'
import editpic from '../../assets/edit.svg'
import ModalAddItem from '../Modal/Modal'

const TableItem = () => {
    const [fetchError, setFetchError] = useState(null)
    const [items, setItems] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null); // State for selected item

    const picsize = {
      width: '20px',
      height: 'auto',
    }

    const colsizepic = {
      width: '30px',
    }

    const fetchItems = async () => {
      const {data, error} = await supabase.from('item_t').select()

      if(error){
          setFetchError('Could not fetch')
          setItems(null)
          console.log(error)
      }

      if(data){
        console.log(data)
          setItems(data)
          setFetchError(null)
      }
  }

    useEffect(() => {
        fetchItems()
    }, [])

   
      const select = (item) => {
          setSelectedItem(item); // Set the selected item
      }




  return (
    <div>
      <ModalAddItem selectedItem={selectedItem} refresh={fetchItems}/>
      {fetchError && (<p>{fetchError}</p>)}
      <table className="table table-bordered" style={{width:"1300px"}}>
        <thead>
          <tr>
            <th>Item name</th>
            <th>Category</th>
            <th>Penalty Price</th>
            <th>Status</th>
            <th style={colsizepic}></th>
          </tr>
        </thead>
        <tbody>
          {items && items.map((item) => (
            <tr key={item.itemid}>
              <td>{item.item_name}</td>
              <td>{item.category}</td>
              <td>{item.item_cost}</td>
              <td>{item.status? 'Available' : 'Not Available'}</td>
              <td>
                <button type="button" data-bs-toggle="modal" data-bs-target="#updateModal" style={{border:"none", backgroundColor:"white"}}>
                  <img style={picsize} src={editpic} onClick={() => select(item)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableItem
