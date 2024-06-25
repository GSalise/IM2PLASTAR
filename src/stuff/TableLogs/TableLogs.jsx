import { supabase } from "../../client";
import React, { useEffect, useState } from 'react'

const TableLogsBorrow = () => {
    const [fetchError, setFetchError] = useState(null)
    const [LogsBorrow, setLogsBorrow] = useState(null)

    useEffect(() => {
        const fetchLogsBorrow = async () => {
            const {data, error} = await supabase.from('borrowinfo_t').select()

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
            <tr key={LogsBorrow.borrow_start_date}>
              <td>{LogsBorrow.borrow_start_date}</td>
              <td>{LogsBorrow.borrow_end_date}</td>
              <td>{LogsBorrow.borrowerid}</td>
              <td>{LogsBorrow.itemid}</td>
              <td>{LogsBorrow.isdamaged? 'Banned' : 'Not Banned'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableLogsBorrow