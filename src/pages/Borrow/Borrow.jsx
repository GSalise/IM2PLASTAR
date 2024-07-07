import React, { useEffect, useRef, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { supabase } from '../../client'
import styles from '../Borrow/Borrow.module.css'
import TableNBorrower from '../../stuff/TableNBorrower/TableNBorrower'


const Borrow = ({token}) => {
  const [scanResult, setScanResult] = useState(null);
  const [startScan, setStartScan] = useState(false);
  const [currentItem, setCurrentItem] = useState(0); 
  const [scannedItems, setScannedItems] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [fetchedItems, setFetchedItems] = useState([]); 
  const alreadyScannedIDS = useRef([]);


  useEffect(() => {
    let scanner;
    if(startScan){
      scanner = new Html5QrcodeScanner('reader',{
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
        aspectRatio: 1.0,
      });

      scanner.render(async (result) => {
        scanner.clear();
        setScanResult(result);
        setCurrentItem(currentItem + 1);
        setScannedItems([...scannedItems, result]);
        setLoading(true);

        const regex = /^ITEM-ID-(\d+)$/
        const match = result.match(regex)
        if(!match || !match[1]){
          alert('QR Code does not match the expected pattern');
        }else {
          const PureIDofItem = match[1]
          try{
            const { data, error } = await supabase.from('item_t').select('*').eq('itemid', PureIDofItem);
            if (error) throw error;
            console.log(data)
            console.log(alreadyScannedIDS)

            if(data.length === 0){
              alert('Item not found in the database')
            }
            else if(data.some(item => item.status === true)){
              alert('Item is currently in use');
            }
            else if(alreadyScannedIDS.current.includes(PureIDofItem))
            {
              alert('Item has already been scanned');
            }
            else{
              setFetchedItems(prevItems => [...prevItems, ...data]);
              alreadyScannedIDS.current.push(PureIDofItem)
            }

            
            
          }catch (error) {
            console.error('Failed to fetch item: ', error.message);
          }finally{
            setLoading(false)
          }
        }



      }, (err) => {
        //console.warn(err);
      });

    }

    return () => {
      if(scanner) {
        scanner.clear();
        
      }
    }


  }, [startScan, currentItem])


  

  

  

  return (
    <div>
      <TableNBorrower />













      {/* Naa diri ang tig scan */}
      <div>
        <button onClick={() => setStartScan(!startScan)}>{startScan ? 'End Process' : 'Start Process'}</button>
      </div>
      {/* Mao ning kato para scan */}
      <center><div id="reader" style={{width:'500px', height:'auto'}}></div></center> 
      <div>
        {loading && <p>Loading item details...</p>}
        {fetchedItems.length > 0 && (
          <div>
            {/* DIRI MU DISPLAY ANG GI SCAN */}
            <h4>Scanned Item Details</h4>
            <ul>
              {fetchedItems.map((item,index) => (
                <li key={index}>
                  ID: {item.itemid} - Name: {item.item_name} - Category: {item.category} - Penalty Price: {item.item_cost}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button>Confirm Borrow?</button>
      
    </div>
  )
}

export default Borrow
