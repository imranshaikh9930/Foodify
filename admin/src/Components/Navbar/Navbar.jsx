import React from 'react'
// import {logo} from "../../assets/logo";
import {assets} from "../../assets/assets";
import "./Navbar.css";
// import { assets } from '../../assets';
const Navbar = () => {
  return (
     <div className='navbar'>
       <img src={assets.logo} alt="" className="logo" />
      <img src={assets.profile_image} alt="" className="profile" />
        
    </div>
  )
}

export default Navbar