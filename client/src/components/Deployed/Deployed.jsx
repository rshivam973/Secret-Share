import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navi from "../Navbar/Navbar";
import "./Deployed.css";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from "react-toastify";


const Deployed = ({ username }) => {
  const [messageContent, setMessageContent] = useState("");
  const [usernameExists, setUsernameExists] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (messageContent.trim() === "") {
      toast.warning("Please enter some message.");
      return; // Exit the function
    }

    const messageData = {
      content: messageContent,
    };

    try {
      const response = await fetch(`/send-message/${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        setMessageContent("");
        toast.success("Message sent successfully!");
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error");
    }
  };

  useEffect(()=>{
    const checkUsername = async () => {
      try {
        const response = await fetch(`/check-user/${username}`); // Replace with your endpoint
        console.log(response);
        if (response.status === 404) {
          // Username not found in the database
          setUsernameExists(false); // Set usernameExists to false
        }
      } catch (error) {
        console.error(error);
        toast.error("Internal Server Error");
      }
    };

    checkUsername();

  },[username]);

  return (
    <div>
      <Navi />

      {usernameExists ? ( // Conditionally render based on usernameExists
        <div className="centered-container">
          <h2 className="text-2xl font-mono text-gray-500 text-center">
            Send messages to {username}
          </h2>
          <form className="centered-form my-3">
            <label htmlFor="messageContent"></label>
            <div className="textarea-wrapper">
              <textarea
                id="messageContent"
                required
                value={messageContent}
                onChange={(e) => {
                  if (e.target.value.length <= 200) {
                    setMessageContent(e.target.value);
                  }
                }}
                className="font-mono italic border-2 border-gray-500 border-double"
                rows={10}
                cols={50}
                placeholder="Enter your message here"
              ></textarea>
            </div>
            <br />
    
            <button
              type="button"
              className="text-xl"
              onClick={handleSubmit}
            >
              Send
            </button>
          
          </form>
        </div>
      ) : (
        // Render this if username does not exist
        <div className="second-condition-div">
          <h2 className="text-2xl font-mono text-gray-500 text-center">
            Username not found. Please check the username.
          </h2>
        </div>
      )}

      <Footer/>
      <ToastContainer />
    </div>
  );
};

export default Deployed;
