import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BG from "../assets/sports_11zon.jpg";
import axios from "axios";

function ConfirmPayment() {
    const [turfDetails, setTurfDetails] = useState(null);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve turf details and selected slots from local storage
        const storedTurfDetails = localStorage.getItem("turfDetails");
        const storedSelectedSlots = localStorage.getItem("selectedSlots");

        if (storedTurfDetails && storedSelectedSlots) {
            const parsedTurfDetails = JSON.parse(storedTurfDetails);
            const parsedSelectedSlots = JSON.parse(storedSelectedSlots);

            if (typeof parsedTurfDetails.sports === "string") {
                parsedTurfDetails.sports = JSON.parse(parsedTurfDetails.sports);
            }

            setTurfDetails(parsedTurfDetails);
            setSelectedSlots(parsedSelectedSlots);

            // Calculate total amount
            const total = parsedSelectedSlots.length * parsedTurfDetails.price;
            setTotalAmount(total);
        }
    }, []);

    const handlePayNow = async () => {
        const storedTurfDetails = JSON.parse(localStorage.getItem("turfDetails"));
        const storedSelectedSlots = JSON.parse(localStorage.getItem("selectedSlots"));
        const storedEmail = localStorage.getItem("email"); // Retrieve email from local storage
        const authToken = localStorage.getItem("authToken"); // Assuming token is stored in local storage
        console.log("slot_details", storedSelectedSlots);

        if (storedTurfDetails && storedSelectedSlots.length > 0 && storedEmail) {
            try {
                // Group slots by date
                const groupedSlots = storedSelectedSlots.reduce((acc, slot) => {
                    const { date, time } = slot;
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(time);
                    return acc;
                }, {});

                // Create booking details array
                const bookingDetailsArray = Object.entries(groupedSlots).map(([date, times]) => ({
                    email: storedEmail, // Use the email from local storage
                    turfid: storedTurfDetails.turfid,
                    payed_amt: storedTurfDetails.price * times.length, // Calculate total amount for the date
                    date, // Use the grouped date
                    time: times, // All times for this date
                }));

                console.log("bookingDetailsArray", bookingDetailsArray);

                // Send each booking detail separately and update the slot status
                for (const bookingDetails of bookingDetailsArray) {
                    // Step 1: Send booking details to backend
                    const response = await fetch("http://localhost:8081/bookings/add", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${authToken}`,
                        },
                        body: JSON.stringify(bookingDetails),
                    });

                    if (!response.ok) {
                        throw new Error("Failed to add booking for date: " + bookingDetails.date);
                    }

                    // Step 2: Update the slot status for each selected time slot
                    for (const time of bookingDetails.time) {
                        try {
                            // Call the PUT request to update slot status
                            const updateResponse = await axios.put(
                                `http://localhost:8081/admin/${bookingDetails.turfid}?date=${bookingDetails.date}&time=${time}`
                            );
                            console.log("Slot status updated:", updateResponse.data);
                        } catch (error) {
                            console.error("Error updating slot status:", error);
                            alert("Error updating slot status.");
                        }
                    }
                }

                alert("All bookings added and slots updated successfully!");
                // navigate("/payment"); // Redirect to payment page
            } catch (error) {
                console.error("Error:", error);
                alert("Error while saving bookings. Please try again.");
            }
        } else {
            alert("No turf or slots selected, or email missing.");
        }
    };



    return (
        <div
            style={{
                padding: "40px 20px",
                fontFamily: "Roboto, Arial, sans-serif",
                background: "linear-gradient(135deg, #121212, #1f1f1f)", // Darker background to match previous pages
                color: "#fff",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundImage: `url(${BG})`,
                backgroundSize: "cover", // Ensure the background covers the screen properly
                backgroundPosition: "center", // Center the background
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    color: "#00e1ff", // Consistent with previous pages
                    fontSize: "40px",
                    fontWeight: "700",
                    marginBottom: "40px", // Increased bottom margin for spacing
                    textTransform: "uppercase",
                    letterSpacing: "2px", // Add spacing for a more professional look
                    border: "2px solid black",
                    padding: "10px",
                }}
            >
                Confirm Payment
            </h1>
            {turfDetails && (
                <div
                    style={{
                        marginBottom: "30px", // Increased spacing between sections
                        padding: "25px",
                        borderRadius: "12px",
                        background: "#2c2c2c",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)", // Enhanced box shadow for 3D effect
                        width: "100%",
                        maxWidth: "700px", // Consistent width for all boxes
                        textAlign: "center", // Center the text inside the box
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                    }}
                >
                    <h2
                        style={{
                            color: "#00d4ff", // Matching color for headers
                            fontSize: "26px",
                            fontWeight: "600",
                            marginBottom: "15px",
                        }}
                    >
                        Turf Details
                    </h2>
                    <p><strong>Name:</strong> {turfDetails.turfname}</p>
                    <p><strong>Location:</strong> {turfDetails.location}</p>
                    <p><strong>Price per Slot:</strong> ₹{turfDetails.price}</p>
                    <p><strong>Sports Available:</strong> {turfDetails.sports.join(", ")}</p>
                </div>
            )}
            {selectedSlots.length > 0 ? (
                <div
                    style={{
                        marginBottom: "30px",
                        padding: "25px",
                        borderRadius: "12px",
                        background: "#2c2c2c",
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)", // Enhanced box shadow for 3D effect
                        width: "100%",
                        maxWidth: "700px", // Consistent width for all boxes
                        textAlign: "center", // Center-aligning the slots
                        backgroundColor: "rgba(0, 0, 0, 0.9)",
                    }}
                >
                    <h2
                        style={{
                            color: "#00d4ff", // Matching color for headers
                            fontSize: "26px",
                            fontWeight: "600",
                            marginBottom: "15px",
                        }}
                    >
                        Selected Slots
                    </h2>
                    <ul
                        style={{
                            listStyleType: "none",
                            padding: 0,
                            fontSize: "16px",
                        }}
                    >
                        {selectedSlots.map((slot, index) => (
                            <li key={index} style={{ marginBottom: "10px" }}>
                                <strong>Date:</strong> {slot.date}, <strong>Time:</strong> {slot.time}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p style={{ textAlign: "center", fontSize: "18px", color: "#aaa" }}>
                    No slots selected.
                </p>
            )}
            <div
                style={{
                    marginBottom: "30px",
                    padding: "20px",
                    borderRadius: "12px",
                    background: "#2c2c2c",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)", // Enhanced box shadow for 3D effect
                    width: "100%",
                    maxWidth: "700px", // Consistent width for all boxes
                    textAlign: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                }}
            >
                <h3 style={{ fontSize: "28px", color: "#00d4ff", fontWeight: "bold" }}>
                    Total Amount: ₹{totalAmount}
                </h3>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    maxWidth: "700px", // Consistent width for all boxes and button
                }}
            >
                <button
                    style={{
                        background: "linear-gradient(135deg, #00d4ff, #007bff)", // Matching previous button color
                        color: "#fff",
                        fontSize: "18px",
                        padding: "12px 30px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.3s ease-in-out",
                        boxShadow: "0 6px 15px rgba(0, 0, 0, 1)", // Enhanced button shadow for 3D effect
                        width: "100%", // Same width as the boxes
                        borderColor: "black",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = "linear-gradient(135deg, #007bff, #0056b3)";
                        e.target.style.transform = "scale(1.05)";
                        e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = "linear-gradient(135deg, #00d4ff, #007bff)";
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.4)";
                    }}
                    // onClick={handlePayNow}
                    onClick={() => navigate("/payment")}

                >
                    Pay Now
                </button>
            </div>
        </div>
    );
}

export default ConfirmPayment;
