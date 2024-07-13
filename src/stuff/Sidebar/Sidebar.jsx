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
        <button className={styles.sidebarButton} onClick={() => handleTableSelect('fines')}>
          Fines
        </button>
        <Link to= '/borrow' className={styles.noUnderline}><button className={styles.sidebarButton}>Initiate Borrow</button></Link>
        <Link to= '/retrieve' className={styles.noUnderline}><button className={styles.sidebarButton}>Initiate Retrieve</button></Link>
      </div>
    </div>
  );
};

export default Sidebar;
