import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BG from '../assets/sports_11zon.jpg'; // Background image (adjust path if necessary)

const SetSlot = () => {
    const { turfid } = useParams();
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);



    const fetchSlots = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8081/admin/${turfid}`);

            // Check if the response contains the "No slots found" message
            if (response.data === "No slots found for the given turf!") {
                setMessage("No slots found for the given turf.");
                setSlots([]);  // Optionally set an empty array for slots
            } else {
                setSlots(response.data);  // Set the fetched slot data
            }

            setLoading(false);
        } catch (error) {
            console.error("Error fetching slots:", error);
            setMessage("Error fetching slots.");
            setLoading(false);
        }
    };


    const generateSlots = async () => {
        setLoading(true);
        try {

            const response = await axios.post(`http://localhost:8081/admin/${turfid}`);
            setMessage(response.data);
            setLoading(false);
            fetchSlots();
        } catch (error) {
            setMessage("Error generating slots.");
            setLoading(false);
        }
    };



    const toggleSlotStatus = async (date, time) => {
        setSelectedSlot({ date, time });
        setConfirmDialogVisible(true);
    };

    const confirmChangeStatus = async () => {
        setConfirmDialogVisible(false);
        const updatedSlots = slots.map(slot => {
            if (slot.date === selectedSlot.date) {
                slot.slots = slot.slots.map(s => {
                    if (s.time === selectedSlot.time) {
                        s.status = s.status === "available" ? "booked" : "available";
                    }
                    return s;
                });
            }
            return slot;
        });

        setSlots(updatedSlots);

        try {
            const response = await axios.put(`http://localhost:8081/admin/${turfid}?date=${selectedSlot.date}&time=${selectedSlot.time}`);
            setMessage(response.data);
        } catch (error) {
            console.error("Error updating slot status:", error);
            setMessage("Error updating slot status.");
        }
    };

    const cancelChangeStatus = () => {
        setConfirmDialogVisible(false);
    };

    useEffect(() => {
        fetchSlots();
    }, [turfid]);

    return (
        <div
            style={{
                padding: "30px",
                fontFamily: "Arial, sans-serif",
                background: "linear-gradient(135deg, #121212, #1f1f1f)",
                color: "#fff",
                minHeight: "100vh",
                backgroundImage: `url(${BG})`,
                alignItems: "center",
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    color: "#00d4ff",
                    fontSize: "36px",
                    fontWeight: "bold",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                    marginBottom: "40px",
                    border: "2px solid black",
                    padding: "10px",
                    width: "450px",
                    marginLeft: "480px",
                }}
            >
                Set Slots
            </h1>

            {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

            {!loading && message && <p style={{ textAlign: "center" }}>{message}</p>}

            {!slots.length && !loading && (
                <button
                    onClick={generateSlots}
                    style={{
                        background: "linear-gradient(135deg, #00d4ff, #007bff)",
                        color: "#fff",
                        fontSize: "18px",
                        padding: "14px 30px",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        transition: "all 0.3s ease-in-out",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
                        margin: "20px auto",
                        display: "block",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = "linear-gradient(135deg, #007bff, #0056b3)";
                        e.target.style.transform = "scale(1.05)";
                        e.target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = "linear-gradient(135deg, #00d4ff, #007bff)";
                        e.target.style.transform = "scale(1)";
                        e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.4)";
                    }}
                >
                    Generate Slots
                </button>
            )}

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                    marginBottom: "50px",
                }}
            >
                {slots.length > 0 ? (
                    slots.map((slot, index) => (
                        <div
                            key={index}
                            style={{
                                padding: "20px",
                                borderRadius: "12px",
                                backgroundColor: "rgba(0, 0, 0, 0.8)",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            <h3
                                style={{
                                    textAlign: "center",
                                    marginBottom: "20px",
                                    color: "#00d4ff",
                                    fontSize: "24px",
                                    fontWeight: "600",
                                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                {slot.date}
                            </h3>
                            <ul
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(6, 1fr)",
                                    gap: "20px",
                                    justifyItems: "center",
                                }}
                            >
                                {slot.slots.map((s, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            borderRadius: "12px",
                                            padding: "15px 20px",
                                            background: s.status === "available" ? "linear-gradient(135deg, #00d4ff, #007bff)" : "linear-gradient(135deg, #f44336, #e53935)",
                                            color: "#fff",
                                            textAlign: "center",
                                            cursor: s.status === "booked" ? "not-allowed" : "pointer",
                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                            transition: "all 0.3s ease-in-out",
                                            fontWeight: "bold",
                                        }}
                                        onClick={() => s.status !== "booked" && toggleSlotStatus(slot.date, s.time)}
                                        onMouseEnter={(e) => {
                                            e.target.style.background = s.status === "available" ? "linear-gradient(135deg, #007bff, #0056b3)" : "linear-gradient(135deg, #e53935, #c62828)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.background = s.status === "available" ? "linear-gradient(135deg, #00d4ff, #007bff)" : "linear-gradient(135deg, #f44336, #e53935)";
                                        }}
                                    >
                                        {s.time}: {s.status}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: "center", color: "#fff" }}>No slots available</p>
                )}
            </div>

            {confirmDialogVisible && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "black",
                            padding: "20px",
                            borderRadius: "8px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            textAlign: "center",
                        }}
                    >
                        <p>Are you sure you want to mark this slot as "booked"?</p>
                        <button
                            onClick={confirmChangeStatus}
                            style={{
                                backgroundColor: "#00d4ff",
                                color: "white",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#007bff";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#00d4ff";
                            }}
                        >
                            Yes
                        </button>
                        <button
                            onClick={cancelChangeStatus}
                            style={{
                                backgroundColor: "#f44336",
                                color: "white",
                                padding: "10px 20px",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                marginLeft: "10px",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#e53935";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#f44336";
                            }}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SetSlot;
