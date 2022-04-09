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
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/UserOptions.js'
import { useSelector } from 'react-redux';


function App() {
 const {isAuthenticated,user}= useSelector((state)=>state.user)
  //TO LOAD ROBOTO FONT AT FIRST
  React.useEffect(()=>{
         WebFont.load({
           google:{
             families:["Roboto","Droid Sans","Chilanka"]
           }
         });

   store.dispatch(loadUser());      
  },[])


  return (
    
   <Router>

     <Header/>
     {isAuthenticated&& <UserOptions user={user}/>}
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
