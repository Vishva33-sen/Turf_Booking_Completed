import { useState } from "react";
import api from "../utils/api"; // Adjust the import path as needed
import { useNavigate } from "react-router-dom";
import BG from '../assets/sports_11zon.jpg';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    mobile_number: "",
  });
  const [message, setMessage] = useState(""); // Unified message state
  const [messageType, setMessageType] = useState(""); // New state for message type (success or error)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/home/signup", formData);

      if (response.status === 201) {
        setMessage("Signup successful! Redirecting to login...");
        setMessageType("success"); // Set message type to success
        setFormData({
          email: "",
          username: "",
          password: "",
          mobile_number: "",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage("Unexpected response from the server.");
        setMessageType("error"); // Set message type to error
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        // Check specific error type in the server response
        const errorMessage = err.response.data.message;
        if (errorMessage.includes("email")) {
          setMessage("Email already exists. Please try a different one.");
        } else if (errorMessage.includes("username")) {
          setMessage("Username already exists. Please choose another one.");
        } else {
          setMessage("An error occurred. Please try again.");
        }
        setMessageType("error"); // Set message type to error
      } else {
        setMessage("An error occurred. Please try again.");
        setMessageType("error"); // Set message type to error
      }
    }
  };

  const styles = {
    registerpage: {
      height: "100%",
      width: "100%",
      overflow: "hidden",
      backgroundImage: `url(${BG})`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundSize: "cover",
    },
    form: {
      padding: "20px 30px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "340px",
      backgroundColor: "rgba(30, 30, 47, 0.5)",
      marginBottom: "100px",
      marginTop: "70px",
      position: "relative",
    },
    message: {
      position: "absolute",
      top: "-50px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "10px",
      textAlign: "center",
      borderRadius: "5px",
      fontSize: "14px",
      maxWidth: "300px",
      zIndex: 1,
      marginTop: "150px",
      backgroundColor: messageType === "success" ? "#0bf344" : "#f40319", // Green for success, red for error
      color: messageType === "success" ? "#000000" : "#ffffff", // Green text for success, red for error
    },
    input: {
      width: "95%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    heading: {
      color: "black",
    },
  };

  return (
      <div style={styles.registerpage}>
        {message && <p style={styles.message}>{message}</p>}
        <form style={styles.form} onSubmit={handleSubmit}>
          <h2 style={styles.heading}>Signup</h2>
          <label htmlFor="email">Email:</label>
          <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
          />
          <label htmlFor="username">Username:</label>
          <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              style={styles.input}
          />
          <label htmlFor="password">Password:</label>
          <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              style={styles.input}
          />
          <label htmlFor="mobile">Mobile Number:</label>
          <input
              type="text"
              name="mobile_number"
              placeholder="Mobile Number"
              value={formData.mobile_number}
              onChange={handleChange}
              required
              style={styles.input}
          />
          <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Signup
          </button>
        </form>
      </div>
  );
};

export default SignupPage;
