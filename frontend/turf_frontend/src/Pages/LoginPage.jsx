import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext.jsx";
import BG from "../../public/images/sports_11zon.jpg";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(`${import.meta.env.VITE_API_URL}/home/login`, { email, password });

      if (response.status === 200) {
        login();
        setSuccess(response.data); // Set success message
        setError(""); // Clear any previous error messages
        if (email) {
          localStorage.setItem("email", email);
        }
        setTimeout(() => {
          navigate("/location");
        }, 1500);
      } else {
        setError("Unexpected response from the server."); // Handle unexpected status
        setSuccess("");
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password."); // Handle 401 Unauthorized
      } else {
        setError(err.response?.data || "An error occurred."); // Generic error handling
      }
      setSuccess(""); // Clear success message if there's an error
    }
  };


  const styles = {
    loginPage: {
      margin: 0,
      padding: "80px 0", // Adjusts spacing for navbar and footer
      minHeight: "calc(100vh - 160px)", // Ensures space for navbar and footer
      fontFamily: "Arial, sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: `url(${BG})`,
      backgroundSize: "cover",
    },
    formContainer: {
      backgroundColor: "rgba(30, 30, 47, 0.85)",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
      width: "100%",
      maxWidth: "380px", // Increases the form width
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      alignItems: "center",
    },
    formHeader: {
      fontSize: "1.8rem",
      textAlign: "center",
      color: "white",
      marginBottom: "30px",
    },
    fieldContainer: {
      width: "100%", // Ensure it takes the full width
      textAlign: "left", // Aligns all text inside the container to the left
      marginBottom: "20px", // Space between fields
    },
    label: {
      display: "block",
      fontWeight: "bold",
      color: "#ffffff",
      marginBottom: "5px",
    },
    input: {
      width: "100%", // Adjusts to match form width
      height: "40px", // Increases input height for better usability
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
      boxSizing: "border-box", // Prevents layout shifts
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#00bcd4",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      marginBottom: "5px",
    },
    buttonHover: {
      backgroundColor: "#008c9e",
    },
    messageContainer: {
      position: "absolute",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
      padding: "0 10px",
    },
    successMessage: {
      backgroundColor: "#d4edda",
      color: "#155724", // Green color for positive message
      border: "1px solid #c3e6cb",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "15px",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    errorMessage: {
      backgroundColor: "#edd4d4",
      color: "#dc3545", // Red color for negative message
      border: "1px solid #981420",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "15px",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
    },
    messageIcon: {
      marginRight: "10px",
      fontSize: "18px",
    },
  };

  return (
      <div style={styles.loginPage}>
        <div style={styles.messageContainer}>
        </div>
        <form onSubmit={handleSubmit} style={styles.formContainer}>
          <h2 style={styles.formHeader}>Login</h2>

          <div style={styles.fieldContainer}>
            <label style={styles.label} htmlFor="email">Email:</label>
            <input
                style={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
          </div>

          <div style={styles.fieldContainer}>
            <label style={styles.label} htmlFor="password">Password:</label>
            <input
                style={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>

          <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
              onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
          >
            Login
          </button>

          {success && (
              <div style={styles.successMessage}>
                <span style={styles.messageIcon}>✔</span>
                <span>{success}</span>
              </div>
          )}

          {error && (
              <div style={styles.errorMessage}>
                <span style={styles.messageIcon}>✖</span>
                <span>{error}</span>
              </div>
          )}
        </form>

      </div>
  );
};

export default LoginPage;