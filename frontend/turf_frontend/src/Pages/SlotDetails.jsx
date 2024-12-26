import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BG from '../assets/sports_11zon.jpg';

function SlotSelection() {
    const { turfId } = useParams();
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8081/home/${turfId}`)
            .then((response) => {
                const { turfDetails, availableSlots } = response.data;
                console.log("Turf Details:", turfDetails);
                console.log("Available Slots:", availableSlots);

                localStorage.setItem("turfDetails", JSON.stringify(turfDetails));
                setAvailableSlots(availableSlots);
            });
    }, [turfId]);

    const isSlotInThePast = (date, time) => {
        const [slotDate, slotTime] = time.split('-'); // Split the time range into start and end
        const slotDateTime = new Date(`${date}T${slotDate}:00`);
        return slotDateTime < new Date();
    };

    const handleSlotClick = (date, time) => {
        if (isSlotInThePast(date, time)) return; // Prevent selection of past slots

        const selectedSlot = { date, time };
        setSelectedSlots((prevSelectedSlots) => {
            if (!prevSelectedSlots.some((slot) => slot.date === date && slot.time === time)) {
                return [...prevSelectedSlots, selectedSlot];
            }
            return prevSelectedSlots.filter((slot) => !(slot.date === date && slot.time === time));
        });
    };

    const handleProceedPayment = () => {
        console.log("Selected Slots for Payment:", selectedSlots);
        localStorage.setItem("selectedSlots", JSON.stringify(selectedSlots));
        navigate("/confirmpayment");
    };




    return (
        <div
            style={{
                padding: "30px",
                fontFamily: "Arial, sans-serif",
                background: "linear-gradient(135deg, #121212, #1f1f1f)",
                color: "#fff",
                minHeight: "100vh",
                backgroundImage: `url(${BG})`,
                alignItems:"center",


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
                    padding:"10px",
                    width:"450px",
                    marginLeft:"480px",

                }}
            >
                Select Your Slot
            </h1>

            {availableSlots.length > 0 ? (
                availableSlots.map((slot, index) => (
                    <div
                        key={index}
                        style={{
                            marginBottom: "50px",
                            padding: "20px",
                            borderRadius: "12px",
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        <div
                            style={{
                                border: "2px solid #00d4ff",
                                borderRadius: "12px",
                                padding: "20px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                                marginBottom: "20px",
                            }}
                        >
                            <h3
                                style={{
                                    textAlign: "center",
                                    marginBottom: "20px",
                                    color: "#00d4ff",
                                    fontSize: "24px",
                                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                                    fontWeight: "600",
                                }}
                            >
                                Date: {slot.date}
                            </h3>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(6, 1fr)",
                                    gap: "20px",
                                    justifyItems: "center",
                                }}
                            >
                                {slot.availableTimes.map((time, timeIndex) => (
                                    <div
                                        key={timeIndex}
                                        style={{
                                            border: "2px solid transparent",
                                            borderRadius: "12px",
                                            padding: "20px 15px",
                                            background: isSlotInThePast(slot.date, time)
                                                ? "linear-gradient(135deg, #3c3c3c, #1c1c1c)" // Default past slot color
                                                : selectedSlots.some(
                                                    (s) => s.date === slot.date && s.time === time
                                                )
                                                    ? "linear-gradient(135deg, #00d4ff, #007bff)" // Selected slot color
                                                    : "linear-gradient(135deg, #2c2c2c, #1c1c1c)", // Available slot color
                                            color: "#fff",
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            fontSize: "16px",
                                            whiteSpace: "nowrap",
                                            cursor: isSlotInThePast(slot.date, time)
                                                ? "not-allowed"
                                                : "pointer",
                                            transition: "all 0.3s ease-in-out",
                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                                            transform: selectedSlots.some(
                                                (s) => s.date === slot.date && s.time === time
                                            )
                                                ? "scale(1.05)"
                                                : "scale(1)",
                                        }}
                                        onClick={() =>
                                            !isSlotInThePast(slot.date, time) &&
                                            handleSlotClick(slot.date, time)
                                        }
                                        onMouseEnter={(e) => {
                                            if (!isSlotInThePast(slot.date, time)) {
                                                e.target.style.boxShadow = "0 6px 12px rgba(0, 212, 255, 0.9)";
                                            } else {
                                                e.target.style.background = "linear-gradient(135deg, #ff4d4d, #b30000)"; // Red for past slots
                                                e.target.style.boxShadow = "0 6px 12px rgba(255, 0, 0, 0.5)";
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isSlotInThePast(slot.date, time)) {
                                                e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
                                            } else {
                                                e.target.style.background = "linear-gradient(135deg, #3c3c3c, #1c1c1c)"; // Reset to past slot color
                                                e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
                                            }
                                        }}
                                    >
                                        {time}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p style={{ textAlign: "center", fontSize: "18px", color: "white" }}>
                    No available slots for this turf.
                </p>
            )}

            {selectedSlots.length > 0 && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                    <button
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
                        onClick={handleProceedPayment}
                    >
                        Proceed to Payment
                    </button>
                </div>
            )}
        </div>
    );
}

export default SlotSelection;
