import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import { storage } from "../config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// function Post() {
//   const [title, setTitle] = useState("");
//   const [pic, setPic] = useState("");
//   const [detial, setDetial] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [check, setCheck] = useState(false);
//   const fetchPost = async () => {
//     try {
//         const response = await axios.get("http://localhost:4000/posts");
//         setPosts(response.data.data);
//         console.log(response.data);
//     } catch (error) {
//         console.error(error);
//     }
// };
// useEffect(() => {
//     if (!check) {
//         fetchPost();
//         setCheck(true);
//     }
// }, [check]);

//   const submit = async () => {
//     try {
//       const info = {
//         date: new Date().toISOString(),
//         title: title,
//         pic: pic,
//         detial: detial,
//       };
//       const response = await axios.post("http://localhost:4000/posts", info);
//       if (response.data === "success") {
//         console.log("success");
//         resetForm();
//         fetchPost();
//       } else {
//         console.log("fail");
//       }
//     } catch (error) {
//       console.log(error, "createInformation");
//     }
//   };
//   const resetForm = () => {
//     setTitle("");
//     setPic("");
//     setDetial("");
//   };
//   const deletePost = async (postId) => {
//     try {
//       const response = await axios.delete(`http://localhost:4000/posts/${postId}`);
//       console.log(response.data);
//       fetchPost(); // Fetch posts after successful deletion
//     } catch (error) {
//       console.error(error);
//     }
//   };
function Post() {
  const [title, setTitle] = useState('');
  const [pic, setPic] = useState('');
  const [detail, setDetail] = useState('');
  const [posts, setPosts] = useState([]);
  const [check, setCheck] = useState(false);
  const fileInputRef = useRef(null);

  // Fetch posts from MongoDB
  const fetchPost = async () => {
    try {
      const response = await axios.get('http://localhost:4000/posts');
      setPosts(response.data.data);
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
      if (!pic) {
        console.log('Please select a file.');
        return;
      }

      const storageRef = ref(storage, `images/${pic.name}`);
      const uploadTask = uploadBytesResumable(storageRef, pic);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // progress function
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const info = {
            date: new Date().toISOString(),
            title: title,
            pic: downloadURL, // use the download URL from Firebase Storage
            detail: detail,
          };
          console.log(info);
          const response = await axios.post('http://localhost:4000/posts', info);
          if (response.data === 'success') {
            resetForm();
            fetchPost();
          } else {
            console.log('Fail');
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDetail('');
    setPic('');
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset file input value to empty string
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/posts/${postId}`);
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
              Picture
            </label>
            <input
              ref={fileInputRef}
              className="form-control"
              type="file"
              placeholder="pic"
              onChange={(e) => setPic(e.target.files[0])} // ใช้ e.target.files[0] เพื่อดึงไฟล์ที่ผู้ใช้เลือก
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Detail
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="detail"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
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
                <th scope="col">Date</th>
                <th scope="col">Title</th>
                <th scope="col">Pic</th>
                <th scope="col">Detial</th>
              </tr>
            </thead>
            <tbody>
              {posts &&
                posts.map((post, index) => (
                  <tr key={index}>
                    <td>{new Date().toLocaleDateString()}</td>
                    <td>{post.title}</td>
                    {/* showe link img from fireabase */}
                    <td>
                      <img src={post.pic} alt="pic" style={{ width: '100px' }} />
                    </td>
                    <td>{post.detail}</td>
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