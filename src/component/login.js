import React, { useState } from "react";
import axios from "axios";
import { base_url } from "../Api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${base_url}/login`,
      headers: {
        "content-type": "application/json",
      },
      data: {
        password: password,
        username: username,
      },
    })
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        navigate("/todo");
      })
      .catch((error) => console.log(error, "GAGAL"));
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="container-login">
        <p>Login</p>
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
        <div>
          <button>Login</button>
        </div>
        <div>
          <p>
            Don't have any account yet ?{" "}
            <button onClick={() => navigate("/register")}>Register</button>{" "}
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
