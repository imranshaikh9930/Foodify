import { useState } from 'react'
import {Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import MyOrders from './pages/MyOrders/MyOrders';
function App() {
  const [isLogin,setIsLogin] = useState(false);

  return (
    <>
      <ToastContainer/>
    {isLogin ? <LoginPopup setIsLogin={setIsLogin}/> :""}
    <div className='app'>
      <Navbar setIsLogin={setIsLogin}/>
      <Routes>

        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
      </Routes>
  
    
    </div>
    <Footer/>
    </>
  )
}

export default App
