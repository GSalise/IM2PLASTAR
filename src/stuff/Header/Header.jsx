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
    width: '50px',
    height: 'auto',
  };
  

  const navigate = useNavigate();

  function goToAccPage(){
    navigate('/account');
  }

  if(currentpage === 'homepage'){
    return (
      <div className={styles.header}>
        <section>
          <img style={logostyle} src={logo} alt="Plastar" />
        </section>
        <section className={styles.textSection}>
          <h3>
            Welcome back, {token.user.user_metadata.username}, {token.user.user_metadata.baranggay},{' '}
            {token.user.user_metadata.contact}
          </h3>
        </section>
        <section className={styles.rightAligned}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </section>
        <section>
          <img style={hbmenu} src={hamburger} alt="menu button" onClick={goToAccPage}/>
        </section>
      </div>
    );
  }else if(currentpage === 'account'){
    return(
      <div className={styles.header}>
      <section>
        <img style={logostyle} src={logo} alt="Plastar" />
      </section>
      <section className={styles.textSection}>
        <h3>
          Welcome back, {token.user.user_metadata.username}, {token.user.user_metadata.baranggay},{' '}
          {token.user.user_metadata.contact}
        </h3>
      </section>
      <section className={styles.rightAligned}>
      </section>
      <section>
        <img style={hbmenu} src={hamburger} alt="menu button" onClick={goToAccPage}/>
      </section>
    </div>
    );
  }else if(currentpage === 'borrow'){
    return(
      <div className={styles.header}>
      <section>
        <img style={logostyle} src={logo} alt="Plastar" />
      </section>
      <section className={styles.textSection}>
        <h3>
          Welcome back, {token.user.user_metadata.username}, {token.user.user_metadata.baranggay},{' '}
          {token.user.user_metadata.contact}
        </h3>
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
  }

  
};

export default Header;
