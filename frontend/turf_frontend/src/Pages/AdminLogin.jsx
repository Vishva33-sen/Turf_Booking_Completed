import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BG from "../../public/images/sports_11zon.jpg";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/login`, {
                email,
                password,
            });

            if (response.status === 200) {
                setSuccess(response.data.message);
                setError("");

                if (response.data.adminId) {
                    localStorage.setItem("adminId", response.data.adminId);
                    localStorage.setItem("email", email);
                    localStorage.setItem("role", "admin");
                    console.log("adminId : ", response.data.adminId);
                }

                setTimeout(() => {
                    navigate("/");
                }, 1500);
            } else {
                setError("Unexpected response from the server.");
                setSuccess("");
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("Invalid email or password.");
            } else {
                setError(err.response?.data || "An error occurred.");
            }
            setSuccess("");
        }
    };

    const styles = {
        loginPage: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            padding: "20px",
            backgroundImage: `url(${BG})`,
    backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
},
    formContainer: {
        backgroundColor: "rgba(30, 30, 47, 0.85)",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "center",
    },
    formTitle: {
        fontSize: "2rem",
            color: "white",
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: "bold",
    },
    input: {
        padding: "12px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            outline: "none",
            width: "100%",
            boxSizing: "border-box",
    },
    inputFocus: {
        borderColor: "#00bcd4",
    },
    button: {
        padding: "12px",
            backgroundColor: "#00bcd4",
            border: "none",
            borderRadius: "5px",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            width: "100%",
            marginTop:"10px",
            transition: "background-color 0.3s ease",
    },
    buttonHover: {
        backgroundColor: "#008c9e",
    },
    messageContainer: {
        position: "absolute",
            top: "-40px",
            left: 0,
            textAlign: "center",
            width: "300px",
    },
    successMessage: {
        backgroundColor: "#d4edda",
            color: "#155724",
            border: "1px solid #c3e6cb",
            borderRadius: "5px",
            padding: "10px",
            marginBottom: "15px",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
    },
    errorMessage: {
        backgroundColor: "#edd4d4",
            color: "#dc3545",
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
    },  formHeader: {
        fontSize: "1rem",
            color: "white",
            textAlign: "left",
            width: "100%",
            marginBottom: "-9px", // Reduced margin
            fontWeight: "bold",
    },

};

    return (
        <div style={styles.loginPage}>

            <form onSubmit={handleLogin} style={styles.formContainer}>
                <h2 style={styles.formTitle}>Admin Login</h2>

                <label htmlFor="email" style={styles.formHeader}>Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                    onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
                    onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                />

                <label htmlFor="password" style={styles.formHeader}>Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                    onFocus={(e) => (e.target.style.borderColor = styles.inputFocus.borderColor)}
                    onBlur={(e) => (e.target.style.borderColor = "#ccc")}
                />
                <button
                    type="submit"
                    style={styles.button}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
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

export default AdminLogin;