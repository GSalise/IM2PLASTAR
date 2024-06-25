import React from 'react'


const Sidebar=({handleTableSelect})=>{
  return (
    <div className="d-flex" style={{float: "left"}}>
    <div className="bg-warning" style={{
        backgroundColor: "#ff7300",
         width: "250px",
          height: "100vh",
           padding: "20px",
           }}>
        <button onClick={() => handleTableSelect('items')}>Items</button>
        <button onClick={() => handleTableSelect('log')}>Borrow Log</button>
        <button onClick={() => handleTableSelect('borrower')}>Borrowers</button>
        <button>Inititate Borrow</button>
    </div>
    </div>
  )
}

export default Sidebar