import { supabase } from "../../client";
import React, { useEffect, useState } from 'react'

const TableLogsBorrow = () => {
    const [fetchError, setFetchError] = useState(null)
    const [LogsBorrow, setLogsBorrow] = useState(null)

    useEffect(() => {
        const fetchLogsBorrow = async () => {
            const {data, error} = await supabase.from('borrowinfo_t').select(`borrowid,borrower_t (name), item_t(item_name),borrow_start_date,borrow_end_date, item_status`)

            if(error){
                setFetchError('Could not fetch')
                setLogsBorrow(null)
                console.log(error)
            }

            if(data){
                console.log(data)
                setLogsBorrow(data)
                setFetchError(null)
            }
        }

        fetchLogsBorrow()
    }, [])




  return (
    <div>
      {fetchError && (<p>{fetchError}</p>)}
      <table className="table table-bordered" style={{width:"1500px"}}>
        <thead>
          <tr>
            <th>Start date</th>
            <th>End date</th>
            <th>Borrower</th>
            <th>Item</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {LogsBorrow && LogsBorrow.map((LogsBorrow) => (
            <tr key={LogsBorrow.borrowid}>
              <td>{LogsBorrow.borrow_start_date}</td>
              <td>{LogsBorrow.borrow_end_date}</td>
              <td>{LogsBorrow.borrower_t.name}</td>
              <td>{LogsBorrow.item_t.item_name}</td>
              <td>{LogsBorrow.item_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableLogsBorrow