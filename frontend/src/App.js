import React, { useEffect, useState } from 'react'
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
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './components/Cart/Payment';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements
} from '@stripe/react-stripe-js';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders'
import OrderDetails from './components/Order/OrderDetails'
import Dashboard from './components/Admin/Dashboard'
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from './components/Admin/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder';
import UsersList from './components/Admin/UsersList';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews';
import About from './components/layout/About/About';
import Contact from './components/layout/Contact/Contact';
import NotFound from './components/layout/NotFound/Notfound';



function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");
  const getStripeApiKey = async () => {

    const { data } = await axios.get('/api/v1/stripeapikey');
    setStripeApiKey(data.stripe_api_key);
  }

  //TO LOAD ROBOTO FONT AT FIRST
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, [])

  window.addEventListener("contextmenu", (e) => e.preventDefault());
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

        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/cart" element={<Cart />} />



        {/* protected route */}
        <Route exact path="/shipping" element={<Shipping />} />


        {/* protected route */}



        {/* make protected route */}
        {stripeApiKey && (
          <Route
            exact
            path="/process/payment"
            element={(
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            )}
          />
        )}


        {/* protected route */}
        <Route exact path="/success" element={<OrderSuccess />} />

        {/* protected route */}
        <Route exact path="/orders" element={<MyOrders />} />



        {/* protected route */}
        <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        <Route exact path="/order/:id" element={<OrderDetails />} />

        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />

        {/****************************************************** ADMIN----ROUTES ********************************************/}
        <Route exact path="/admin/dashboard" element={<Dashboard />} />
        <Route exact path="/admin/products" element={<ProductList />} />
        <Route exact path="/admin/product" element={<NewProduct />} />
        <Route exact path="/admin/product/:id" element={<UpdateProduct />} />
        <Route exact path="/admin/orders" element={<OrderList />} />
        <Route exact path="/admin/order/:id" element={<ProcessOrder />} />
        <Route exact path="/admin/users" element={<UsersList />} />
        <Route exact path="/admin/user/:id" element={<UpdateUser />} />
        <Route exact path="/admin/reviews" element={<ProductReviews />} />

        <Route exact path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
