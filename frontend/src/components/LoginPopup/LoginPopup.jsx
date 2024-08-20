import React, { useState,useContext } from 'react'
import { assets } from '../../assets';
import "./LoginPopup.css";
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
const LoginPopup = ({setIsLogin}) => {
    const {setToken,url} = useContext(StoreContext);
    const [currState,setCurrState] = useState("Sign Up");
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setData(data=>({...data,[name]:value}));
    }
    const onLogin = async(e)=>{

        e.preventDefault();

        let new_url = url;

        if(currState === "Login"){
            new_url += "/api/user/login";
        }else{
            new_url += "/api/user/register";
        }

        const resp = await axios.post(new_url,data);
        if(resp.data.success){

            // console.log(resp.data.token);
            setToken(resp.data.token);
            localStorage.setItem("token",resp.data.token);
            setIsLogin(false);
        }else{
            console.log(resp.data.message);
        }
        

    }
  return (
    <div className='login-popup'>

        <form action="" onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img src={assets.cross_icon} onClick={()=>setIsLogin(false)} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState === "Sign Up" ?
                <input type="text" name="name" onChange={ onChangeHandler}
                placeholder='Your name' value={data.name}
                required
                />
                :<></>    
            }
            <input type="text" name="email" onChange={onChangeHandler} placeholder='Your Email'value={data.email} />
            <input type="password" name="password" onChange={onChangeHandler} placeholder='Your Password' value={data.password} />
            </div>

            <button>{currState === "Login" ? 'Login':"Create account"}</button>
            <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required/>
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>
            {
                currState === "Login" ? 
                <p>
                    Create a new account ? <span onClick={()=>setCurrState("Sign Up")}>Click here</span>
                    </p>  :<p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
            }
        </form>
    </div>
  )
}

export default LoginPopup