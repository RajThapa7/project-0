import React,{useState} from 'react'
import "../App.css"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
export default function LoginClient() {
  const [item, setItem] = useState({email:'', password:''})
  const [error,setError] = useState('');

  let navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
		setItem({ ...item, [input.name]: input.value });
	};
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const url = "http://localhost:5000/login_client";
      const token = await axios.post(url, {...item});
      localStorage.setItem("accessToken", token);
      navigate('/Home')
        } catch (error) {
      if ( 
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
    ) {
        setError(error.response.data.msg);
    }
    }   
  
};
  return (
    <div className="outer-form-container">
<div className="inner-container">
      <h3 style={{textAlign: "center"}}>Login User</h3>

    <form method="POST" onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor="email">Email</label>
        <input type="Email" name="email" id="email" value={item.email} onChange={handleChange} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" value={item.password} onChange={handleChange}/>
        <input type="submit" value="Login"/>
    </form>
</div>
{error && <p>{error}</p>} 
    </div>
  )
}
