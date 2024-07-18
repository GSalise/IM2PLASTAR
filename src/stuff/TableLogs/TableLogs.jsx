import React, { useEffect, useState } from 'react';
import { supabase } from "../../client";
import styles from './TableLogs.module.css';

const TableLogsBorrow = ({ mode, onselectLog }) => {
    const [fetchError, setFetchError] = useState(null);
    const [logsBorrow, setLogsBorrow] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [filter, setFilter] = useState('all');

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);

    const point = {
        cursor: 'pointer',
    }

    const [borrowInfo,setsBorrowInfo]=useState(null);

    const select = (log) => {
        onselectLog(log);
    }

    useEffect(() => {
        const fetchLogsBorrow = async () => {
            try {
                const { data, error } = await supabase.from('borrowinfo_t').select(`borrowid,borrower_t (name), item_t(item_name),borrow_start_date,borrow_end_date, item_status, fineid`);

                if (error) {
                    throw new Error('Could not fetch');
                }

                if (data) {
                    await supabase.from('borrowinfo_t').update({
                        item_status: 'not returned'
                    }).eq('item_status', 'ongoing').lt('borrow_end_date', formattedDate);

                    const sortedData = data.sort((a, b) => new Date(b.borrow_start_date) - new Date(a.borrow_start_date));
                    setLogsBorrow(sortedData);
                    setFilteredLogs(sortedData);
                    setFetchError(null);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
                setFetchError('Could not fetch');
                setLogsBorrow([]);
            }
        };

        fetchLogsBorrow();
    }, []);

    useEffect(() => {
        filterLogs();
    }, [filter, logsBorrow]);

    const filterLogs = () => {
        if (mode === 'Fines') {
            
            const filtered = logsBorrow.filter(log => (log.item_status === 'late' || log.item_status === 'not returned') && log.fineid === null);
            setFilteredLogs(filtered);
        } else {
            if (filter === 'all') {
                setFilteredLogs(logsBorrow);
            } else {
                const filtered = logsBorrow.filter(log => log.item_status === filter);
                setFilteredLogs(filtered);
            }
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
                            <tr key={log.borrowid} onClick={() => select(log)} style={point}>
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
        <div className={styles["table-container"]}>
            {fetchError && (<p>{fetchError}</p>)}
            <div className={`filters ${styles.filters}`}>
                <label htmlFor="filter" className={styles["filter-label"]}>Filter by status: </label>
                <select id="filter" value={filter} onChange={handleFilterChange} className={`form-select ${styles.filter}`}>
                    <option value="all">All</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="late">Late</option>
                    <option value="on time">On time</option>
                    <option value="not returned">Not returned</option>
                </select>
            </div>
            <table className={`table table-bordered ${styles.table}`}>
                <thead>
                    <tr>
                        {mode === 'Fines' ? (
                            <>
                                <th>End Date</th>
                                <th>Borrower</th>
                                <th>Item</th>
                                <th>Status</th>
                            </>
                        ) : (
                            <>
                                <th>Start date</th>
                                <th>End date</th>
                                <th>Borrower</th>
                                <th>Item</th>
                                <th>Status</th>
                                <th>Fine ID</th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {filteredLogs.map((log) => (
                        <tr key={log.borrowid} onClick={() => select(log)}>
                            {mode === 'Fines' ? (
                                <>
                                    <td>{log.borrow_end_date}</td>
                                    <td>{log.borrower_t.name}</td>
                                    <td>{log.item_t.item_name}</td>
                                    <td style={{ color: log.item_status === 'ongoing' ? 'blue' : log.item_status === 'on time' ? 'green' : log.item_status === 'late' ? 'orange' : 'red' }}>
                                        {log.item_status}
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{log.borrow_start_date}</td>
                                    <td>{log.borrow_end_date}</td>
                                    <td>{log.borrower_t.name}</td>
                                    <td>{log.item_t.item_name}</td>
                                    <td style={{ color: log.item_status === 'ongoing' ? 'blue' : log.item_status === 'on time' ? 'green' : log.item_status === 'late' ? 'orange' : 'red' }}>
                                        {log.item_status}
                                    </td>
                                    <td>{log.fineid === null ? 'No fines' : log.fineid}</td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
}

export default TableLogsBorrow;
