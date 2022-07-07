import './App.css';
import React, {createContext, useState} from 'react'
import Intro from './components/intro';
import {BrowserRouter as Router, Routes,Route, Switch} from 'react-router-dom'
import Client from './components/client';
import Technician from './components/technician';
import RegisterClient from './components/RegisterClient';
import LoginClient from './components/LoginClient';
import Home from './components/Home';
export const IdContext = createContext();
function App() {
  const [id, setId] = useState('')
  return (
    <IdContext.Provider value={{id, setId}}>
{/* <Routes>
<Route path="/Home" element={<Home/>}/>
<Route path="/client/login" element={<LoginClient/>}/>    
<Route path="/client/register" element={<RegisterClient/>}/>
<Route path="/technician" element={<Technician/>}/>
<Route path="/client" element={<Client/>}/>
<Route path="/" element={<Intro/>}/>    
</Routes> */}
<Home />
    </IdContext.Provider>

 );
}

export default App;
