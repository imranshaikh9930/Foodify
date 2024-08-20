import React,{useContext,useEffect, useState} from 'react'
import { NavLink ,useNavigate} from 'react-router-dom'
import "./Navbar.css";
// import basket from "../../assets/basket_icon.png";
// import profile from "../../assets/profile_icon.png";
import { assets } from '../../assets';
import { StoreContext } from '../../context/StoreContext';
const Navbar = ({setIsLogin}) => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState("home");
    // const [token,setToken] = useState(true);
    const {cartItems,getTotalPrice,token,setToken} = useContext(StoreContext);

   

    const logout = ()=>{
        console.log("Click")
        localStorage.removeItem("token");
        setToken("");
        navigate('/')
    }
  return (
    <div className='navbar'>
    <NavLink to='/'><img className='logo' src={assets.logo} alt="" /></NavLink>
    <ul className="navbar-menu">
      <a to="/" onClick={() => setMenu("home")} className={`${menu === "home" ? "active" : ""}`}>home</a>
      <a href='#explore-menu' onClick={() => setMenu("menu")} className={`${menu === "menu" ? "active" : ""}`}>menu</a>
      <a href='#app-download' onClick={() => setMenu("mob-app")} className={`${menu === "mob-app" ? "active" : ""}`}>mobile app</a>
      <a href='#footer' onClick={() => setMenu("contact")} className={`${menu === "contact" ? "active" : ""}`}>contact us</a>
    </ul>
    <div className="navbar-right">
      <img src={assets.search_icon} alt="" />
      <NavLink to='/cart' className='navbar-search-icon'>
        <img src={assets.basket_icon} alt="" />
        <div className={getTotalPrice() > 0 ? "dot" : ""}></div>
      </NavLink>
      {!token ? <button onClick={() => setIsLogin(true)}>sign in</button>
        : <div className='navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className='navbar-profile-dropdown'>
            <li onClick={()=>navigate('/myorders')}> <img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
            <hr />
            <li onClick={logout}> <img src={assets.logout_icon} alt="" /> <p>Logout</p></li> 
          </ul>
        </div>
      }

    </div>
  </div>
  )
}

export default Navbar