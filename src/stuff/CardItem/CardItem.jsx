import React from 'react'
import styles from '../CardItem/CardItem.module.css'

const CardItem = ({ items }) => {
  return (
    <div className={styles.cardContainer}>
        {items.map((items, index) =>
        <div className={styles.cardBorrow} key={index}>
            <h2 style={{color:"black"}}>{items.item_name}</h2>
            <p style={{color:"black"}} >Item ID: {items.itemid}</p>
            <p style={{color:"black"}}>Category: {items.category}</p>
            <p style={{color:"black"}}>Penalty Price: {items.item_cost}</p>
        </div>
        )}
      
       
    </div>
  )
}
export default CardItem