import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BG from "../assets/sports_11zon.jpg";

function AdminSignup() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        const adminData = { email, username, password };

        const response = await fetch('http://localhost:8081/admin/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adminData),
        });

        if (response.ok) {
            setSuccessMessage('Signup successful!');
            setTimeout(() => {
                navigate('/adminlogin');
            }, 1000);
        } else {
            setError('Signup failed');
        }
    };

    const styles = {
        signupPage: {
            backgroundImage: `url(${BG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '20px',
            boxSizing: 'border-box',
            textAlign: 'center',
        },
        formContainer: {
            backgroundColor: "rgba(30, 30, 47, 0.7)",
            padding: '30px',
            borderRadius: '8px',
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
            color: 'white',
            marginBottom: '20px',
            fontWeight: 'bold',
        },
        input: {
            padding: '12px',
            margin: '10px 0',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            outline: 'none',
            transition: 'border-color 0.3s ease',
            width: '100%',
        },
        inputFocus: {
            borderColor: '#00796b',
        },
        button: {
            padding: '12px',
            backgroundColor: '#00796b',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            width: '100%',
        },
        buttonHover: {
            backgroundColor: '#004d40',
        },
        successMessage: {
            backgroundColor: '#d4edda',
            color: '#155724',
            border: '1px solid #c3e6cb',
            borderRadius: '5px',
            padding: '10px',
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
        error: {
            color: 'red',
            fontSize: '14px',
            marginTop: '10px',
        },
    };

    return (
        <div style={styles.signupPage}>
            <form onSubmit={handleSignup} style={styles.formContainer}>
                <h2 style={styles.formTitle}>Signup</h2>
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
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                {error && <div style={styles.error}>{error}</div>}
                <button
                    type="submit"
                    style={styles.button}
                    onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                >
                    Signup
                </button>
            </form>
        </div>
    );
}

export default AdminSignup;
