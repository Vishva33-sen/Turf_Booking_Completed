import { useState } from 'react';
import { FaMoneyBillWave, FaWallet } from 'react-icons/fa'; // Importing Cash on Delivery and Wallet icons
import BG from "../../public/images/sports_11zon.jpg";
import cardImage from "../../public/images/creditcard.jpg"; // Add the image for Credit/Debit Card
import upiImage from "../../public/images/upi.png";
import axios from "axios"; // Add the image for UPI
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const PaymentPage = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [selectedPayment, setSelectedPayment] = useState('');
    const [showMessage, setShowMessage] = useState(false); // For displaying the success message
    const [isCardOrUpi, setIsCardOrUpi] = useState(false); // To track if it's Credit/Debit Card or UPI
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [upiId, setUpiId] = useState('');
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false); // For showing confirmation popup
    const [isConfirmed, setIsConfirmed] = useState(false);

    const validateCardDetails = () => {
        const { cardNumber, expiryDate, cvv } = cardDetails;

        // Card number must be 16 digits long and numeric
        if (!/^\d{16}$/.test(cardNumber)) {
            alert("Please enter a valid 16-digit card number.");
            return false;
        }

        // Expiry date should be in MM/YY format
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            alert("Please enter a valid expiry date (MM/YY).");
            return false;
        }

        const [month, year] = expiryDate.split('/').map(num => parseInt(num, 10));

        if (month < 1 || month > 12) {
            alert("Please enter a valid month (01-12).");
            return false;
        }

        // CVV should be 3 digits long
        if (!/^\d{3}$/.test(cvv)) {
            alert("Please enter a valid 3-digit CVV.");
            return false;
        }

        return true;
    };

    // Validation for UPI
    const validateUpiId = () => {
        // Basic check for UPI ID format (username@upi)
        const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
        if (!upiRegex.test(upiId)) {
            alert("Please enter a valid UPI ID.");
            return false;
        }
        return true;
    };

    const handlePaymentOptionChange = (option) => {
        setSelectedPayment(option);
        if (option === 'Credit/Debit Card' || option === 'UPI') {
            setIsCardOrUpi(true);
        } else {
            setIsCardOrUpi(false);
        }
        setShowMessage(false); // Reset success message on payment option change
    };

    const handleCardDetailsChange = (e) => {
        const { name, value } = e.target;
        setCardDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpiChange = (e) => {
        setUpiId(e.target.value);
    };

    const handleProceed = () => {
        if (selectedPayment === 'Credit/Debit Card') {
            if (!validateCardDetails()) return; // Validate card details
        } else if (selectedPayment === 'UPI') {
            if (!validateUpiId()) return; // Validate UPI ID
        }

        setShowConfirmationPopup(true); // Show confirmation popup on proceed
    };

    const handleConfirmation = (confirm) => {

        setShowConfirmationPopup(false); // Hide popup
        if (confirm) {
            setIsConfirmed(true); // Proceed with payment if confirmed
            handlePayNow();  // Call handlePayNow once the slot is booked successfully
        }
    };



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
                    turfname:storedTurfDetails.turfname,
                }));

                console.log("bookingDetailsArray", bookingDetailsArray);

                // Send each booking detail separately and update the slot status
                for (const bookingDetails of bookingDetailsArray) {
                    // Step 1: Send booking details to backend
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings/add`, {
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
                                `${import.meta.env.VITE_API_URL}/admin/${bookingDetails.turfid}?date=${bookingDetails.date}&time=${time}`
                        );
                            console.log("Slot status updated:", updateResponse.data);
                        } catch (error) {
                            console.error("Error updating slot status:", error);
                            alert("Error updating slot status.");
                        }
                    }
                }
                // Navigate to /locationandsports after success
                navigate("/locationandsports");
            } catch (error) {
                console.error("Error:", error);
                alert("Error while saving bookings. Please try again.");
            }
        } else {
            alert("No turf or slots selected, or email missing.");
        }
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.paymentWrapper}>
                <h2 style={styles.pageTitle}>Choose Payment Method</h2>
                <p style={styles.pageDescription}>
                    Select a payment option to complete your transaction.
                </p>

                <div style={styles.paymentOptions}>
                    {/* Credit/Debit Card Option */}
                    <div
                        style={selectedPayment === 'Credit/Debit Card' ? { ...styles.paymentOption, ...styles.selected, ...styles.card } : styles.paymentOption}
                        onClick={() => handlePaymentOptionChange('Credit/Debit Card')}
                    >
                        <img src={cardImage} alt="Credit/Debit Card" style={styles.image} />
                        <span style={styles.label}>Credit/Debit Card</span>
                    </div>

                    {/* UPI Option */}
                    <div
                        style={selectedPayment === 'UPI' ? { ...styles.paymentOption, ...styles.selected, ...styles.upi } : styles.paymentOption}
                        onClick={() => handlePaymentOptionChange('UPI')}
                    >
                        <img src={upiImage} alt="UPI" style={styles.image} />
                        <span style={styles.label}>UPI</span>
                    </div>

                    {/* Cash on Delivery Option with React Icon */}
                    <div
                        style={selectedPayment === 'On-field Payment' ? { ...styles.paymentOption, ...styles.selected, ...styles.cod } : styles.paymentOption}
                        onClick={() => handlePaymentOptionChange('On-field Payment')}
                    >
                        <FaMoneyBillWave style={styles.icon} />
                        <span style={styles.label}>On-Field Payment</span>
                    </div>


                </div>

                {/* Display form for Credit/Debit Card or UPI if selected */}
                {isCardOrUpi && selectedPayment === 'Credit/Debit Card' && (
                    <div style={styles.formWrapper}>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card Number"
                            value={cardDetails.cardNumber}
                            onChange={handleCardDetailsChange}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="expiryDate"
                            placeholder="Expiry Date (MM/YY)"
                            value={cardDetails.expiryDate}
                            onChange={handleCardDetailsChange}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            value={cardDetails.cvv}
                            onChange={handleCardDetailsChange}
                            style={styles.input}
                        />
                    </div>
                )}

                {isCardOrUpi && selectedPayment === 'UPI' && (
                    <div style={styles.formWrapper}>
                        <input
                            type="text"
                            placeholder="Enter UPI ID"
                            value={upiId}
                            onChange={handleUpiChange}
                            style={styles.input}
                        />
                    </div>
                )}

                <div style={styles.submitSection}>
                    <button style={styles.submitButton} onClick={handleProceed} disabled={!selectedPayment}>
                        Proceed with {selectedPayment || 'Payment'}
                    </button>
                </div>

                {/* Display success message if Cash on Delivery or Wallet is selected */}
                {showMessage && (
                    <div style={styles.successMessage}>
                        <h3>Slot Booked Successfully!</h3>
                    </div>
                )}
                {showConfirmationPopup && (
                    <div style={styles.logoutPopup}>
                        <div>Sure? You want to proceed payment?</div>
                        <button
                            style={{ ...styles.popupButton, ...styles.yesButton }}
                            onClick={() => handleConfirmation(true)}
                        >
                            Yes
                        </button>
                        <button
                            style={{ ...styles.popupButton, ...styles.noButton }}
                            onClick={() => handleConfirmation(false)}
                        >
                            No
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        backgroundImage: `url(${BG})`,
backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f7fc',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    boxSizing: 'border-box',
},
paymentWrapper: {
    backgroundColor: "rgba(30, 30, 47, 0.9)",
        padding: '30px 40px',
        borderRadius: '12px',
        width: '450px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
},
pageTitle: {
    fontSize: '28px',
        marginBottom: '15px',
        fontWeight: '600',
        color: '#fff',
},
pageDescription: {
    fontSize: '16px',
        color: '#ccc',
        marginBottom: '20px',
},
paymentOptions: {
    display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px',
        marginBottom: '30px',
},
paymentOption: {
    display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '15px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
},
selected: {
    backgroundColor: '#e0ffe0',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
},
image: {
    width: '50px',
        height: '50px',
        marginBottom: '10px',
},
icon: {
    fontSize: '50px',
        marginBottom: '10px',
        color: '#fcbf49',
},
label: {
    fontSize: '18px',
        fontWeight: '500',
        color: '#333',
},
submitSection: {
    marginTop: '20px',
},
submitButton: {
    padding: '12px 20px',
        background: "linear-gradient(135deg, #00d4ff, #007bff)",
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        width: '100%',
        opacity: 0.8,
        transition: '0.3s',
},
formWrapper: {
    marginTop: '20px',
},
input: {
    width: '95%',
        padding: '12px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
},
successMessage: {
    marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: '#fff',
        borderRadius: '5px',
        fontSize: '16px',
        textAlign: 'center',
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
        transition: "background 0.3s ease",
},
yesButton: {
    background: "linear-gradient(45deg, red, darkred)",
},
noButton: {
    background: "linear-gradient(45deg, blue, darkblue)",
},

// Specific colors for payment options
upi: {
    backgroundColor: '#0075FF',
        color: '#fff',
},
card: {
    backgroundColor: '#ff4d4d',
        color: '#fff',
},
cod: {
    backgroundColor: '#fcbf49',
        color: '#fff',
},
wallet: {
    backgroundColor: '#333',
        color: '#fff',
},
};

export default PaymentPage;