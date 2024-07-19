import React, { useEffect, useState } from 'react';
import { supabase } from '../../client';
import styles from './TableFines.module.css';
import editpic from '../../assets/edit.svg';
import Finemodal from '../Finemodal/Finemodal';

const TableFines = () => {
  const [fetchError, setFetchError] = useState(null);
  const [fines, setFines] = useState([]);
  const [selectedFine, setSelectedFine] = useState(null);

  const fetchFines = async () => {
    try {
      const { data, error } = await supabase.from('fines_t').select();

      if (error) {
        throw error;
      }

      setFines(data || []);
      setFetchError(null);
    } catch (error) {
      setFetchError('Could not fetch fines.');
      setFines([]);
      console.error(error.message);
    }
  };

    useEffect(() => {
        fetchFines()
    }, [])

    const select = (fine) => {
        setSelectedFine(fine);
    }

    console.log(selectedFine)

   




  return (

   
    <div className={styles.tableContainer}>
        <Finemodal refresh={fetchFines} selectedFine={selectedFine}/><br></br>
        <table  className={`table table-bordered table-hover ${styles.table}`} style={{width:"90%"}} >
            <thead>
                <tr>
                    <th>Fine ID</th>
                    <th>Fine</th>
                    <th>Date imposed</th>
                    <th>Status</th>
                    <th>Reason</th>
                    <th></th>
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
                            <button type='button' data-bs-toggle="modal" data-bs-target="#fineEDIT" style={{border:"none", backgroundColor:"white"}}>
                            <img className={styles.smallsize} src={editpic} onClick={() => select(fine)} />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default TableFines;
