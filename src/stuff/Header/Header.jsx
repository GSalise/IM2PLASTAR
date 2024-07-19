import React from 'react';
import styles from './Header.module.css';
import logo from '../../assets/PLASTAR.svg';
import hamburger from '../../assets/hamburg.svg';
import { useNavigate } from 'react-router-dom';

const Header = ({ token, handleLogout, currentpage, returnHome }) => {
  const logostyle = {
    width: '350px',
    height: 'auto',
  };

  const hbmenu = {
    width: '100px',
    height: 'auto',
    padding: '15px',
  };

  const navigate = useNavigate();

  function goToAccPage() {
    navigate('/account');
  }

  if (currentpage === 'homepage') {
    return (
      <div className={styles.header}>
        <section className={styles.logoSection}>
          <img style={logostyle} src={logo} alt="Plastar" />
        </section>
        <section className={styles.menuSection}>
          <img style={hbmenu} src={hamburger} alt="menu button" onClick={goToAccPage} />
        </section>
      </div>
    );
  } else if (currentpage === 'account') {
    return (
      <div className={styles.header}>
        <section className={styles.logoSection}>
          <img style={logostyle} src={logo} alt="Plastar" />
        </section>
        <section className={styles.textSection}>
        </section>
        <section className={styles.rightAligned}>
        </section>
        <section>
          <button className={styles.logoutButton} onClick={returnHome}>
            Return
          </button>
        </section>
      </div>
    );
  } else if (currentpage === 'borrow') {
    return (
      <div className={styles.header}>
        <section className={styles.logoSection}>
          <img style={logostyle} src={logo} alt="Plastar" />
        </section>
        <section>
        </section>
        <section>
        </section>
        <section>
          <button className={styles.logoutButton} onClick={returnHome}>
            Return
          </button>
        </section>
      </div>
    );
  }
};

export default Header;
