import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navi from "../Navbar/Navbar";
import "./Deployed.css";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
const BackendURL = process.env.REACT_APP_BACKEND_URL;

const Deployed = ({ username }) => {
  const [messageContent, setMessageContent] = useState("");
  const [usernameExists, setUsernameExists] = useState(true);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (messageContent.trim() === "") {
      toast.warning("Please enter some message.");
      return;
    }

    setLoading(true); // Set loading to true when sending message

    const messageData = {
      content: messageContent,
    };

    try {
      const response = await fetch(`${BackendURL}/send-message/${username}`, {
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
    } finally {
      setLoading(false); // Set loading to false after sending message
    }
  };

  useEffect(() => {
    const checkUsername = async () => {
      try {
        const response = await fetch(`${BackendURL}/check-user/${username}`);
        if (response.status === 404) {
          setUsernameExists(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Internal Server Error");
      }
    };

    checkUsername();
  }, [username]);

  return (
    <div>
      <Navi />

      {usernameExists ? (
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
                className="font-mono italic border-2 border-gray-500 border-double w-auto"
                rows={10}
                cols={40}
                placeholder="Enter your message here"
              ></textarea>
            </div>
            <br />

            {/* Conditional rendering based on loading state */}
            {loading ? (
              <button
                className="text-xl bg-gray-400 p-2 rounded-lg text-white cursor-not-allowed"
                disabled
              >
                Sending...
              </button>
            ) : (
              <button
                type="button"
                className="text-xl bg-green-500 p-2 rounded-lg text-white hover:bg-green-700"
                onClick={handleSubmit}
              >
                Send
              </button>
            )}
          </form>
        </div>
      ) : (
        <div className="second-condition-div">
          <h2 className="text-2xl font-mono text-gray-500 text-center">
            Username not found. Please check the username.
          </h2>
        </div>
      )}

      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
};

export default Deployed;