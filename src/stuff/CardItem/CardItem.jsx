import React from 'react'
import styles from '../CardItem/CardItem.module.css'
import cancel from '../../assets/cancel-svgrepo-com.svg'

const CardItem = ({ items, removeItem }) => {

  const xbutton = {
    width: '50px',
    height: '50px',
  }

  return (
    <div className={styles.cardContainer}>
        {items.map((item, index) =>
        <div className={styles.cardBorrow} key={index}>
            <h2 style={{color:"black"}}>{item.item_name}</h2>
            <p style={{color:"black"}} >Item ID: {item.itemid}</p>
            <p style={{color:"black"}}>Category: {item.category}</p>
            <p style={{color:"black"}}>Penalty Price: {item.item_cost}</p>
            <div>
              <img style={xbutton} src={cancel} alt="remove item" onClick={() => {removeItem(item.itemid);}}/>
            </div>
        </div>
        )}
      
       
    </div>
  )
}
export default CardItem