import React from 'react'
import './App.css';
import Header from './components/layout/Header/Header'
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home.js'
import WebFont from 'webfontloader';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {

  //TO LOAD ROBOTO FONT AT FIRST
  React.useEffect(()=>{
         WebFont.load({
           google:{
             families:["Roboto","Droid Sans","Chilanka"]
           }
         })
  },[])


  return (
   
   <Router>

     <Header/>
     <Routes>

     <Route exact path ="/" element={<Home/>} />
    
     </Routes>
     <Footer/>
   </Router> 
   
  );
}

export default App;
