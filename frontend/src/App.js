import "./App.css";
import { useEffect, useState } from "react";
import Header from "./components/layout/Header/Header.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import About from "./components/layout/About/About";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import UserList from "./components/Admin/UserList.js";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/product/:id" element={<ProductDetails/>} />
        <Route exact path="/products" element={<Products/>} />
        <Route exact path="/products/:keyword" element={<Products/>} />

        <Route exact path="/search" element={<Search/>} />

        <Route exact path="/about" element={<About/>} />

        <Route exact path="/account" element={isAuthenticated?<Profile/>:<Navigate to='/login'/>}
        /> 
  
        <Route exact path='/me/update' element={isAuthenticated?<UpdateProfile/>:<Navigate to='/login'></Navigate>}></Route>
        

        <Route  exact path="/password/update" element={isAuthenticated?<UpdatePassword/>:<Navigate to='/login'/>}/>

        <Route exact path="/password/forgot" element={<ForgotPassword/>} />

        <Route exact path="/password/reset/:token" element={<ResetPassword/>} />

        <Route exact path="/login" element={<LoginSignUp/>} />

        <Route exact path="/cart" element={<Cart/>} />

        <Route exact path='/admin/dashboard' element={user && user.role==='admin'?<Dashboard/>:<Navigate to='/login'/>}/>

        <Route exact path='/admin/products' element={user && user.role==='admin'?<ProductList/>:<Navigate to='/login'/>}/>
       
        <Route exact path='/admin/product' element={user && user.role==='admin'?<NewProduct/>:<Navigate to='/login'/>}/>
        
        <Route exact path='/admin/product/:id' element={user && user.role==='admin'?<UpdateProduct/>:<Navigate to='/login'/>}/>
        
        <Route exact path='/admin/users' element={user && user.role==='admin'?<UserList/>:<Navigate to='/login'/>}/>
        
        <Route exact path='/admin/user/:id' element={user && user.role==='admin'?<UpdateUser/>:<Navigate to='/login'/>}/>
        
        <Route exact path='/admin/reviews' element={user && user.role==='admin'?<ProductReviews/>:<Navigate to='/login'/>}/>


      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
