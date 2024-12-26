import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BG from "../assets/sports_11zon.jpg";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        try {
            const response = await axios.post("http://localhost:8081/admin/login", {
                email,
                password,
            });
            setSuccessMessage(response.data.message);

            if (response.data.adminId) {
                localStorage.setItem("adminId", response.data.adminId);
                localStorage.setItem("email", email);
                localStorage.setItem("role", "admin");  // Set role as "admin"
                console.log("adminId : ", response.data.adminId);
            }

            setTimeout(() => {
                navigate("/home");
            }, 1000);
        } catch (err) {
            setError("Invalid email or password.");
        }
    };

    const styles = {
        loginpage: {
            backgroundImage: `url(${BG})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: 'black',
            padding: '20px',
            boxSizing: 'border-box',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },
        formContainer: {
            backgroundColor: "rgba(30, 30, 47, 0.75)",  // Slightly darker background for better contrast
            padding: '40px',
            borderRadius: '8px',
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
            width: '100%',
            maxWidth: '450px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'center',
        },
        formTitle: {
            fontSize: '26px',
            color: '#00bcd4',
            textAlign: 'center',
            marginBottom: '20px',
            fontWeight: '600',
        },
        input: {
            padding: '14px',
            margin: '10px 0',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            outline: 'none',
            transition: 'border-color 0.3s ease',
            width: '100%',
        },
        inputFocus: {
            borderColor: '#00bcd4',
        },
        button: {
            padding: '14px',
            backgroundColor: '#00bcd4',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            width: '100%',
        },
        buttonHover: {
            backgroundColor: '#008c9e',
        },
        error: {
            fontSize: '14px',
            color: 'red',
            textAlign: 'center',
            marginTop: '10px',
        },
        successMessage: {
            backgroundColor: '#d4edda',
            color: '#155724',
            border: '1px solid #c3e6cb',
            borderRadius: '5px',
            padding: '12px',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px',
        },
        successIcon: {
            marginRight: '10px',
            fontSize: '18px',
            color: '#28a745',
        },
        successText: {
            fontWeight: 'bold',
        },
    };

    return (
        <div style={styles.loginpage}>
            <form onSubmit={handleLogin} style={styles.formContainer}>
                <h2 style={styles.formTitle}>Admin Login</h2>
                {successMessage && (
                    <div style={styles.successMessage}>
                        <span style={styles.successIcon}>✔</span>
                        <span style={styles.successText}>{successMessage}</span>
                    </div>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
                    onBlur={(e) => e.target.style.borderColor = '#ccc'}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
                    onBlur={(e) => e.target.style.borderColor = '#ccc'}
                />
                {error && <p style={styles.error}>{error}</p>}
                <button
                    type="submit"
                    style={styles.button}
                    onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
