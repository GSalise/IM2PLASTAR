import React, { useEffect, useState } from 'react'
import { supabase } from '../../client'
import editpic from '../../assets/edit.svg'
import ModalAddItem from '../Modal/Modal'

const TableItem = () => {
    const [fetchError, setFetchError] = useState(null)
    const [items, setItems] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('All') // State for selected category
    const [selectedStatus, setSelectedStatus] = useState('All') // State for selected status

    const picsize = {
      width: '20px',
      height: 'auto',
    }

    const colsizepic = {
      width: '30px',
    }

    const fetchItems = async () => {
      const { data, error } = await supabase.from('item_t').select()

      if (error) {
        setFetchError('Could not fetch')
        setItems(null)
        console.log(error)
      }

      if (data) {
        console.log(data)
        setItems(data)
        setFetchError(null)
      }
    }

    useEffect(() => {
      fetchItems()
    }, [])

    const select = (item) => {
      setSelectedItem(item) // Set the selected item
    }

    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value) // Set the selected category
    }

    const handleStatusChange = (event) => {
      setSelectedStatus(event.target.value) // Set the selected status
    }

    const filteredItems = items?.filter(item => {
      const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory
      const statusMatch = selectedStatus === 'All' || (selectedStatus === 'Available' && item.status) || (selectedStatus === 'Not Available' && !item.status)
      return categoryMatch && statusMatch
    })

  return (
    <div>
      <ModalAddItem selectedItem={selectedItem} refresh={fetchItems}/>
      {fetchError && (<p>{fetchError}</p>)}
      <div>
          <select onChange={handleCategoryChange} value={selectedCategory}>
            <option value="All">Category</option>
            <option value="tools">Tools</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="equipment">Equipment</option>
            {/* Add more categories as needed */}
          </select>
          <select onChange={handleStatusChange} value={selectedStatus}>
            <option value="All">Status</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
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
        {filteredItems && filteredItems.map((item) => (
              <tr key={item.itemid}>
                <td>{item.item_name}</td>
                <td>{item.category}</td>
                <td>{item.item_cost}</td>
                <td>{item.status ? 'Not Available' : 'Available'}</td>
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