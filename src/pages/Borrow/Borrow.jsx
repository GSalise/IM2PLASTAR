import React, { useEffect, useRef, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { supabase } from '../../client'
import styles from '../Borrow/Borrow.module.css'
import TableNBorrower from '../../stuff/TableNBorrower/TableNBorrower'
import CardItem from '../../stuff/CardItem/CardItem'
import { useNavigate } from 'react-router-dom'
import Header from '../../stuff/Header/Header'

const Borrow = ({ token }) => {
  const [scanResult, setScanResult] = useState(null);
  const [startScan, setStartScan] = useState(false);
  const [currentItem, setCurrentItem] = useState(0); 
  const [scannedItems, setScannedItems] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [fetchedItems, setFetchedItems] = useState([]); 
  const alreadyScannedIDS = useRef([]);
  const [selectedBorrower, setSelectedBorrower] = useState(null);
  const [minDate, setMinDate] = useState('');
  const [dateData, setDateData] = useState({
    start: '',
    end: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const todayDate = `${year}-${month}-${day}`;

    setMinDate(todayDate);
  }, []);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateData({ ...dateData, [name]: value });

    const startDate = new Date(value);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    const formattedEndDate = endDate.toISOString().slice(0, 10);

    setDateData((prev) => ({
      ...prev,
      end: formattedEndDate,
    }));
  };

  function returnHome() {
    navigate('/homepage');
  }

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
              const { data, error } = await supabase
                .from('item_t')
                .select('*')
                .eq('itemid', PureIDofItem);
              if (error) throw error;

              if (data.length === 0) {
                alert('Item not found in the database');
              } else if (data.some((item) => item.status === true)) {
                alert('Item is currently in use');
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
          console.warn(err);
        }
      );
    }

    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [startScan, currentItem]);

  const initiateBorrow = async (e) => {
    e.preventDefault();

    if (!fetchedItems || !dateData.start || !dateData.end || !selectedBorrower) {
      alert('Empty parameters detected. Please fill up everything');
      return;
    }

    for (let i = 0; i < fetchedItems.length; i++) {
      const { data, error } = await supabase.from('borrowinfo_t').insert({
        borrow_start_date: dateData.start,
        borrow_end_date: dateData.end,
        borrowerid: selectedBorrower.borrowerid,
        itemid: fetchedItems[i].itemid,
        isdamaged: false,
      });

      if (error) {
        console.log(error, 'something is wrong');
      }

      if (data) {
        console.log('success', data);
      }

      const { data: itemD, error: itemE } = await supabase
        .from('item_t')
        .update({
          status: true,
        })
        .eq('itemid', fetchedItems[i].itemid);

      if (itemE) {
        console.log(itemE, 'something is wrong');
      }

      if (itemD) {
        console.log('success', itemD);
      }
    }
  };

  return (
    <div>
      <Header token={token} returnHome={returnHome} currentpage='borrow' />
      <h3>Available Borrowers</h3>
      <TableNBorrower onSelectBorrower={setSelectedBorrower} />
      <h2 className={styles['selected-borrower']}>
        Borrower Selected: {selectedBorrower ? selectedBorrower.name : 'None'}
      </h2>
      <div className={styles['scanner-container']}>
        <button
          className={styles.button}
          onClick={() => setStartScan(!startScan)}
        >
          {startScan ? 'End Process' : 'Start Process'}
        </button>
      </div>
      <center>
        <div id="reader" className={styles.reader}></div>
      </center>
      <div>
        {loading && <p className={styles['loading-message']}>Loading item details...</p>}
        {fetchedItems.length > 0 && (
          <div className={styles['scanned-item-container']}>
            <h4>Scanned Item Details</h4>
            <CardItem items={fetchedItems} />
          </div>
        )}
      </div>
      <div className={styles['form-container']}>
        <form>
          <div>
            <label>Start Date</label>
            <input
              type="date"
              name="start"
              value={dateData.start}
              min={minDate}
              onChange={handleDateChange}
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              name="end"
              value={dateData.end}
              min={dateData.start}
              onChange={(e) =>
                setDateData({ ...dateData, end: e.target.value })
              }
            />
          </div>
        </form>
      </div>
      <button className={styles.button} onClick={initiateBorrow}>
        Confirm Borrow?
      </button>
    </div>
  );
};

export default Borrow;
