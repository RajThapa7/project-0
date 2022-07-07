import { useState, useEffect, useContext } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditJob from "./editJob";
import { IdContext } from "../App";
export default function Job() {
  const { id } = useContext(IdContext);
  const { setId } = useContext(IdContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [item, setItem] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const url = "https://mern-app-12345.herokuapp.com/jobs";
        await axios.get(url).then((res) => {
          setData(res.data);
        });
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    }
    fetchData();
  }, []);
  const deleteItem = async (item) => {
    // e.preventDefault();
    try {
      const url = `https://mern-app-12345.herokuapp.com/jobs/${item}`;
      await axios.delete(url);
      window.location.reload();
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleEdit = () => {
    navigate("/editJob");
  };

  const handleLogout = async () => {
    const url = "https://mern-app-12345.herokuapp.com/logout";
    await axios.get(url).then((res) => {
      console.log(res);
    });
    navigate("/");
  };
  console.log(data);
  return (
    <div>
      <button
        onClick={() => {
          handleLogout();
        }}
      >
        LogOut
      </button>
      <button onClick={() => navigate("/addJob")}>Add New Job</button>

      {data.map((item) => {
        return (
          <div key={item.index}>
            <p>Company:{item.company}</p>
            <p>Position: {item.position}</p>
            <p>Status: {item.status}</p>
            <button
              onClick={() => {
                setId(item._id);
                handleEdit();
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteItem(item._id);
              }}
            >
              Delete
            </button>
            <br />
          </div>
        );
      })}

      {error && <p>{error}</p>}
    </div>
  );
}
