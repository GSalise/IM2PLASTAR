import React from 'react'


const Sidebar=()=>{
  return (
    <div className="d-flex" style={{float: "left"}}>
    <div className="bg-warning" style={{
        backgroundColor: "#ff7300",
         width: "250px",
          height: "100vh",
           padding: "20px",
           }}>
        <button>Link 1</button>
        <button>Link 2</button>
    </div>
    </div>
  )
}

export default Sidebar