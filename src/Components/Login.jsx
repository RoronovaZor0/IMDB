import React, { useState } from 'react'
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const handleLogin = (e) => {
    e.preventDefault();
    const loggeduser = JSON.parse(localStorage.getItem("user"));
    if(input.email === loggeduser.email && input.password === loggeduser.password)
    {
      navigate("/home")
    }else{
      alert("Please use valid Email & Password")
    }
  };

  return (
    <div>
      <div className='Login bg-cover'
      style={{backgroundImage:`url(https://a-static.besthdwallpaper.com/luffy-gear-5-vs-kaido-dragon-wallpaper-3840x2160-96931_54.jpg)`}}>
        <form onSubmit={handleLogin} action="">
          <div><span>Email</span><br />
          <input name='email' value={input.email} onChange={(e) => setInput({...input,[e.target.name] : e.target.value})} type="email" /></div>
          <div><span>Password</span><br />
          <input name='password' value={input.password} onChange={(e) => setInput({...input,[e.target.name] : e.target.value})} type="password" /></div>
          <button>Login</button> 
          <div><Link to="/">Dont have account? Register</Link></div>
        </form>
      </div>
    </div>
  )
}

export default Login