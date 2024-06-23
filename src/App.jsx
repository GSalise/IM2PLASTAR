import React, { useEffect, useState } from 'react'
import { Signup, Login, Homepage } from './pages'
import {Routes, Route} from 'react-router-dom'


const App = () => {

  const [token, setToken] = useState(false)


  if(token){
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }

  }, [])


  return (
    <div>
      <Routes>
          <Route path={'/signup'} element={<Signup />} />
          <Route path={'/'} element={<Login setToken={setToken}/>} />
          {token?<Route path={'/homepage'} element={<Homepage token={token}/>} />:""}
      </Routes>
      
    </div>
  )
}

export default App