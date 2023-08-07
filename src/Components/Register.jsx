import React, { useState } from 'react'
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: ""
  });

  // to store value in localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(input));
    navigate("/login");
  };

  

  return (
    <div className='grid'>
      <div className='nika'><img src="https://images5.alphacoders.com/131/1317711.jpeg" alt="" /></div>
      <div className='register'>
        <form onSubmit={handleSubmit} action="">
          <div><span>Name</span><br />
          <input name='name' value={input.name} onChange={(e) => setInput({...input,[e.target.name] : e.target.value})} type="text" /></div>
          <div><span>Email</span><br />
          <input name='email' value={input.email} onChange={(e) => setInput({...input,[e.target.name] : e.target.value})}type="email" /></div>
          <div><span>Password</span><br />
          <input name='password' value={input.password} onChange={(e) => setInput({...input,[e.target.name] : e.target.value})} type="password" /></div>
          <button>Register</button>
          <Link to="/login"><p className=''>Already have an account? <span>Login</span></p></Link>
        </form>
      </div>
    </div>
  )
}

export default Register