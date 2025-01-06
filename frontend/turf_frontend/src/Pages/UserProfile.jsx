import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import BG from '../../public/images/sports_11zon.jpg';
import profile_image from '../../public/images/profile_photo.jpg';
import axios from "axios";

const DashboardPage = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        mobile_number: '',
    });

    const [imageSrc, setImageSrc] = useState(profile_image); // Default image
    const [activeSection, setActiveSection] = useState('profile'); // Track active section
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const myBookingsRef = useRef(null);
    const supportRef = useRef(null);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [onConfirm, setOnConfirm] = useState(() => () => {}); // Function to execute on confirm
    const [bookingId, setBookingId] = useState(null);

    const handleLogoutConfirmation = (confirm) => {
        if (confirm) {
            logoutUser(); // Call logout function if confirmed
        }
        setShowLogoutPopup(false); // Close the popup after confirmation
    };
    const logoutUser = () => {
        localStorage.removeItem("email");
        console.log("User logged out successfully.");
        navigate("/");
    };

    const showSection = (section) => {
        setActiveSection(section);
    };


    const [Booking, setBookings] = useState([]);

    const fetchBookings = async () => {
        try {
            const email = localStorage.getItem('email');
            if (!email) {
                console.error('User email not found in localStorage.');
                return;
            }
            const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/${email}`);
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
                console.log(data);
            } else {
                console.error('Failed to fetch bookings:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };
    const showConfirmModal = (message, onConfirmCallback) => {
        setModalMessage(message);
        setOnConfirm(() => onConfirmCallback);
        setShowModal(true);
    };

    const closeConfirmModal = () => {
        setShowModal(false);
    };

    const handleCancelBooking = async (turfid, date, time, booking_id) => {
        // Show the confirmation modal with a custom message
        const message = `Are you sure you want to cancel the booking on ${date} at ${time.join(", ")}?`;
        showConfirmModal(message, async () => {
            try {
                // First, cancel the booking on the turf
                const response = await axios.put(
                    `${import.meta.env.VITE_API_URL}/admin/cancel/${turfid}`,
                    { date, time } // Pass time as an array in the body
                );

                if (response.data.success) {
                    // Then, delete the booking
                    const deleteResponse = await axios.delete(
                        `${import.meta.env.VITE_API_URL}/bookings/${booking_id}`
                    );

                    if (deleteResponse.data.success) {


                    } else {
                        navigate("/locationandsports");
                    }
                } else {
                    alert(response.data.message); // Error alert for cancellation
                }
            } catch (error) {
                console.error("Error cancelling booking:", error);
                alert("Error while canceling booking. Please try again."); // Error alert for network issue
            }
        });
    };



// Trigger fetchBookings when "My Bookings" is active
    useEffect(() => {
        if (activeSection === 'mybookings') {
            fetchBookings();
        }
    }, [activeSection]);




    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const email = localStorage.getItem('email');
                if (!email) {
                    console.error('User email not found in localStorage.');
                    return;
                }

                // Fetch user data
                const response = await fetch(`${import.meta.env.VITE_API_URL}/home/user/${email}`);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);

                    // Fetch user image
                    const imageResponse = await fetch(`${import.meta.env.VITE_API_URL}/home/user/image/${email}`);
                    if (imageResponse.ok) {
                        const imageData = await imageResponse.json();
                        if (imageData.image) {
                            setImageSrc(`data:image/jpeg;base64,${imageData.image}`);
                        } else {
                            console.warn("No image found for user. Using default profile image.");
                        }
                    } else {
                        console.error("Failed to fetch user image.");
                    }
                } else {
                    console.error('Failed to fetch user data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []); // Runs once on component mount

    // Intersection Observer for scroll behavior
    useEffect(() => {
        const observerOptions = {
            root: null, // Default viewport
            rootMargin: '0px',
            threshold: 0.5, // Trigger when 50% of the element is in view
        };

        const onSectionIntersect = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id); // Set active section based on visibility
                }
            });
        };

        const observer = new IntersectionObserver(onSectionIntersect, observerOptions);

        if (myBookingsRef.current) {
            observer.observe(myBookingsRef.current);
        }

        if (supportRef.current) {
            observer.observe(supportRef.current);
        }

        return () => {
            if (myBookingsRef.current) {
                observer.unobserve(myBookingsRef.current);
            }
            if (supportRef.current) {
                observer.unobserve(supportRef.current);
            }
        };
    }, []);

    return (
        <div style={styles.pageContainer}>
            <div style={styles.contentWrapper}>
                {/* Sidebar */}
                <div style={styles.sidebar}>
                    <h2 style={styles.sidebarTitle}>My Dashboard</h2>
                    <ul style={styles.menu}>
                        {['Profile', 'Edit Profile', 'Wishlist'].map((item, index) => (
                            <li
                                key={index}
                                style={styles.menuItem}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#00796b';
                                    e.target.style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'transparent';
                                    e.target.style.color = '#b0bec5';
                                }}
                                onClick={() => {
                                    if (item === 'Profile') {
                                        showSection('profile'); // Show profile section on the same page
                                    } else {
                                        navigate(`/${item.toLowerCase().replace(' ', '')}`); // Retain original behavior for Edit Profile, Wishlist
                                    }
                                }}
                            >
                                {item}
                            </li>
                        ))}
                        {['My Bookings'].map((item, index) => (
                            <li
                                key={index}
                                style={styles.menuItem}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#00796b';
                                    e.target.style.color = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'transparent';
                                    e.target.style.color = '#b0bec5';
                                }}
                                onClick={() => showSection(item.toLowerCase().replace(' ', ''))} // Show sections dynamically
                            >
                                {item}
                            </li>
                        ))}
                        <li
                            style={{ ...styles.menuItem, color: "#ff5252", fontWeight: "bold" }}
                            onMouseEnter={(e) => (e.target.style.background = "#c62828",e.target.style.color="white")}
                            onMouseLeave={(e) => (e.target.style.background = "transparent",e.target.style.color="#ff5252")}
                            onClick={() => setShowLogoutPopup(true)} // Show popup on click
                        >
                            Logout
                        </li>

                        {showLogoutPopup && (
                            <div style={styles.logoutPopup}>
                                <p>Are you sure you want to log out?</p>
                                <button
                                    style={{ ...styles.popupButton, ...styles.yesButton }}
                                    onClick={() => handleLogoutConfirmation(true)}
                                >
                                    Yes
                                </button>
                                <button
                                    style={{ ...styles.popupButton, ...styles.noButton }}
                                    onClick={() => handleLogoutConfirmation(false)}
                                >
                                    No
                                </button>
                            </div>
                        )}
                    </ul>

                </div>

                {/* Main Dashboard */}
                <div style={styles.dashboard}>
                    {/* Profile Section */}
                    {activeSection === 'profile' && (
                        <div id="profile" style={styles.profileCard}>
                            <img src={imageSrc} alt="Profile" style={styles.profileImage} />
                            <h3 style={styles.profileName}>{user.username}</h3>
                            <p style={styles.profileText}>{user.mobile_number}</p>
                            <p style={styles.profileText}>{user.email}</p>
                        </div>
                    )}


                    {activeSection === 'mybookings' && (
                        <div ref={myBookingsRef} id="mybookings" style={styles.section}>
                            <h3 style={styles.sectionTitle}>My Bookings</h3>
                            {Booking.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {Booking.map((booking, index) => (
                                        <li
                                            key={index}
                                            style={{
                                                padding: '10px',
                                                margin: '10px 0',
                                                borderRadius: '5px',
                                                backgroundColor: '#1e293b',
                                                color: '#e0e0e0',
                                            }}
                                        >
                                            <p><strong>Booking ID:</strong> {booking.booking_id}</p>
                                            <p><strong>Booking Date:</strong> {booking.date}</p>
                                            <p><strong>Time:</strong> {booking.time.join(' , ')}</p>
                                            <p><strong>Amount Paid:</strong> {booking.payed_amt}</p>
                                            <p><strong>Turf Name:</strong>{booking.turfname}</p>

                                            {/* Cancel button */}
                                            <button
                                                onClick={() => handleCancelBooking(booking.turfid, booking.date, booking.time,booking.booking_id)}
                                                style={{
                                                    padding: '8px 12px',
                                                    backgroundColor: '#ff0000',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                    marginTop: '10px',
                                                }}
                                            >
                                                Cancel Booking
                                            </button>
                                            {showModal && (
                                                <div className="modal" style={styles.modalStyles}>
                                                    <div className="modal-content" style={styles.modalContentStyles}>
                                                        <h4 style={styles.h4}>Confirm Action</h4>
                                                        <p>{modalMessage}</p>
                                                    </div>
                                                    <div className="modal-footer" style={styles.modalFooterStyles}>
                                                        <button
                                                            onClick={closeConfirmModal}
                                                            className="btn"
                                                            style={styles.buttoncancelStyles}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                onConfirm(); // Execute the callback on confirm
                                                                closeConfirmModal(); // Close the modal
                                                            }}
                                                            className="btn"
                                                            style={styles.buttonconfirmStyles}
                                                        >
                                                            Confirm
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={styles.sectionContent}>No bookings found.</p>
                            )}
                        </div>
                    )}




                    {/* Support Section */}
                    {activeSection === 'support' && (
                        <div ref={supportRef} id="support" style={styles.section}>
                            <h3 style={styles.sectionTitle}>Support</h3>
                            <p style={styles.sectionContent}>
                                If you need help, please reach out to our support team.
                            </p>
                            <h4 style={styles.sectionSubTitle}>Contact Form</h4>
                            <form style={styles.contactForm}>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    style={styles.formInput}
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    style={styles.formInput}
                                />
                                <textarea
                                    placeholder="Your Message"
                                    style={styles.formTextarea}
                                ></textarea>
                                <button type="submit" style={styles.submitButton}>
                                    Send Message
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            {showPopup && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popup}>
                        <h3>Confirm Cancellation</h3>
                        <p>Are you sure you want to cancel this booking?</p>
                        <div style={styles.popupActions}>
                            <button onClick={handleCancelBooking} style={styles.confirmButton}>
                                Yes, Cancel
                            </button>
                            <button onClick={() => setShowPopup(false)} style={styles.closeButton}>
                                No, Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>

    );
};

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#121212',
        color: '#e0e0e0',
        backgroundImage: `url(${BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
    },
    contentWrapper: {
        flex: 1,
        display: 'flex',
        fontFamily: '"Poppins", Arial, sans-serif',
        margin: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '0 15px',
    },
    sidebar: {
        width: '300px',
        backgroundColor: '#1e293b',
        color: '#b0bec5',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 5px rgba(0,0,0,1)',
        position: 'relative',
        top: '0',
        left: '0',
        height:'650px',
        marginTop:'25px',
        borderRadius: '15px',


    },
    sidebarTitle: {
        fontSize: '1.8rem',
        textAlign: 'center',
        marginBottom: '30px',
    },
    menu: {
        listStyle: 'none',
        padding: 0,
    },
    menuItem: {
        margin: '15px 0',
        padding: '15px',
        borderRadius: '10px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'background 0.3s, color 0.3s',
        fontSize: '1.1rem',
    },
    dashboard: {
        flex: 1,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        overflowY: 'auto',// Handles overflow in dashboard content

    },
    profileCard: {
        backgroundColor: '#1e1e2f',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 1)',
        padding: '40px',
        borderRadius: '15px',
        textAlign: 'center',

        margin: '0 auto',
        width: '1000px',
        height:'400px',
    },
    profileImage: {
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        marginBottom: '20px',
        border: '3px solid #29b6f6',
        maxWidth: '100%', // Make image responsive
        maxHeight: '100%',
    },
    profileName: {
        fontSize: '1.6rem',
        color: '#e0e0e0',
        margin: '10px 0',
    },
    profileText: {
        color: '#b0bec5',
        margin: '8px 0',
        fontSize: '1rem',
    },
    section: {
        backgroundColor: '#1e1e2f',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        height: 'auto',
        overflowY: 'auto', // Handles content overflow
    },
    sectionTitle: {
        fontSize: '1.4rem',
        color: '#e0e0e0',
        marginBottom: '20px',
    },
    sectionSubTitle: {
        fontSize: '1.2rem',
        color: '#e0e0e0',
        marginTop: '20px',
    },
    sectionContent: {
        fontSize: '1rem',
        color: '#b0bec5',
    },
    contactForm: {
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        margin: '0 auto',
        width: '100%',
        maxWidth: '600px',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#1e1e2f',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
    },
    formInput: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #b0bec5',
        backgroundColor: '#121212',
        color: '#e0e0e0',
    },
    formTextarea: {
        padding: '10px',
        fontSize: '1rem',
        borderRadius: '5px',
        border: '1px solid #b0bec5',
        backgroundColor: '#121212',
        color: '#e0e0e0',
        height: '150px',
    },
    submitButton: {
        padding: '10px 20px',
        fontSize: '1.1rem',
        backgroundColor: '#00796b',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    logoutPopup: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(0,0,0,0.8)",
        color: "#fff",
        padding: "20px",
        borderRadius: "5px",
        zIndex: 1001,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    popupButton: {
        marginTop: "10px",
        padding: "10px 20px",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        borderRadius: "5px",
        transition: "background 0.3s ease", // Smooth transition for background
    },
    yesButton: {
        background: "linear-gradient(45deg, red, darkred)",
    },
    noButton: {
        background: "linear-gradient(45deg, blue, darkblue)",
    },
    modalStyles : {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        zIndex: 1,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        paddingTop: '60px',
    },
    modalContentStyles : {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        margin: '5% auto',
        padding: '30px 40px', // Increased padding for better spacing
        border: '1px solid #888',
        width: '40%', // Narrowed down the width for a more compact design
        color: 'rgb(0,188,212)',
        borderRadius: '12px', // Added rounded corners for a modern feel
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)', // Subtle shadow for depth
        textAlign: 'center', // Centered text for uniformity
        fontFamily: 'Arial, sans-serif', // Updated font family for a more professional look
        fontSize: '16px', // Improved font size for readability
        letterSpacing: '0.5px', // Slightly adjusted letter spacing for a polished effect
    },
    modalFooterStyles : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px', // Added some space between content and buttons
    },
    buttoncancelStyles : {
        background: "linear-gradient(45deg, blue, darkblue)",
        color: 'white',
        padding: '12px 24px', // Slightly larger padding for a more comfortable button
        border: 'none',
        cursor: 'pointer',
        borderRadius: '8px',
        marginRight: '15px', // Increased margin for better spacing
        fontSize: '14px', // Increased font size for better readability
        transition: 'all 0.3s ease', // Smooth transition for hover effect
    },
    buttonconfirmStyles : {
        background: "linear-gradient(45deg, red, darkred)",
        color: 'white',
        padding: '12px 24px', // Slightly larger padding for consistency
        border: 'none',
        cursor: 'pointer',
        borderRadius: '8px',
        fontSize: '14px',
        transition: 'all 0.3s ease', // Smooth transition for hover effect
    },
    h4 : {
        marginLeft: '0', // Adjusted margin to ensure it's centered or aligned well with the modal
        color: 'red',
        fontSize: '24px', // Increased font size for emphasis
        fontWeight: 'bold', // Bold for more emphasis
        textAlign: 'center', // Centered for a cleaner look
        marginBottom: '20px', // Added margin at the bottom to separate from the content
    },

    // Media Queries for Responsiveness
    '@media (max-width: 768px)': {
        contentWrapper: {
            flexDirection: 'column', // Stack the sidebar and dashboard on smaller screens
        },
        sidebar: {
            width: '100%', // Sidebar takes full width on mobile
            position: 'relative',
            top: 'unset',
        },
        dashboard: {
            padding: '15px',
        },
        profileCard: {
            width: '80%',
        },
        section: {
            width: '90%',
        },
    },

    '@media (max-width: 480px)': {
        sidebarTitle: {
            fontSize: '1.4rem',
        },
        menuItem: {
            fontSize: '1rem',
        },
        profileName: {
            fontSize: '1.4rem',
        },
    }
};



export default DashboardPage;
