import React, { useEffect, useState } from 'react';
import { supabase } from '../../client';
import editpic from '../../assets/edit.svg';
import styles from './TableBorrower.module.css';
import ModalBorrower from '../ModalBorrower/ModalBorrower';

const TableBorrower = () => {
  const [fetchError, setFetchError] = useState(null);
  const [Borrower, setBorrower] = useState(null);
  const [selectedBorrower, setSelectedBorrower] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All');

  const fetchBorrower = async () => {
    const { data, error } = await supabase.from('borrower_t').select();

    if (error) {
      setFetchError('Could not fetch');
      setBorrower(null);
      console.log(error);
    }

    if (data) {
      console.log(data);
      setBorrower(data);
      setFetchError(null);
    }
  };

  useEffect(() => {
    fetchBorrower();
  }, []);

  const select = (borrower) => {
    setSelectedBorrower(borrower);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredBorrowers = Borrower?.filter(borrower => {
    const statusMatch = selectedStatus === 'All' || (selectedStatus === 'Banned' && borrower.is_banned) || (selectedStatus === 'Not Banned' && !borrower.is_banned);
    return statusMatch;
  });

  return (
    <div className={styles.tableContainer}>
      <ModalBorrower selectedBorrower={selectedBorrower} refresh={fetchBorrower}/>
      {fetchError && (<p>{fetchError}</p>)}
      <div>
        <label htmlFor="statusFilter" className={styles.filterLabel}>Filter by status:</label>
        <select id="statusFilter" className={styles.selectStatus} onChange={handleStatusChange} value={selectedStatus}>
          <option value="All">All</option>
          <option value="Banned">Banned</option>
          <option value="Not Banned">Not Banned</option>
        </select>
      </div>
      <table className={`table table-bordered ${styles.table}`}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Infraction</th>
            <th>Status</th>
            <th className={styles.colSizePic}></th>
          </tr>
        </thead>
        <tbody>
          {filteredBorrowers && filteredBorrowers.map((borrower) => (
            <tr key={borrower.name}>
              <td>{borrower.name}</td>
              <td>{borrower.contact}</td>
              <td>{borrower.address}</td>
              <td>{borrower.infraction}</td>
              <td>{borrower.is_banned ? 'Banned' : 'Not Banned'}</td>
              <td style={{width:"20px"}}>
                <button type="button" data-bs-toggle="modal" data-bs-target="#updateModalBorrower" className={styles.editButton}>
                  <img className={styles.editIcon} src={editpic} onClick={() => select(borrower)} alt="Edit"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBorrower;