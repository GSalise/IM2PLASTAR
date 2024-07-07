import React, { useEffect, useState, useRef } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'

const Borrow = () => {
  const [scanResult, setScanResult] = useState(null)
  const scannerRef = useRef(null)
  const [scanning, setScanning] = useState(false)

  useEffect(() => {
    if (scanning && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner('reader', {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      })

      const success = (decodedText, decodedResult) => {
        setScanResult(decodedText)
        scannerRef.current.clear()
          .then(() => setScanning(false))
          .catch(error => console.error('Failed to clear the scanner:', error))
      }

      const error = (err) => {
        console.warn('QR code parse error, error =', err)
      }

      scannerRef.current.render(success, error)
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear()
          .catch(error => console.error('Failed to clear the scanner:', error))
        scannerRef.current = null
      }
    }
  }, [scanning])

  const startScanning = () => {
    setScanResult(null)
    setScanning(true)
  }

  const cancelScanning = () =>{
    if(scannerRef.current){
      scannerRef.current.clear()
          .then(() => setScanning(false))
          .catch(error => console.error('Failed to clear the scanner:', error))
    }
  }

  return (
    <div>
      <button onClick={startScanning} disabled={scanning}>
        {scanning ? 'Scanning...' : 'Start Scanning'}
      </button>
      {scanning && (
        <button onClick={cancelScanning} style={{marginLeft: '10px'}}>
          Abort Scan
        </button>
      )}
      <div>
      {scanResult
        ? <div>Success: {scanResult}</div>
        : <div id='reader'></div>
      }
      </div>
      
    </div>
  )
}

export default Borrow
