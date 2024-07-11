import { supabase } from "../../client";
import React, { useEffect, useState } from 'react'

const TableLogsBorrow = () => {
    const [fetchError, setFetchError] = useState(null)
    const [LogsBorrow, setLogsBorrow] = useState(null)

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate); 

    useEffect(() => {
        const fetchLogsBorrow = async () => {
            const { data, error } = await supabase.from('borrowinfo_t').select(`borrowid,borrower_t (name), item_t(item_name),borrow_start_date,borrow_end_date, item_status`)

            if (error) {
                setFetchError('Could not fetch')
                setLogsBorrow(null)
                console.log(error)
            }

            if (data) {
                console.log(data)
                await supabase.from('borrowinfo_t').update({
                  item_status: 'not returned'
                }).eq('item_status', 'ongoing').lt('borrow_end_date', formattedDate)

                // Sort data by borrow_start_date in descending order
                const sortedData = data.sort((a, b) => new Date(b.borrow_start_date) - new Date(a.borrow_start_date))
                setLogsBorrow(sortedData)
                setFetchError(null)
            }
        }

        fetchLogsBorrow()
    }, [])

    return (
        <div>
            {fetchError && (<p>{fetchError}</p>)}
            <table className="table table-bordered" style={{ width: "1500px" }}>
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
