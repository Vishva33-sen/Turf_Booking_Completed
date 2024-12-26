import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import BG from '../assets/sports_11zon.jpg';
import profile_image from '../assets/profile_photo.jpg';
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

    const logoutUser = () => {
        localStorage.removeItem("email");
        console.log("User logged out successfully.");
        navigate("/home");
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
            const response = await fetch(`http://localhost:8081/bookings/${email}`);
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
    const handleCancelBooking = async (turfid, date, time, booking_id) => {
        const confirmCancel = window.confirm(
            `Are you sure you want to cancel the booking on ${date} at ${time.join(", ")}?`
        );

        if (!confirmCancel) {
            return; // If user selects "Cancel", exit the function
        }

        try {
            const response = await axios.put(
                `http://localhost:8081/admin/cancel/${turfid}`,
                { date, time } // Pass time as an array in the body
            );

            if (response.data.success) {
                alert(response.data.message); // Show success message
                const deleteResponse = await axios.delete(
                    `http://localhost:8081/bookings/${booking_id}`
                );

                if (deleteResponse.data.success) {
                    alert(deleteResponse.data.message); // Show success message for deletion
                    window.location.reload(); // Reload the page
                } else {
                    alert(deleteResponse.data.message); // Show error message for deletion
                }
            } else {
                alert(response.data.message); // Show error message
            }
        } catch (error) {
            console.error("Error cancelling booking:", error);
            alert("Error while canceling booking. Please try again.");
        }
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
                const response = await fetch(`http://localhost:8081/home/user/${email}`);
                if (response.ok) {
                    const data = await response.json();
                    setUser(data);

                    // Fetch user image
                    const imageResponse = await fetch(`http://localhost:8081/home/user/image/${email}`);
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
                        {['My Bookings', 'Support'].map((item, index) => (
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
                            style={{ ...styles.menuItem, color: '#ff5252', fontWeight: 'bold' }}
                            onMouseEnter={(e) => (e.target.style.background = '#c62828')}
                            onMouseLeave={(e) => (e.target.style.background = 'transparent')}
                            onClick={logoutUser}
                        >
                            Logout
                        </li>
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
