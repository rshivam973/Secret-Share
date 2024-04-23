import React, { useContext, useEffect, useState } from "react";
import Navi from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from "react-toastify";
const BackendURL = process.env.REACT_APP_BACKEND_URL;
const frontendURL = 'https://secret-share-ebon.vercel.app'

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const DataDisplay = ({ data }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust the format as needed
  };

  return (
    <div>
      {data ? (
        data.map((message) => (
          <div
            key={message._id}
            style={{
              backgroundColor: getRandomColor(),
              padding: "10px",
              margin: "10px",
              borderRadius: "5px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <p>{message.content}</p>
            <br />
            <p>{formatDate(message.timestamp)}</p>
          </div>
        ))
      ) : (
        <p>No messages available.</p>
      )}
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  const { userDetail, setUserDetail, isLoggedIn } = useContext(AuthContext);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await localStorage.getItem("user");
        console.log("user: ", user);
        if(!user) navigate('/login');
        setUser(user);
        const response = await fetch(`${BackendURL}/get-details?email=${user}`);
        if (response.ok) {
          const data = await response.json();
          setUserDetail(data);
          setLoading(false); // Set loading to false after fetching data
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleCopy = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand("copy");

    document.body.removeChild(textArea);

    toast.success("Text copied to clipboard");
  };

  if (loading) {
    return <div className="flex flex-row justify-center items-center text-lg">Loading user details...</div>; // Loader when loading is true
  }

  return (
    <div>
      <Navi />
      {console.log(user)}
      {console.log(userDetail)}
      <div className="w-50 md:mx-40 border-2 flex flex-col md:flex-row md:p-4 justify-center main-div border-indigo-600 mt-2">
        <p>Share your link:</p>
        <br />
        <span>
          secretshare.me/{userDetail.username}
          <button className="ml-2" onClick={() => handleCopy(`${frontendURL}/${userDetail.username}`)}><FontAwesomeIcon icon={faCopy} size="lg" /></button>
        </span>
      </div>
      {userDetail && (
        <div>
          <ul>
            <li>
              <p>Name: {userDetail.Name}</p>
              <p>Email: {userDetail.email}</p>
            </li>
          </ul>
        </div>
      )}

      <div className="">
        {userDetail && userDetail.messages && userDetail.messages.length > 0 ? (
          <DataDisplay data={userDetail.messages} />
        ) : (
          <div className="text-center">
            <p>No messages available.</p>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;