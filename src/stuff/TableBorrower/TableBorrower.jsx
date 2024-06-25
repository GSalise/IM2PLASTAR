import React, { useEffect, useState } from 'react'
import { supabase } from '../../client'

const TableBorrower = () => {
    const [fetchError, setFetchError] = useState(null)
    const [Borrower, setBorrower] = useState(null)

    useEffect(() => {
        const fetchBorrower = async () => {
            const {data, error} = await supabase.from('borrower_t').select()

            if(error){
                setFetchError('Could not fetch')
                setBorrower(null)
                console.log(error)
            }

            if(data){
              console.log(data)
                setBorrower(data)
                setFetchError(null)
            }
        }

        fetchBorrower()
    }, [])




  return (
    <div>
      <div></div>
      {fetchError && (<p>{fetchError}</p>)}
      <table className="table table-bordered" style={{width:"1500px"}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Infraction</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Borrower && Borrower.map((borrower) => (
            <tr key={borrower.name}>
              <td>{borrower.name}</td>
              <td>{borrower.contact}</td>
              <td>{borrower.address}</td>
              <td>{borrower.infraction}</td>
              <td>{borrower.is_banned? 'Banned' : 'Not Banned'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableBorrower