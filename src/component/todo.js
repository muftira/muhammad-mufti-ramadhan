import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { base_url } from "../Api";
import ListName from "./listName";

function Todo() {
  const [data, setData] = useState();
  const [name, setName] = useState();
  const navigate = useNavigate();
  const [token, setToken] = useState();

  useEffect(() => {
    const _token = localStorage.getItem("token");
    if (_token) {
      setToken(_token);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) return;
    axios({
      method: "POST",
      url: `${base_url}/checklist`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: name,
      },
    })
      .then((res) => {
        fetchData();
        setName("");
      })
      .catch((error) => console.log(error, "GAGAL"));
  };

  function fetchData() {
    axios({
      method: "GET",
      url: `${base_url}/checklist`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error, "GAGAL"));
  }

  return (
    <div className="container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <p>TO DO LIST</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <button>Add</button>
      </form>
      <div>
        <ListName data={data} setData={setData} token={token} />
      </div>
      <div>
        <button onClick={() => navigate("/")}>Logout</button>
      </div>
    </div>
  );
}

export default Todo;
