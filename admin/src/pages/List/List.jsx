import React, { useEffect, useState } from 'react'
import "./List.css";
import axios from "axios";
import { url,currency } from '../../assets/assets';
import { useAsyncValue } from 'react-router-dom';
const List = () => {
    const [list,setList ] = useState([]);

    const fetchList = async()=>{
            try {
                const resp = await axios.get(`${url}/api/food/list`);
                // console.log(resp);
                if(resp.data.success){
                    setList(resp.data.data);
                }        
            } catch (error) {
                console.log(error);
                
                
            }
        
    }

    const removeFood = async(foodId)=>{
        try {
            const res = await axios.post(`${url}/api/food/remove`,{
                id:foodId
            });

            await fetchList();

            if(res.data.success){
                console.log(res.data.message);
            }
        } catch (error) {
                console.log(error);
        }
    }

    useEffect(()=>{
        fetchList();
    },[])
  return (
    <div className='list add flex-col'>
        <p>All Food List</p>
        <div className="list-table">
            <div className="list-table-format title">
                <b>Image</b>
                <b>Name</b>
                <b>Category</b>
                <b>Price</b>
                <b>Action</b>
            </div>
            {
                list.map((item,index)=>{
                 
                    return (
                        <div key={index} className="list-table-format">
                            <img src={`${url}/images/`+item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{currency}{item.price}</p>
                            <p className="cursor" onClick={()=>removeFood(item._id)}>X</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default List