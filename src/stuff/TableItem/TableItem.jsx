import React, { useEffect, useState } from 'react'
import { supabase } from '../../client'

const TableItem = () => {
    const [fetchError, setFetchError] = useState(null)
    const [items, setItems] = useState(null)

    useEffect(() => {
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

        fetchItems()
    }, [])




  return (
    <div>
      {fetchError && (<p>{fetchError}</p>)}
      <table>
        <thead>
          <tr>
            <th>Item name</th>
            <th>Category</th>
            <th>Penalty Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items && items.map((item) => (
            <tr key={item.item_name}>
              <td>{item.item_name}</td>
              <td>{item.category}</td>
              <td>{item.item_cost}</td>
              <td>{item.status? 'Available' : 'Not Available'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableItem
