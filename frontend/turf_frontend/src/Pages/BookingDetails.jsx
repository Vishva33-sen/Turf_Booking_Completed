import { useEffect, useState } from 'react';
import axios from 'axios';

const BookingDetails = () => {
    const [bookingDetails, setBookingDetails] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the backend using Axios
        axios.get('http://localhost:8081/bookings/bookingdetails')
            .then(response => {
                setBookingDetails(response.data);
            })
            .catch(error => {
                setError('Error fetching data: ' + error.message);
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="booking-container">
            <h1>Booking Details</h1>
            {error && <p>{error}</p>}
            <table className="booking-table">
                <thead>
                <tr>
                    <th>Booking ID</th>
                    <th>Date</th>
                    <th>Email</th>
                    <th>Paid Amount</th>
                    <th>Time</th>
                    <th>Turf Name</th>
                </tr>
                </thead>
                <tbody>
                {bookingDetails.map((detail, index) => (
                    <tr key={index}>
                        <td>{detail.bookingId}</td>
                        <td>{detail.date}</td>
                        <td>{detail.email}</td>
                        <td>{detail.payedAmt}</td>
                        <td>{detail.time.join(', ')}</td>
                        <td>{detail.turfname}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <style jsx>{`
                .booking-container {
                    margin: 20px;
                    padding: 20px;
                    min-height: calc(100vh - 100px);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .booking-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }

                .booking-table th, .booking-table td {
                    padding: 12px 15px;
                    text-align: center;
                    border: 1px solid #ddd;
                }

                .booking-table th {
                    background-color: cornflowerblue;
                    color: white;
                    font-weight: bold;
                }

                .booking-table td {
                    background-color: black;
                    font-size: 14px;
                }

                .booking-table tr:nth-child(even) td {
                    background-color: #f2f2f2;
                }

                .booking-table tr:hover {
                    background-color: #f1f1f1;
                }
            `}</style>
        </div>
    );
};

export default BookingDetails;