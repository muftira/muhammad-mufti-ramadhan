import React, { useState } from "react";
import axios from "axios";
import { base_url } from "../Api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${base_url}/register`,
      headers: {
        "content-type": "application/json",
      },
      data: {
        email: email,
        password: password,
        username: username,
      },
    })
      .then((res) => {
        navigate("/todo");
      })
      .catch((error) => console.log(error, "GAGAL"));
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="container-login">
        <p>Create Account</p>
        <p>Username</p>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <p>Password</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <p>Email</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <div>
          <button>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
