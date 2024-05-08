import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [email, setEmail] = useState("")
    const { id } = useParams();
    const checkToken = async() => {
        const token = {
            token: id
        }
        const respone = await axios.post('http://localhost:5000/api/user/checkResetToken',token);
        if(respone.data.Email) {
            console.log(respone.data.Email)
            setEmail(respone.data.Email);
        } else {
            window.location.href = '/';
            alert("Code expired")
        }
    }

    const resetPassword = async() => {
        if(password.length < 8) {
            alert("รหัสผ่านต้องมากกว่า 8 หลัก")
            return;
        }
        if(password != cpassword) {
            alert("รหัสผ่านไม่ตรงกัน")
            return;
        }
        const info = {
            Email: email,
            Password: password
        }
        const respone = await axios.post('http://localhost:5000/api/user/Resetpass',info);
        if(respone.data == "Update Password Successfully") {
            window.location.href = '/';
            alert("Reset password success")
        } else {
            window.location.href = '/';
            alert("Something went wrong")
        }
    }

    useEffect(() => {
        checkToken();
    },[])

  return (
    <div>
      <div className="container mt-5 border-1 border p-5 ">
        <h1>Post</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              New Password
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Confirm New Password
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Confirm New Password"
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)}
            />
          </div>
        </form>

        <button
          onClick={() => resetPassword()}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default ResetPassword