/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import firedb from '../Firebase';
import "./Login.css"


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const login = () => {
  firedb.child("Academy").once("value", function (snapshot) {
    const data = snapshot.val();

    for (let key in data) {
      if (data[key].email === email && data[key].password === password) {
        
        firedb.child("Academy").child(key).update({ status: 1 });

         localStorage.setItem("userKey", key);

        navigate('/dashboard');
        return;
      }
    }

    alert('Invalid email or password');
  });
};

    function set(e)
    {
      setEmail(e.target.value)
    }

    function set2(e)
    {
      setPassword(e.target.value)
    }
  return (
   <div className="login-container">
    <div className="login-box">
      <h2>Admin Login</h2>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={set}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={set2}
      />

      <button id='b1'  onClick={login}>Login</button>
    </div>
  </div>
  )
}

export default Login;
  
