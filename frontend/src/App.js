import React from 'react'
import './App.css';
import Header from './components/layout/Header/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home'
import WebFont from 'webfontloader';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products'
import Search from './components/Product/Search'
import LoginSignUp from './components/User/LoginSignUp';
import Profile from './components/User/Profile';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/UserOptions'
import { useSelector } from 'react-redux';
// import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';



function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user)
  //TO LOAD ROBOTO FONT AT FIRST
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });

    store.dispatch(loadUser());
  }, [])


  return (

    <Router>

      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/account" element={<Profile />} />

        {/* 8:44 */}
        {/* TO DO PROTECTED PART FOR AFTER RELOADING ACOOUNT NOT SHOWING */}
        {/* <Route
          exact path="/account"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        /> */}


        <Route exact path="/me/update" element={<UpdateProfile />} />
        {/* //to DO PROTECTED FOR UPDATE PROFILE ROUTE */}


        <Route exact path="/password/update" element={<UpdatePassword />} />
        {/* //to DO PROTECTED FOR UPDATE password ROUTE */}



        <Route exact path="/password/forgot" element={<ForgotPassword />} />
      






      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
