import React, { useEffect, useState } from 'react'
import { supabase } from '../../client';
import styles from './TableNBorrower.module.css';

const TableNBorrower = ({ onSelectBorrower }) => {
    const [fetchError, setFetchError] = useState(null);
    const [Borrower, setBorrower] = useState(null);
    const [selectedBorrower, setSelectedBorrower] = useState(null);

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
        <div className={styles["table-container"]}>
            {fetchError && (<p>{fetchError}</p>)}
            <table className={`table table-bordered ${styles.table}`}>
                <thead>
                    <tr>
                        <th className={styles.smallsize}>ID</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th className={styles.smallsize}>Infraction</th>
                    </tr>
                </thead>
                <tbody>
                    {Borrower && Borrower.map((borrower) => (
                        <tr key={borrower.name}>
                            <td onClick={() => select(borrower)} className={styles.pointer}>{borrower.borrowerid}</td>
                            <td onClick={() => select(borrower)} className={styles.pointer}>{borrower.name}</td>
                            <td>{borrower.contact}</td>
                            <td>{borrower.address}</td>
                            <td>{borrower.infraction}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableNBorrower
