import React from 'react';
import styles from './Sidebar.module.css';
import { Link } from 'react-router-dom';
const Sidebar = ({ handleTableSelect }) => {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebar}>
        <button className={styles.sidebarButton} onClick={() => handleTableSelect('items')}>
          Items
        </button>
        <button className={styles.sidebarButton} onClick={() => handleTableSelect('log')}>
          Borrow Log
        </button>
        <button className={styles.sidebarButton} onClick={() => handleTableSelect('borrower')}>
          Borrowers
        </button>
        <Link to= '/borrow'><button className={styles.sidebarButton}>Initiate Borrow</button></Link>
      </div>
    </div>
  );
};

export default Sidebar;
