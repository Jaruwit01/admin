import React, { useState, useEffect } from "react";
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

    // Function to format date as dd/mm/yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5 border-1 border ">
                <div className="container m-2">
                    <table className="table text-center ">
                        <thead>
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phonenumber</th>
                                <th scope="col">Date of Birth</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user &&
                                user.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.Email}</td>
                                        <td>{user.Name}</td>
                                        <td>{user.Phonenumber}</td>
                                        <td>{formatDate(user.DateofBirth)}</td>
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
