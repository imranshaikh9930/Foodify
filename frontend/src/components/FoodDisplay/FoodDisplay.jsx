import React, { useContext } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FooItem/FoodItem'
import { StoreContext } from '../../context/StoreContext';
import { food_list } from '../../assets';

const FoodDisplay = ({category}) => {

  const {food_lists} = useContext(StoreContext);

  // console.log(food_lists);
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {food_lists.map((item)=>{
          if (category==="All" || category===item.category) {
            return <FoodItem key={item._id} image={item.image} name={item.name} desc={item.description} price={item.price} id={item._id}/>
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
