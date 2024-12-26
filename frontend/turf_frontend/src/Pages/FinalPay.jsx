import { useState } from 'react';
import { FaMoneyBillWave, FaWallet } from 'react-icons/fa'; // Importing Cash on Delivery and Wallet icons
import BG from "../assets/sports_11zon.jpg";
import cardImage from "../assets/creditcard.jpg"; // Add the image for Credit/Debit Card
import upiImage from "../assets/upi.png";
import axios from "axios"; // Add the image for UPI

const PaymentPage = () => {
    const [selectedPayment, setSelectedPayment] = useState('');
    const [showMessage, setShowMessage] = useState(false); // For displaying the success message
    const [isCardOrUpi, setIsCardOrUpi] = useState(false); // To track if it's Credit/Debit Card or UPI
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const [upiId, setUpiId] = useState('');

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
        if (selectedPayment === 'Cash on Delivery' || selectedPayment === 'Pay through Wallet') {
            setShowMessage(true);
            handlePayNow();  // Call handlePayNow once the slot is booked successfully
        } else if (selectedPayment === 'Credit/Debit Card' || selectedPayment === 'UPI') {
            if ((selectedPayment === 'Credit/Debit Card' && cardDetails.cardNumber && cardDetails.expiryDate && cardDetails.cvv) ||
                (selectedPayment === 'UPI' && upiId)) {
                setShowMessage(true);
                handlePayNow();  // Call handlePayNow once the payment is completed successfully

            } else {
                alert('Please fill in all the required details.');
            }
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
                        style={selectedPayment === 'Cash on Delivery' ? { ...styles.paymentOption, ...styles.selected, ...styles.cod } : styles.paymentOption}
                        onClick={() => handlePaymentOptionChange('Cash on Delivery')}
                    >
                        <FaMoneyBillWave style={styles.icon} />
                        <span style={styles.label}>On-Field Payment</span>
                    </div>

                    {/* Pay Through Wallet Option with React Icon */}
                    <div
                        style={selectedPayment === 'Pay through Wallet' ? { ...styles.paymentOption, ...styles.selected, ...styles.wallet } : styles.paymentOption}
                        onClick={() => handlePaymentOptionChange('Pay through Wallet')}
                    >
                        <FaWallet style={styles.icon} />
                        <span style={styles.label}>Pay through Wallet</span>
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
            </div>
        </div>
    );
};

const styles = {
    pageContainer: {
        backgroundImage: `url(${BG})`,
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
        gridTemplateColumns: 'repeat(2, 1fr)',
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
        backgroundColor: '#4CAF50',
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
        padding: '20px',
        backgroundColor: '#28a745',
        color: '#fff',
        borderRadius: '5px',
        fontSize: '18px',
        textAlign: 'center',
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
