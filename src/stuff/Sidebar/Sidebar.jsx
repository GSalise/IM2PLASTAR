import React from 'react'


const Sidebar=()=>{
  return (
    <div class="d-flex" style={{float: "left"}}>
    <div class="bg-warning" style={{
        backgroundColor: "#ff7300",
         width: "250px",
          height: "100vh",
           padding: "20px",
           }}>
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link text-dark" href="#">Link 1</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-dark" href="#">Link 2</a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-dark" href="#">Link 3</a>
            </li>
        </ul>
    </div>
    </div>
  )
}

export default Sidebar