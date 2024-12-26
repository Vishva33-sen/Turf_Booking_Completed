import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BG from "../assets/sports_11zon.jpg";

const AdminTurfs = () => {
    const [turfs, setTurfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [turfToDelete, setTurfToDelete] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const adminId = localStorage.getItem('adminId');
        if (!adminId) {
            setError('Admin ID not found in local storage.');
            setLoading(false);
            return;
        }

        axios
            .get(`http://localhost:8081/admin/getTurfsByAdmin?adminId=${adminId}`)
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setTurfs(response.data);
                } else {
                    setError('Invalid response format.');
                }
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch turfs.');
                setLoading(false);
            });
    }, []);

    const handleEdit = (id) => {
        navigate(`/edit-turf/${id}`);
    };

    const handleDelete = (id) => {
        setTurfToDelete(id);
        setShowConfirmDelete(true);
    };

    const confirmDelete = () => {
        axios
            .delete(`http://localhost:8081/admin/deleteTurf?turfid=${turfToDelete}`)
            .then(() => {
                alert('Turf deleted successfully');
                setTurfs(turfs.filter((turf) => turf.id !== turfToDelete));
                setShowConfirmDelete(false);
            })
            .catch(() => {
                alert('Failed to delete turf.');
                setShowConfirmDelete(false);
            });
    };

    const cancelDelete = () => {
        setShowConfirmDelete(false);
    };

    const adminTurfsStyle = {
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: 'rgba(0,0,0,0)',
        color: '#ffffff',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        marginTop: '40px',
    };

    const titleStyle = {
        color: '#00bcd4',
        textAlign: 'center',
        marginTop: '20px',
        border: "2px solid black",
        padding: "10px",
        width:"300px",
        marginLeft:"440px",
    };

    const turfsListStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        padding: '10px',
    };

    const turfCardStyle = {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        alignItems:'center',
    };

    const turfDetailsStyle = {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        flex: 1,
        textAlign: 'left',
        marginBottom: '10px',
    };

    const turfImageStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '10px',
        height: '200px', // Fixed height for image container
    };

    const turfImageImgStyle = {
        width: '100%',
        height: '100%', // Ensure image fills the container height
        objectFit: 'cover', // Ensure the image covers the container without stretching
    };

    const buttonsContainerStyle = {
        marginTop: '10px',
        display: 'flex',
        gap: '10px',
    };

    const buttonBaseStyle = {
        padding: '10px 20px',
        fontSize: '14px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        border: 'none',
    };

    const editButtonStyle = {
        ...buttonBaseStyle,
        background: 'linear-gradient(135deg, #00d4ff, #007bff)',
        color: 'white',
    };

    const deleteButtonStyle = {
        ...buttonBaseStyle,
        background: 'linear-gradient(135deg, #ff4b5c, #d32f2f)', // Red linear gradient
        color: 'white',
    };

    // Hover effect for buttons
    const onButtonMouseEnter = (e) => {
        e.target.style.transform = 'scale(1.05)'; // Zoom on hover
    };

    const onButtonMouseLeave = (e) => {
        e.target.style.transform = 'scale(1)'; // Reset scale after hover
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
        padding: '25px',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '80%',
        color: '#ffffff',
    };

    const modalDeleteButtonStyle = {
        ...buttonBaseStyle,
        background: 'linear-gradient(135deg, #ff4b5c, #d32f2f)', // Red linear gradient
        color: 'white',
        transition: 'transform 0.3s ease', // Adding transition for hover
    };

    const modalCancelButtonStyle = {
        ...buttonBaseStyle,
        backgroundColor: '#4CAF50',
        color: 'white',
        transition: 'transform 0.3s ease',
        marginLeft: '10px',
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
            <div style={adminTurfsStyle}>
                <h2 style={titleStyle}>Your Turfs</h2>

                {loading && <p>Loading turfs...</p>}
                {error && <p>{error}</p>}

                {Array.isArray(turfs) && turfs.length > 0 ? (
                    <div style={turfsListStyle}>
                        {turfs.map((turf) => (
                            <div
                                key={turf.id}
                                style={{
                                    ...turfCardStyle,
                                    ...(hoveredCard === turf.turfid
                                        ? {
                                            transform: 'scale(1.05)',
                                            boxShadow: '0 12px 20px rgba(0, 188, 212, 1)',
                                        }
                                        : {}),
                                }}
                                onMouseEnter={() => setHoveredCard(turf.turfid)} // Unique identifier for each card
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div style={turfImageStyle}>
                                    <img
                                        style={turfImageImgStyle}
                                        src={`data:image/jpeg;base64,${turf.imageData}`}
                                        alt={turf.turfname}
                                    />
                                </div>
                                <div style={turfDetailsStyle}>
                                    <h3>{turf.turfname}</h3>

                                    <p>Location: {turf.location}</p>
                                    <p>Price: ₹ {turf.price}</p>
                                    <p>Sports: {turf.sports}</p>
                                    <p>
                                        Dimensions: {turf.length} m * {turf.breadth} m
                                    </p>
                                    <div style={buttonsContainerStyle}>
                                        <button
                                            style={editButtonStyle}
                                            onClick={() => navigate(`/set-slot/${turf.turfid}`)}
                                            onMouseEnter={onButtonMouseEnter}
                                            onMouseLeave={onButtonMouseLeave}
                                        >
                                            Set Slot
                                        </button>
                                        <button
                                            style={editButtonStyle}
                                            onClick={() => handleEdit(turf.turfid)}
                                            onMouseEnter={onButtonMouseEnter}
                                            onMouseLeave={onButtonMouseLeave}
                                        >
                                            Edit Turf
                                        </button>
                                        <button
                                            style={deleteButtonStyle}
                                            onClick={() => handleDelete(turf.turfid)}
                                            onMouseEnter={onButtonMouseEnter}
                                            onMouseLeave={onButtonMouseLeave}
                                        >
                                            Delete Turf
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No turfs found.</p>
                )}

                {showConfirmDelete && (
                    <div style={modalStyle}>
                        <div style={modalContentStyle}>
                            <p>Are you sure you want to delete this turf?</p>
                            <div>
                                <button style={modalDeleteButtonStyle} onClick={confirmDelete}>
                                    Yes
                                </button>
                                <button style={modalCancelButtonStyle} onClick={cancelDelete}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTurfs;
