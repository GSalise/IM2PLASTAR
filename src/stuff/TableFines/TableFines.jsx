import React, { useEffect, useState } from 'react'
import { supabase } from '../../client'
import styles from '../TableFines/TableFines.module.css'
import editpic from '../../assets/edit.svg'
import Finemodal from '../Finemodal/Finemodal'

const TableFines = () => {
    const [fetchError, setFetchError] = useState(null);
    const [fines, setFines] = useState(null);
    const [selectedFine, setSelectedFine] = useState(null);
    

    const picsize = {
        width: '20px',
        height: 'auto',
      }
  
      const colsizepic = {
        width: '30px',
    }
    
    const fetchFines = async () => {
        const { data,error } = await supabase.from('fines_t').select()

        if(error){
            setFetchError('Could not fetch');
            setFines(null);
            console.log(error);
        }

        if(data){
            console.log(data);
            setFines(data);
            setFetchError(null)
        }

    }

    useEffect(() => {
        fetchFines()
    }, [])

    const select = (fines) => {
        setSelectedFine(fines);
    }

   




  return (

   
    <div>
          <Finemodal />
        <table className='table table-bordered' style={{width:'1500px'}}>
            <thead>
                <tr>
                    <th>Fine ID</th>
                    <th>Fine</th>
                    <th>Date imposed</th>
                    <th>Status</th>
                    <th>Reason</th>
                    <th style={colsizepic}></th>
                </tr>
            </thead>
            <tbody>
                {fines && fines.map((fine) => (
                    <tr key={fine.fineid}>
                        <td>{fine.fineid}</td>
                        <td>{fine.fine}</td>
                        <td>{fine.date_imposed}</td>
                        <td  style={{color : fine.status === 'paid' ? 'green' : 'red'}}>{fine.status}</td>
                        <td>{fine.reason}</td>
                        <td>
                            <button type='button' style={{border:"none", backgroundColor:"white"}}>
                            <img style={picsize} src={editpic} onClick={() => select(fines)} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default TableFines

