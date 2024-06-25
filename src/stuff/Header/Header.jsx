import React from 'react'
import styles from './Header.module.css'
import logo from '../../assets/PLASTAR.svg'
import hamburger from '../../assets/hamburg.svg'

const Header = ({token , handleLogout}) => {

    const logostyle = {
        width: '350px',
        height: 'auto',
    }

    const hbmenu = {
        width: '50px',
        height: 'auto',
    }

  return (
    <div className={styles.header}>
     <section>
        <img style={logostyle} src={logo} alt='Plastar' />
     </section>
     <section className={styles.textSection}>
     <h3>Welcome back, {token.user.user_metadata.username}, {token.user.user_metadata.baranggay}, {token.user.user_metadata.contact}</h3>
     </section>
     <section>
      <button onClick={handleLogout}>Logout</button>
     </section>
     <section>
        <img style={hbmenu} src={hamburger} alt='menu button' />
     </section>
    </div>
  )
}

export default Header
