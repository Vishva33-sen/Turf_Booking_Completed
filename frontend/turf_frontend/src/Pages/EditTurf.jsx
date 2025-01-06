import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BG from "../../public/images/sports_11zon.jpg"; // Background Image

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
            .get(`${import.meta.env.VITE_API_URL}/admin/getTurfById?turfid=${turfid}`)
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
            .put(`${import.meta.env.VITE_API_URL}/admin/updateTurf?turfid=${turfid}`, turfDetails)
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
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: '#fff',
        borderRadius: '10px',
        width: '90%',
        maxWidth: '800px',
        margin: '40px auto',
        alignItems: 'center',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
        marginBottom: '60px', // Add space below the form
        flexGrow: 1, // Allow the form to take available space before footer
    };

    const titleStyle = {
        color: '#00bcd4',
        textAlign: 'center',
        marginBottom: '20px',
        padding: '12px',
        width: '100%',
        maxWidth: '250px',
        backgroundColor: '#333',
        borderRadius: '5px',
        fontWeight: 'bold',
        fontSize: '1.5rem',
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
    };

    const inputStyle = {
        padding: '12px',
        fontSize: '16px',
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


    const thispage = {
        backgroundImage: `url(${BG})`,
    backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        paddingTop: '20px',
        display: 'flex',
        flexDirection: 'column', // Ensures form takes the full available height
        justifyContent: 'flex-start', // Aligns content to the top
};


    const popupStyle = {
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
    };

    const popupIconStyle = {
        marginRight: '10px',
        fontSize: '20px',
        color: '#28a745',
    };

    const modalStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '999',
    };

    const fadeInOut = `
    @keyframes fade-in-out {
        0% { opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { opacity: 0; }
    }
`;


    return (
        <div style={thispage}>
            <div style={editTurfStyle}>
                <h2 style={titleStyle}>Edit Turf Details</h2>

                {showSuccessMessage && (
                    <>
                        <div style={modalStyle}></div>
                        <div style={popupStyle}>
                            <span style={popupIconStyle}>✔</span>
                            <span>Turf updated successfully!</span>
                        </div>
                    </>
                )}

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
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    marginTop: '10px',
                                    display: 'block',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}
                            />
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