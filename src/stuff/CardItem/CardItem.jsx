import React from 'react';
import styles from '../CardItem/CardItem.module.css';
import cancel from '../../assets/cancel-svgrepo-com.svg';

const CardItem = ({ items, removeItem, mode }) => {
  const xbutton = {
    width: '50px',
    height: '50px',
  };
  console.log(items)
  if (mode === 'borrow') {
    return (
      <div className={styles.cardContainer}>
        {items.map((item, index) =>
          <div className={styles.cardBorrow} key={index}>
            <h2 style={{ color: "black" }}>{item.item_name}</h2>
            <p style={{ color: "black" }}>Item ID: {item.itemid}</p>
            <p style={{ color: "black" }}>Category: {item.category}</p>
            <p style={{ color: "black" }}>Penalty Price: {item.item_cost}</p>
            <div>
              <img style={xbutton} src={cancel} alt="remove item" onClick={() => { removeItem(item.itemid); }} />
            </div>
          </div>
        )}
      </div>
    );
  } else if (mode === 'retrieve') {
    return (
      <div className={styles.cardContainer}>
        {items.map((item, index) => {
          // Log the borrow_end_date for each item
           //console.log(item);
          return (
            <div className={styles.cardBorrow} key={index}>
              <h2 style={{ color: "black" }}>{item.item_t.item_name}</h2>
              <p style={{ color: "black" }}>Item ID: {item.itemid}</p>
              <p style={{ color: "black" }}>Category: {item.item_t.category}</p>
              <p style={{ color: "black" }}>Start_date: {item.borrow_start_date}</p>
              <p style={{ color: "black" }}>End_date: {item.borrow_end_date}</p>
              <p style={{ color: "black" }}>Penalty Price: {item.item_t.item_cost}</p>
              <p style={{ color: "black" }}>Borrow ID: {item.borrowid}</p>
              <div>
                <img style={xbutton} src={cancel} alt="remove item" onClick={() => { removeItem(item.itemid); }} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default CardItem;