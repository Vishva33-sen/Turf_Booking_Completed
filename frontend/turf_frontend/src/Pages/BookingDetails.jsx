import { useEffect, useState } from 'react';
import axios from 'axios';
import BG from "../assets/sports_11zon.jpg";

const BookingDetails = () => {
    const [bookingDetails, setBookingDetails] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const adminId = localStorage.getItem('adminId'); // Fetch adminId from local storage
        console.log('adminId');
        if (adminId) {
            axios.get(`http://localhost:8081/bookings/bookingdetails`)
                .then(response => {
                    setBookingDetails(response.data);
                })
                .catch(error => {
                    setError('Error fetching data: ' + error.message);
                    console.error('Error fetching data:', error);
                });
        } else {
            setError("Admin ID is not found in local storage.");
        }
    }, []);

    const styles = {
        bookingContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '20px',
            boxSizing: 'border-box',
            backgroundImage: `url(${BG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        },
        bookingWrapper: {
            background: 'rgba(30, 30, 47, 0.85)',
            padding: '40px 50px',
            borderRadius: '15px',
            width: '80%',
            maxWidth: '1000px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            color: '#fff',
        },
        pageTitle: {
            fontSize: '30px',
            marginBottom: '20px',
            fontWeight: '600',
            color: '#fff',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.4)',
        },
        error: {
            color: '#ff4d4d',
            fontSize: '16px',
            marginBottom: '20px',
        },
        bookingTable: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            overflow: 'hidden',
        },
        thTdCommon: {
            padding: '14px 18px',
            textAlign: 'center',
            border: '1px solid #ddd',
            fontSize: '15px',
            transition: 'background-color 0.3s ease',
        },
        th: {
            backgroundColor: '#2d3a4b',
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'uppercase',
        },
        td: {
            backgroundColor: '#3b4c62',
            color: '#f3f4f6',
        },
        trEven: {
            backgroundColor: '#4e5a6c',
        },
    };

    return (
        <div style={styles.bookingContainer}>
            <div style={styles.bookingWrapper}>
                <h1 style={styles.pageTitle}>Booking Details</h1>
                {error && <p style={styles.error}>{error}</p>}
                <table style={styles.bookingTable}>
                    <thead>
                    <tr>
                        <th style={{ ...styles.th, ...styles.thTdCommon }}>Booking ID</th>
                        <th style={{ ...styles.th, ...styles.thTdCommon }}>Date</th>
                        <th style={{ ...styles.th, ...styles.thTdCommon }}>Email</th>
                        <th style={{ ...styles.th, ...styles.thTdCommon }}>Paid Amount</th>
                        <th style={{ ...styles.th, ...styles.thTdCommon }}>Time</th>
                        <th style={{ ...styles.th, ...styles.thTdCommon }}>Turf Name</th>

                    </tr>
                    </thead>
                    <tbody>
                    {bookingDetails.map((detail, index) => (
                        <tr key={index} style={index % 2 === 0 ? styles.trEven : {}}>
                            <td style={{ ...styles.td, ...styles.thTdCommon }}>{detail.bookingId}</td>
                            <td style={{ ...styles.td, ...styles.thTdCommon }}>{detail.date}</td>
                            <td style={{ ...styles.td, ...styles.thTdCommon }}>{detail.email}</td>
                            <td style={{ ...styles.td, ...styles.thTdCommon }}>{detail.payedAmt}</td>
                            <td style={{ ...styles.td, ...styles.thTdCommon }}>{detail.time.join(', ')}</td>
                            <td style={{ ...styles.td, ...styles.thTdCommon }}>{detail.turfname}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingDetails;
