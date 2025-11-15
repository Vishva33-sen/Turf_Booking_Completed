
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBooking = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [timeArray, setTimeArray] = useState([]);
    const [bookingData, setBookingData] = useState(null);
    const [selectedTimes, setSelectedTimes] = useState([]); // currently selected (active) time slots
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [timeRemain, setTimeRemain] = useState([]);
    // Fetch booking details from backend
    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/bookings/getBookingsById`,
                    { params: { bookingId } }
                );
                const data = response.data;
                console.log("Fetched booking:", data);
                console.log("data.time");
                console.log(data.time);
//                 setTimeArray(data.time);
                setTimeRemain(data.time);
                setBookingData(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching booking details:", err);
                setError("Failed to fetch booking details.");
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [bookingId]);

    //Remove one time slot
    const handleRemoveTimeSlot = (timeToRemove) => {
        console.log("TimeArray before changing"+ timeArray);
        console.log("Time to remove"+timeToRemove);
        const checking = timeArray.includes(timeToRemove);
        console.log(checking);
        setTimeArray((prev) => [...prev,timeToRemove]); //contains time which are going to be removed prev.filter((time) =>time === timeToRemove)

        setTimeRemain((prev)=> prev.filter((time) => time!== timeToRemove)); // contains time which are not going to be removed
    };

    // Save updated booking (only remaining slots)
    const handleUpdate = async () => {
        console.log("Time Array"+ timeArray);
        console.log("Time Remaining"+ timeRemain);
        if (timeRemain.length === 0) {
            alert("At least one time slot must remain");
            return;
        }

        try {
            console.log("Booking Id"+bookingData.turfId);
            console.log("Time Removed"+ timeArray);
            const updatedBooking = {
                booking_id: bookingData.bookingId,
                turfid: bookingData.turfId,
                date: bookingData.date,
                time: timeArray,
                turfName: bookingData.turfname,
                email: bookingData.email,
                payed_amt: bookingData.payedAmt
            };

            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/bookings/updateBookingById`,
                updatedBooking
            );

            if (response.status === 200) {
                alert("Booking updated successfully!");
                navigate("/dashboard");
            } else {
                alert("Failed to update booking.");
            }
        } catch (err) {
            console.error("Error updating booking:", err);
            alert("Error while updating booking. Try again later.");
        }
    };

    if (loading) return <p style={styles.message}>Loading booking details...</p>;
    if (error) return <p style={styles.error}>{error}</p>;
    if (!bookingData) return <p style={styles.message}>No booking found.</p>;

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Edit Booking</h2>

                <p><strong>Booking ID:</strong> {bookingData.bookingId}</p>
                <p><strong>Turf Name:</strong> {bookingData.turfname}</p>
                <p><strong>Turf Id: </strong>{bookingData.turfId}</p>
                <p><strong>Date:</strong> {bookingData.date}</p>
                <p><strong>Amount Paid:</strong> ₹{bookingData.payedAmt}</p>
                <div style={styles.inputContainer}>
                    <label style={styles.label}>Booked Time Slots:</label>
                    {timeRemain.length > 0 ? (
                        timeRemain.map((time, index) => (
                            <div key={index} style={styles.timeRow}>
                                <span style={styles.timeText}>{time}</span>
                                <button
                                    onClick={() => handleRemoveTimeSlot(time)}
                                    style={styles.removeButton}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    ) : (
                        <p style={{ color: "#f87171" }}>No active time slots left.</p>
                    )}
                </div>


                <div style={styles.buttonGroup}>
                    <button onClick={handleUpdate} style={styles.saveButton}>
                        Save Changes
                    </button>
                    <button onClick={() => navigate("/dashboard")} style={styles.cancelButton}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};


const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#121212",
        color: "#e0e0e0",
    },
    card: {
        backgroundColor: "#1e1e2f",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.6)",
        width: "90%",
        maxWidth: "500px",
    },
    title: {
        textAlign: "center",
        color: "#29b6f6",
        marginBottom: "20px",
    },
    inputContainer: {
        marginTop: "20px",
        marginBottom: "20px",
    },
    label: {
        display: "block",
        marginBottom: "8px",
        fontWeight: "bold",
    },
    timeRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#2d2d3a",
        padding: "10px 15px",
        borderRadius: "8px",
        marginBottom: "10px",
    },
    timeText: {
        fontSize: "1rem",
    },
    removeButton: {
        backgroundColor: "#e53935",
        color: "white",
        border: "none",
        padding: "6px 12px",
        borderRadius: "6px",
        cursor: "pointer",
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "space-between",
    },
    saveButton: {
        backgroundColor: "#00796b",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        cursor: "pointer",
    },
    cancelButton: {
        backgroundColor: "#ff5252",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        cursor: "pointer",
    },
    message: {
        textAlign: "center",
        marginTop: "50px",
    },
    error: {
        textAlign: "center",
        color: "red",
        marginTop: "50px",
    },
};

export default EditBooking;
