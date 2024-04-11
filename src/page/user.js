// user.js is a simple component that fetches data from the server and displays it.
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/navbar";

function User() {
    const [check, setCheck] = useState(false);
    const [user, setUser] = useState([]);
    
    const fetchUser = async () => {
        try {
            const response = await axios.get("http://localhost:4000/users");
            setUser(response.data.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (!check) {
            fetchUser();
            setCheck(true);
        }
    }, [check]);

    return (
        <div>
            <Navbar />
        <div className="container mt-5 border-1 border ">
        <div className="contrainer m-2">
          <table className="table text-center ">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
            
              {user &&
                user.map((user, index) => (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        </div>
        </div>
        
      );
}

export default User;
