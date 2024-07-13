import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { supabase } from '../../client';
import styles from '../Borrow/Borrow.module.css';
import CardItem from '../../stuff/CardItem/CardItem';
import { useNavigate } from 'react-router-dom';
import Header from '../../stuff/Header/Header';

const Retrieve = ({ token }) => {
  const [scanResult, setScanResult] = useState(null);
  const [startScan, setStartScan] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const [scannedItems, setScannedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchedItems, setFetchedItems] = useState([]);
  const alreadyScannedIDS = useRef([]);
  const navigate = useNavigate();
 
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  function returnHome() {
    navigate('/homepage');
  }


  // Scanner part of code
  useEffect(() => {
    let scanner;
    if (startScan) {
      scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 2,
        aspectRatio: 1.0,
      });


      scanner.render(
        async (result) => {
          scanner.clear();
          setScanResult(result);
          setCurrentItem(currentItem + 1);
          setScannedItems([...scannedItems, result]);
          setLoading(true);

          const regex = /^ITEM-ID-(\d+)$/;
          const match = result.match(regex);
          if (!match || !match[1]) {
            alert('QR Code does not match the expected pattern');
          } else {
            const PureIDofItem = match[1];
            try {
              // const { data, error } = await supabase
              // .from('item_t')
              // .select('itemid, item_name, category, item_cost, status, borrowinfo_t(borrowid, borrow_start_date, borrow_end_date, item_status)')
              // .eq('itemid', PureIDofItem)
              const { data, error } = await supabase.from('borrowinfo_t')
              .select('borrowid, borrow_start_date, borrow_end_date, item_status, itemid, item_t(item_name, category, item_cost, status)')
              .eq('itemid', PureIDofItem)
              .or('item_status.eq.ongoing, item_status.eq.not returned')
              
              if (error) throw error;
              console.log(data);

              if (data.length === 0) {
                alert('Item is not being borrowed');

              } else if (alreadyScannedIDS.current.includes(PureIDofItem)) {
                alert('Item has already been scanned');

              } else {
                setFetchedItems((prevItems) => [...prevItems, ...data]);
                alreadyScannedIDS.current.push(PureIDofItem);

              }

            } catch (error) {
              console.error('Failed to fetch item: ', error.message);

            } finally {
              setLoading(false);

            }
          }
        },
        (err) => {
        }
      );
    }

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };

  }, [startScan, currentItem]);


  if(fetchedItems.map(item => item.borrow_end_date) > formattedDate){
    console.log('early: ', fetchedItems.map(item => item.borrow_end_date))
  }else if(fetchedItems.map(item => item.borrow_end_date) < formattedDate){
    console.log('late', fetchedItems.map(item => item.borrow_end_date))
  }
  

  const initiateRetrieve = async (e) => {
    e.preventDefault();

    if (!fetchedItems) {
      alert('Empty parameters detected. Please fill up everything');
      return;
    }
    // if (!selectedItemStatus) {
    //     alert('Please select an item status');
    //     return;
    // }
     
    if (fetchedItems.length === 0) {
      alert('Please scan at least one item.');
      return; // Exit the function early if no items are scanned
    }

    
    for (let i = 0; i < fetchedItems.length; i++) {

      const { data, error } = await supabase.from('borrowinfo_t').update({
        item_status: fetchedItems[i].borrow_end_date > formattedDate ? 'on time' : 'late', 
      }).eq('borrowid', fetchedItems[i].borrowid)

      if (error) {
        console.log(error, 'something is wrong');
      }

      if (data) {
        console.log('success', data);
      }


      const { data: itemD, error: itemE } = await supabase
        .from('item_t')
        .update({
          status: false,
        })
        .eq('itemid', fetchedItems[i].itemid);

      if (itemE) {
        console.log(itemE, 'something is wrong');
      }

      if (itemD) {
        console.log('success', itemD);
      }
 
    }
    
    alert('Retrieval Success!');
    window.location.reload();

  };
  const removeItemFromFetchedItems = (itemIdToRemove) => {
    setFetchedItems(prevItems => prevItems.filter(item => item.itemid !== itemIdToRemove));
    console.log('test:', fetchedItems)
  };  
  return (
    <div className={styles.container}>
      <Header token={token} returnHome={returnHome} currentpage='borrow' />
      <div className='container'>
    <p>Select status type</p>
    <div className="d-flex">
        test
    </div>
</div>

      <div className={styles['scanner-container']}>
        <button
          className={styles.button}
          onClick={() => setStartScan(!startScan)}
        >
          {startScan ? 'End Process' : 'Start Process'}
        </button>
      </div>
      <div id="reader" className={styles.reader}></div>
      {loading && <p className={styles['loading-message']}>Loading item details...</p>}
      {fetchedItems.length > 0 && (
        <div className={styles['scanned-item-container']}>
          <h4>Scanned Item Details</h4>
          <CardItem items={fetchedItems} removeItem={removeItemFromFetchedItems} mode='retrieve' />
        </div>
      )}
      <button className={styles.button} onClick={initiateRetrieve}>
        Confirm Retrieval?
      </button>
    </div>
  );
};

export default Retrieve;
