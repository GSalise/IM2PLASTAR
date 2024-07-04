import React, { useEffect, useState } from 'react'
import { supabase } from '../../client'
import editpic from '../../assets/edit.svg'
import ModalBorrower from '../ModalBorrower/ModalBorrower'

const TableBorrower = () => {
    const [fetchError, setFetchError] = useState(null)
    const [Borrower, setBorrower] = useState(null)
    const [selectedBorrower, setSelectedBorrower] = useState(null);

    const picsize = {
      width: '20px',
      height: 'auto',
    }

    const colsizepic = {
      width: '30px',
    }

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
  
    useEffect(() => {
        fetchBorrower()
    }, [])

    const select = (borrower) => {
      setSelectedBorrower(borrower); // Set the selected item
  }
  


  return (
    <div>
      <ModalBorrower selectedBorrower={selectedBorrower} refresh={fetchBorrower}/>
      {fetchError && (<p>{fetchError}</p>)}
      <table className="table table-bordered" style={{width:"1500px"}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Infraction</th>
            <th>Status</th>
            <th style={colsizepic}></th>
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
              <td>
                <button type="button" data-bs-toggle="modal" data-bs-target="#updateModalBorrower" style={{border:"none", backgroundColor:"white"}}>
                  <img style={picsize} src={editpic} onClick={() => select(borrower)}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableBorrower