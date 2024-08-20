import React, { useContext } from 'react'
import "./ExploreMenu.css";
// import { storeContext } from '../../context/StoreContext';
import { menu_list } from '../../assets';
const ExploreMenu = ({category,setCategory}) => {

    // const {menu_list} = useContext(storeContext)
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore  our menu</h1>
        <p className="explore-menu-text">Choose from a diverse menu</p>
        <div className="explore-menu-list">
            {menu_list.map((item,index)=>{
                return (
                    <div key={index} onClick={()=>setCategory(prev=>prev === item.menu_name ? "All":item.menu_name)} className='explore-menu-list-item'>
                        <img src={item.menu_image} className={category === item.menu_name ? "active":""} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default ExploreMenu