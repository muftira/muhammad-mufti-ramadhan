import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../Api";

function ListName({ data, setData, token }) {
  const [item, setItem] = useState();
  const [selectedCheck, setSelectedCheck] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
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
  }, [token]);

  const handleDelete = (id) => {
    axios({
      method: "DELETE",
      url: `${base_url}/checklist/${id}`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        fetchData();
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

  const handleItem = (id) => {
    axios({
      method: "POST",
      url: `${base_url}/checklist/${id}/item`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        itemName: item,
      },
    })
      .then((res) => {})
      .catch((error) => console.log(error, "GAGAL"));

    axios({
      method: "GET",
      url: `${base_url}/checklist/${id}/item`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error, "GAGAL"));
  };

  const handleDeleteItem = (nameId, itemId) => {
    axios({
      method: "DELETE",
      url: `${base_url}/checklist/${nameId}/item/${itemId}`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => fetchData())
      .catch((error) => console.log(error, "GAGAL"));

    axios({
      method: "GET",
      url: `${base_url}/checklist/${nameId}/item`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error, "GAGAL"));
  };

  const handleUpdate = (nameId, items) => {
    setItem(items.name);

    axios({
      method: "PUT",
      url: `${base_url}/checklist/${nameId}/item/${items.id}`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        fetchData();
        setSelectedItem(items.id);
      })
      .catch((error) => console.log(error, "GAGAL"));
  };

  const handleRename = (e, nameId, itemId) => {
    e.preventDefault();
    axios({
      method: "PUT",
      url: `${base_url}/checklist/${nameId}/item/rename/${itemId}`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        itemName: item,
      },
    })
      .then((res) => {
        setSelectedItem(null);
        fetchData();
      })
      .catch((error) => console.log(error, "GAGAL"));
    setItem("");

    axios({
      method: "PUT",
      url: `${base_url}/checklist/${nameId}/item/${itemId}`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        fetchData();
      })
      .catch((error) => console.log(error, "GAGAL"));
  };

  return (
    <div>
      {data
        ? data.data.map((list, i) => (
            <p key={list.id}>
              {list.name}
              <button onClick={() => handleDelete(list.id)}>Delete</button>
              <button onClick={() => setSelectedCheck(i)}>
                {list.checklistCompletionStatus ? "Rename Items" : "Add Items"}
              </button>
              <div>
                {selectedCheck === i && (
                  <form
                    onSubmit={
                      list.checklistCompletionStatus
                        ? (e) => handleRename(e, list.id, selectedItem)
                        : () => handleItem(list.id)
                    }
                  >
                    <input
                      value={item}
                      onChange={(e) => setItem(e.target.value)}
                      type="text"
                    />
                    <button>
                      {list.checklistCompletionStatus ? "Rename" : "Add"}
                    </button>
                  </form>
                )}

                <div>
                  <ul>
                    {list.items
                      ? list.items.map((item) => (
                          <li key={item.id}>
                            <p>
                              {item.name}{" "}
                              <button
                                onClick={() =>
                                  handleDeleteItem(list.id, item.id)
                                }
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => handleUpdate(list.id, item)}
                              >
                                Update
                              </button>
                            </p>
                          </li>
                        ))
                      : null}
                  </ul>
                </div>
              </div>
            </p>
          ))
        : null}
    </div>
  );
}

export default ListName;
