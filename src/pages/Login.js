/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import firedb from "../Firebase";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = () => {
    if (email === "" || password === "") {
      alert("Please enter email and password");
      return;
    }

    firedb.child("Academy").once("value", (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        alert("No Admin Found");
        return;
      }

      let found = false;

      for (let key in data) {
        if (
          data[key].email == email &&
          data[key].password == password
        ) {
          found = true;

          firedb
            .child("Academy")
            .child(key)
            .update({
              status: 1,
            });

          localStorage.setItem("userKey", key);

          navigate("/dashboard");
          break;
        }
      }

      if (!found) {
        alert("Invalid Email or Password");
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login}>
          Login
        </button>

      </div>
    </div>
  );
}

export default Login;