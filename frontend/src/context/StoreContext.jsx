import { createContext,useEffect,useState } from "react";
import { menu_list } from "../assets";
import { food_list } from "../assets";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = ({children})=>{
    const url = "https://foodify-backend-u86r.onrender.com";
    const [food_lists,setFoodLists] = useState([]);
    const [token, setToken] = useState("")
    const [cartItems,setCartItems] = useState({});
    const currency = "₹";
    const deliveryCharge = 50;
    
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/addToCart", { itemId }, { headers: { token } });
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
         if (token) {
             await axios.post(url + "/api/cart/removeCart", { itemId }, { headers: { token } });
         }
    } 

    const loadCartData  = async(token)=>{
        const resp = await axios.post(url+"api/cart/getCartItem",{},{headers:token});
        setCartItems(resp.data.cartData);

    }
    
    const getTotalPrice = ()=>{
        let totalAmount = 0;
        for(const item in  cartItems){

            let itemInfo = food_lists.find((p)=> p._id === item);

            
            totalAmount +=itemInfo.price * cartItems[item];
        }
        return totalAmount;
    }

    const fetchFoodList = async()=>{

        const resp = await axios.get(`${url}/api/food/list`);
        setFoodLists(resp.data.data);
    }

    useEffect(()=>{
        const token = localStorage.getItem("token");

        const renderFoodList = async()=>{
            await fetchFoodList();
            if(token){
                setToken(token);
                await loadCartData({token:localStorage.getItem("token")});
            }
        }
        renderFoodList();
        

    },[])
    const contextValue = {
        menu_list,
        food_lists,
        url,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalPrice,
        deliveryCharge,
        currency,
        setToken,token
    }
    return (

        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
