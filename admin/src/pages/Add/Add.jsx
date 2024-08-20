import React,{useState} from 'react'
import { assets, url } from '../../assets/assets'
import "./Add.css";
import axios from 'axios';
const Add = () => {
    const [image, setImage] = useState(false);
    const [data,setData] = useState({
        name:'',
        description:"",
        price:"",
        category:"Salad"
    })

    const onSubmitHandler = async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price",Number(data.price));
        formData.append("category",data.category);
        formData.append("image",image);

        const resp = await axios.post(`${url}/api/food/add`,formData);

        if(resp.data.success){
            console.log(resp.data.message);
            setData({
                name:'',
                description:"",
                price:"",
                category:data.category
            });
            setImage(false)
        }else{
            console.log(resp.data.message);
            
        }

    }

    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({...data,[name]:value}));
    }
  return (
    <div className='add'>
        <form className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <input  onChange={(e) => { setImage(e.target.files[0]); e.target.value = '' }} type="file" accept='image/*' id='image' hidden />
                <label htmlFor="image">
                    <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                </label>
            </div>

            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input name="name" type="text" placeholder='Type here'required value={data.name} onChange={onChangeHandler} />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Write content here' required />
            </div>

            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Food Category</p>
                    <select name="category" id="" onChange={onChangeHandler}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input type="Number" name="price" placeholder='25' value={data.price} onChange={onChangeHandler} />
                </div>

            </div>

            <button type='submit' className='add-btn'>ADD</button>
        </form>
    </div>
  )
}

export default Add