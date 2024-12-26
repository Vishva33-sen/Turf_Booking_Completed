import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BG from "../assets/sports_11zon.jpg"; // Background Image

const EditTurf = () => {
    const { turfid } = useParams(); // Get the turf ID from the route
    const navigate = useNavigate();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [turfDetails, setTurfDetails] = useState({
        turfname: '',
        location: '',
        price: '',
        sports: '',
        length: '',
        breadth: '',
        imageData: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch turf details by ID when the component mounts
    useEffect(() => {
        axios
            .get(`http://localhost:8081/admin/getTurfById?turfid=${turfid}`)
            .then((response) => {
                setTurfDetails(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to fetch turf details');
                setLoading(false);
            });
    }, [turfid]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTurfDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`http://localhost:8081/admin/updateTurf?turfid=${turfid}`, turfDetails)
            .then(() => {
                setShowSuccessMessage(true);

                setTimeout(() => {
                    navigate('/updateturf', { state: { message: 'Turf updated successfully' } });
                }, 1000); // 1 second delay
            })
            .catch(() => {
                alert('Failed to update turf details');
            });
    };

    const editTurfStyle = {
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif',
        padding: '30px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#fff',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '800px',
        margin: '40px auto',
        alignItems: 'center',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
    };

    const titleStyle = {
        color: '#00bcd4',
        textAlign: 'center',
        marginBottom: '20px',
        padding: '12px',
        width: '250px',
        backgroundColor: '#333',
        borderRadius: '5px',
        fontWeight: 'bold',
        fontSize: '24px',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
    };

    const inputStyle = {
        padding: '12px',
        fontSize: '18px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        width: '95%',
        marginTop: '8px',
        backgroundColor: '#aaa7a7',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        fontWeight: 'bold',
    };

    const buttonBaseStyle = {
        padding: '12px 25px',
        fontSize: '16px',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        border: 'none',
        marginTop: '20px',
    };

    const updateButtonStyle = {
        ...buttonBaseStyle,
        background: 'linear-gradient(135deg, #00d4ff, #007bff)',
        color: '#fff',
        boxShadow: '0 4px 10px rgba(0, 123, 255, 0.3)',
    };

    const successMessageStyle = {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '6px',
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '16px',
        animation: 'fadeOut 1s ease-in-out forwards',
        width: '100%',
    };

    const modalStyle = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '9999',
    };

    const modalContentStyle = {
        backgroundColor: '#1e1e1e',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '80%',
        color: '#fff',
    };

    const thispage = {
        backgroundImage: `url(${BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '20px',
    };

    return (
        <div style={thispage}>
            <div style={editTurfStyle}>
                <h2 style={titleStyle}>Edit Turf Details</h2>

                {loading && <p>Loading turf details...</p>}
                {error && <p>{error}</p>}

                {!loading && !error && (
                    <form onSubmit={handleSubmit} style={formStyle}>
                        <label>
                            Turf Name:
                            <input
                                type="text"
                                name="turfname"
                                value={turfDetails.turfname}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                        </label>
                        <label>
                            Location:
                            <input
                                type="text"
                                name="location"
                                value={turfDetails.location}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                        </label>
                        <label>
                            Price:
                            <input
                                type="number"
                                name="price"
                                value={turfDetails.price}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                        </label>
                        <label>
                            Sports:
                            <input
                                type="text"
                                name="sports"
                                value={turfDetails.sports}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                        </label>
                        <label>
                            Length (m):
                            <input
                                type="number"
                                name="length"
                                value={turfDetails.length}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                        </label>
                        <label>
                            Breadth (m):
                            <input
                                type="number"
                                name="breadth"
                                value={turfDetails.breadth}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                            />
                        </label>
                        <label>
                            Upload Image:
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = () => {
                                            setTurfDetails((prevDetails) => ({
                                                ...prevDetails,
                                                imageData: reader.result.split(',')[1], // Base64 encoded string
                                            }));
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                style={inputStyle}
                            />
                        </label>
                        {turfDetails.imageData && (
                            <img
                                src={`data:image/*;base64,${turfDetails.imageData}`}
                                alt="Preview"
                                style={{ maxWidth: '50%', height: 'auto', marginTop: '10px',marginLeft:'200px', }}
                            />
                        )}
                        {showSuccessMessage && (
                            <div style={successMessageStyle}>
                                <p>Turf Updated Successfully!</p>
                            </div>
                        )}
                        <button
                            type="submit"
                            style={updateButtonStyle}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Update Turf
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EditTurf;
