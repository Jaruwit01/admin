import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";

function Post() {
  const [title, setTitle] = useState("");
  const [pic, setPic] = useState("");
  const [detial, setDetial] = useState("");
  const [posts, setPosts] = useState([]);
  const [check, setCheck] = useState(false);
  const fetchPost = async () => {
    try {
        const response = await axios.get("http://localhost:4000/posts");
        setPosts(response.data.data);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};
useEffect(() => {
    if (!check) {
        fetchPost();
        setCheck(true);
    }
}, [check]);

  const submit = async () => {
    try {
      const info = {
        title: title,
        pic: pic,
        detial: detial,
      };
      const response = await axios.post("http://localhost:4000/posts", info);
      if (response.data === "success") {
        console.log("success");
        resetForm();
      } else {
        console.log("fail");
      }
    } catch (error) {
      console.log(error, "createInformation");
    }
  };
  const resetForm = () => {
    setTitle("");
    setPic("");
    setDetial("");
  };
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/posts/${postId}`);
      console.log(response.data);
      fetchPost(); // Fetch posts after successful deletion
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container mt-5 border-1 border p-5 ">
        <h1>Post</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              className="form-control"
              type="file"
              placeholder="pic"
              value={pic}
              onChange={(e) => setPic(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="detial"
              value={detial}
              onChange={(e) => setDetial(e.target.value)}
            />
          </div>
        </form>

        <button
          onClick={() => submit()}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </div>
      <div className="container mt-5 border-1 border ">
        <div className="contrainer m-2">
          <table className="table text-center ">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Pic</th>
                <th scope="col">Detial</th>
              </tr>
            </thead>
            <tbody>
              {posts &&
                posts.map((post, index) => (
                  <tr key={index}>
                    <td>{post.title}</td>
                    <td>{post.pic}</td>
                    <td>{post.detial}</td>
                    <td>
                      <button
                        onClick={() => deletePost(post._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
        </div>
    </div>
  );
}

export default Post;
