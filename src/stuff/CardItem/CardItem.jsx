import React from 'react'
import styles from '../CardItem/CardItem.module.css'

const CardItem = ({ items }) => {
  return (
    <div className={styles.cardContainer}>
        {items.map((items, index) =>
        <div className={styles.cardBorrow} key={index}>
            <h2>{items.item_name}</h2>
            <p>Item ID: {items.itemid}</p>
            <p>Category: {items.category}</p>
            <p>Penalty Price: {items.item_cost}</p>
        </div>
        )}
      
       
    </div>
  )
}
export default CardItem