import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import BG from '../../public/images/sports_11zon.jpg';

const AddTurfForm = () => {
    const [turfname, setTurfname] = useState('');
    const [location, setLocation] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');
    const [price, setPrice] = useState('');
    const [sports, setSports] = useState('');
    const [length, setLength] = useState('');
    const [breadth, setBreadth] = useState('');
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const adminId = localStorage.getItem('adminId');

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('admin_id', adminId);
        formData.append('turfname', turfname);
        formData.append('location', location);
        formData.append('mobilenumber', mobilenumber);
        formData.append('price', price);
        formData.append('sports', sports);
        formData.append('length', length);
        formData.append('breadth', breadth);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/addturf`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setMessage(response.data);
            if (response.data === "Turf added successfully") {
                setTimeout(() => setMessage(''), 800);
            }
        } catch (error) {
            setMessage('Error: ' + error.response.data);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminId');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        navigate('/adminlogin');
    };

    const styles = {
        page: {
            backgroundImage: `url(${BG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
        },
        formContainer: {
            fontFamily: 'Roboto, sans-serif',
            padding: '40px',
            backgroundColor: 'rgba(0,0,0,0.6)',
            border: '1px solid #e0e0e0',
            borderRadius: '15px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
            maxWidth: '600px',
            width: '100%',

        },
        heading: {
            color:'white',
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: '600',
            marginBottom: '20px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        label: {
            fontSize: '14px',
            fontWeight: 'bold',
            color:'white',
            marginBottom: '5px',
        },
        input: {
            padding: '12px',
            fontSize: '14px',
            border: '1px solid #cccccc',
            borderRadius: '8px',
            outline: 'none',
            width: '97%',
            transition: 'border-color 0.3s ease',
            backgroundColor:'rgb(175,172,172)',
        },
        inputFocus: {
            borderColor: '#1976d2',
        },
        button: {
            padding: '12px',
            backgroundColor: '#1976d2',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#0d47a1',
        },
        message: {
            textAlign: 'center',
            fontSize: '14px',
            color: '#d32f2f',
            marginTop: '20px',
        },
        popup: {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#d4edda',
            color: '#155724',
            border: '1px solid #c3e6cb',
            borderRadius: '10px',
            padding: '20px',
            zIndex: '1000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            animation: 'fade-in-out 3s ease-in-out',
        },
        popupIcon: {
            marginRight: '10px',
            fontSize: '20px',
            color: '#28a745',
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '999',
        },
        '@keyframes fade-in-out': {
            '0%': { opacity: 0 },
            '10%': { opacity: 1 },
            '90%': { opacity: 1 },
            '100%': { opacity: 0 },
        },
    };

    return (
        <div style={styles.page}>
            <div style={styles.formContainer}>
                <h2 style={styles.heading}>Add Turf Details</h2>

                <form onSubmit={handleFormSubmit} style={styles.form}>
                    {message === "Turf added successfully" && (
                        <>
                            <div style={styles.overlay}></div>
                            <div style={styles.popup}>
                                <span style={styles.popupIcon}>✔</span>
                                <span>{message}</span>
                            </div>
                        </>
                    )}
                    <div>
                        <label style={styles.label}>Turf Name:</label>
                        <input
                            type="text"
                            value={turfname}
                            onChange={(e) => setTurfname(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label style={styles.label}>Location:</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label style={styles.label}>Mobile Number:</label>
                        <input
                            type="number"
                            value={mobilenumber}
                            onChange={(e) => setMobilenumber(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label style={styles.label}>Price:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label style={styles.label}>Sports (eg : ["Cricket","Football"]):</label>
                        <input
                            type="text"
                            value={sports}
                            onChange={(e) => setSports(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label style={styles.label}>Length (in metres):</label>
                        <input
                            type="number"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label style={styles.label}>Breadth (in metres):</label>
                        <input
                            type="number"
                            value={breadth}
                            onChange={(e) => setBreadth(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label style={styles.label}>Upload Image:</label>
                        <input
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>
                        Add Turf
                    </button>
                    {/*<button type="button" onClick={handleLogout} style={{ ...styles.button, marginTop: '10px' }}>*/}
                    {/*    Logout*/}
                    {/*</button>*/}
                </form>

            </div>
        </div>
    );
};

export default AddTurfForm;
