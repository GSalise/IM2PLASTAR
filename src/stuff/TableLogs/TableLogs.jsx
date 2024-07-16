import { supabase } from "../../client";
import React, { useEffect, useState } from 'react';

const TableLogsBorrow = ({mode, onselectLog}) => {
    const [fetchError, setFetchError] = useState(null);
    const [LogsBorrow, setLogsBorrow] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [filter, setFilter] = useState('all');
    

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);

    const [borrowInfo,setsBorrowInfo]=useState(null);

    const select = (log) =>{
        setsBorrowInfo(log);
        onselectLog(log)
    }

    



    useEffect(() => {
        const fetchLogsBorrow = async () => {
            const { data, error } = await supabase.from('borrowinfo_t').select(`borrowid,borrower_t (name), item_t(item_name),borrow_start_date,borrow_end_date, item_status, fineid`);

            if (error) {
                setFetchError('Could not fetch');
                setLogsBorrow([]);
                console.log(error);
            }

            if (data) {
                console.log(data);
                await supabase.from('borrowinfo_t').update({
                    item_status: 'not returned'
                }).eq('item_status', 'ongoing').lt('borrow_end_date', formattedDate);

                // Sort data by borrow_start_date in descending order
                const sortedData = data.sort((a, b) => new Date(b.borrow_start_date) - new Date(a.borrow_start_date));
                setLogsBorrow(sortedData);
                setFilteredLogs(sortedData);
                setFetchError(null);
            }
        };

        fetchLogsBorrow();
    }, []);

    useEffect(() => {
        filterLogs();
    }, [filter, LogsBorrow]);

    const filterLogs = () => {
        if (filter === 'all') {
            setFilteredLogs(LogsBorrow);
        } else {
            const filtered = LogsBorrow.filter(log => log.item_status === filter);
            setFilteredLogs(filtered);
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };
    if (mode === 'Fines') {
        return (
            <div>
                {fetchError && (<p>{fetchError}</p>)}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>End Date</th>
                            <th>Borrower</th>
                            <th>Item</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLogs && filteredLogs.map((log) => (
                            <tr key={log.borrowid} onClick={() => select(log)}>
                                <td>{log.borrow_end_date}</td>
                                <td>{log.borrower_t.name}</td>
                                <td>{log.item_t.item_name}</td>
                                <td style={{ color: log.item_status === 'ongoing' ? 'blue' : log.item_status === 'on time' ? 'green' : log.item_status === 'late' ? 'orange' : 'red' }}>
                                    {log.item_status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }else{
    return (
        <div>
            {fetchError && (<p>{fetchError}</p>)}
            <div>
                <label htmlFor="filter">Filter by status: </label>
                <select id="filter" value={filter} onChange={handleFilterChange}>
                    <option value="all">All</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="late">Late</option>
                    <option value="on time">Ontime</option>
                    <option value="not returned">Not returned</option>
                </select>
            </div>
            <table className="table table-bordered" style={{ width: "1500px" }}>
                <thead>
                    <tr>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Borrower</th>
                        <th>Item</th>
                        <th>Status</th>
                        <th>Fine ID</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredLogs && filteredLogs.map((log) => (
                        <tr key={log.borrowid}>
                            <td>{log.borrow_start_date}</td>
                            <td>{log.borrow_end_date}</td>
                            <td>{log.borrower_t.name}</td>
                            <td>{log.item_t.item_name}</td>
                            <td style={{ color: log.item_status === 'ongoing' ? 'blue' : log.item_status === 'on time' ? 'green' : log.item_status === 'late' ? 'orange' : 'red' }}>
                                {log.item_status}
                            </td>
                            <td>{log.fineid === null ? 'No fines' : log.fineid}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    }
};

export default TableLogsBorrow;