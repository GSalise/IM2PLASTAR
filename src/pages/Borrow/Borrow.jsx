import React, { useEffect, useState } from "react";

function Borrow() {
  const [scannedCodes, setScannedCodes] = useState([]);
  let barcodeDetected = false;
  let quaggaInitialized = false;

  function initQuagga() {
    if (window.Quagga && !quaggaInitialized) {
      quaggaInitialized = true; // Ensure initialization happens only once
      window.Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#scanner"), // Targeting the element by ID
            constraints: {
              width: 640,
              height: 480,
              facingMode: "environment",
            },
          },
          decoder: {
            readers: ["code_128_reader"], // you can add more readers if needed
          },
        },
        function (err) {
          if (err) {
            console.error("Quagga initialization failed:", err);
            return;
          }
          console.log("Quagga initialization succeeded");
          window.Quagga.start();
        }
      );

      window.Quagga.onDetected(function (result) {
        if (!barcodeDetected) {
          barcodeDetected = true;
          var code = result.codeResult.code;
          console.log("Detected code:", code);
          setScannedCodes((prevCodes) => [...prevCodes, code]);
          setTimeout(() => {
            barcodeDetected = false; // Allow scanning of new barcodes after a short delay
          }, 2000);
        }
      });
    } else {
      console.error("Quagga not loaded or already initialized");
    }
  }

  function Start() {
     document.querySelector(".scaner").style.display="block"
    initQuagga()
   
    }
  function stop() {
   
    window.Quagga.stop();
    document.querySelector(".scaner").style.display="none"
    if (window.Quagga && quaggaInitialized) {
      quaggaInitialized = false; // Reset initialization flag
    }
  }

  useEffect(() => {
    return function cleanup() {
        stop(); // Ensure Quagga stops when component unmounts
      };
  }, []);

  return (
    <div>
      <button onClick={Start}>Start Scanning</button>
      <button onClick={stop}>Stop Scanning</button>
      <h1>Borrow Component</h1>
      <div>
        <h2>Scanned Codes:</h2>
        <ul>
          {scannedCodes.map((code, index) => (
            <li key={index}>{code}</li>
          ))}
        </ul>
      </div>
      <div id="scanner" className="scaner"style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default Borrow;
