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
                setItems(data)
                setFetchError(null)
            }
        }

        fetchItems()
    }, [])




  return (
    <div>
      {fetchError && (<p>{fetchError}</p>)}
      {items && (
        <div className='itemdisplay'>
            {items.map((item) => (
              <li key={item.item_name}>{item.item_name}</li>
            ))}
        </div>

      )}
    </div>
  )
}

export default TableItem
