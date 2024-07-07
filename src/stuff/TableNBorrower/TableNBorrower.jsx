import React, { useEffect, useState } from 'react'
import { supabase } from '../../client';

const TableNBorrower = ({ onSelectBorrower }) => {
    const [fetchError, setFetchError] = useState(null);
    const [Borrower, setBorrower] = useState(null);
    const [selectedBorrower, setSelectedBorrower] = useState(null);

    const point = {
        cursor: 'pointer',
    }

    const smallsize = {
        width: '30px',
    }

    const fetchBorrower = async () => {
        const {data, error} = await supabase.from('borrower_t').select().eq('is_banned', false)
  
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
        fetchBorrower();
    }, [])

    const select = (borrower) => {
        setSelectedBorrower(borrower);
        onSelectBorrower(borrower);
    }

    console.log(selectedBorrower)



  return (
    <div>
       <div>
       {fetchError && (<p>{fetchError}</p>)}
        <table className="table table-bordered" style={{width:"1500px"}}>
            <thead>
            <tr>
                <th style={smallsize}>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Address</th>
                <th style={smallsize}>Infraction</th>
            </tr>
            </thead>
            <tbody>
            {Borrower && Borrower.map((borrower) => (
                <tr key={borrower.name}>
                    <td onClick={() => select(borrower)} style={point}>{borrower.borrowerid}</td>
                    <td onClick={() => select(borrower)} style={point}>{borrower.name}</td>
                    <td>{borrower.contact}</td>
                    <td>{borrower.address}</td>
                    <td>{borrower.infraction}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default TableNBorrower
