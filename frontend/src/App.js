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
} from "react-router-dom";
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products.js'
import Search from './components/Product/Search.js'
import LoginSignUp from './components/User/LoginSignUp';


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
     <Route exact path ="/product/:id" element={<ProductDetails/>} />
     <Route exact path ="/products" element={<Products/>} />
     <Route exact path ="/products/:keyword" element={<Products/>} />
     <Route exact path ="/search" element={<Search/>} />
     <Route exact path ="/login" element={<LoginSignUp/>} />
     
    
     </Routes>
     <Footer/>
   </Router> 
   
  );
}

export default App;
