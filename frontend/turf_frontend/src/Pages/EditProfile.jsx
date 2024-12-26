import {useState} from "react";
import BG from '../assets/sports_11zon.jpg';
const EditProfilePage = () => {
    const [user, setUser] = useState({
        username: "",
        phoneNumber: "",
        image: null,
    });

    const [message, setMessage] = useState(""); // To store dynamic messages
    const [messageColor, setMessageColor] = useState(""); // To store the color for messages

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === "image/jpeg" || file.type === "image/jpg")) {
            setUser((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
        } else {
            alert("Please upload a valid .jpg or .jpeg file.");
        }
    };

    const handleSaveChanges = async () => {
        const email = localStorage.getItem("email");
        const { username, phoneNumber, image } = user;

        try {
            // Update UserTable (username and phoneNumber)
            const userUpdateResponse = await fetch(
                `http://localhost:8081/home/update?email=${email}&username=${username}&mobileNumber=${phoneNumber}`,
                { method: "PUT" }
            );

            if (!userUpdateResponse.ok) {
                throw new Error("Failed to update user details.");
            }

            // Upload image to UserInfo
            if (image) {
                const formData = new FormData();
                formData.append("email", email);
                const fileInput = document.querySelector('input[type="file"]');
                formData.append("image", fileInput.files[0]);

                const imageUploadResponse = await fetch("http://localhost:8081/home/uploadImage", {
                    method: "POST",
                    body: formData,
                });

                if (!imageUploadResponse.ok) {
                    throw new Error("Failed to upload image.");
                }
            }

            setMessage("Update successful! Your changes have been saved.");
            setMessageColor("green");
        } catch (error) {
            setMessage("Error: " + error.message);
            setMessageColor("red");
        }
    };

    return (
        <div style={styles.pageContainer}>
            <div style={styles.container}>
                <h1 style={styles.title}>Edit Profile</h1>

                {/* Message */}
                {message && (
                    <div
                        style={{
                            ...styles.message,
                            backgroundColor: messageColor === "green" ? "#28a745" : "#dc3545", // Green for success, Red for error
                            color: "#fff", // White text for contrast
                        }}
                    >
                        {message}
                    </div>
                )}

                {/* Profile Form */}
                <div style={styles.form}>
                    <div style={styles.formField}>
                        <label style={styles.label}>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formField}>
                        <label style={styles.label}>Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={user.phoneNumber}
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.formField}>
                        <label style={styles.label}>Profile Image</label>
                        <input
                            type="file"
                            accept=".jpg,.jpeg"
                            onChange={handleImageUpload}
                            style={styles.inputFile}
                        />
                        {user.image && (
                            <img
                                src={user.image}
                                alt="Profile Preview"
                                style={styles.imagePreview}
                            />
                        )}
                    </div>
                </div>

                <button style={styles.saveButton} onClick={handleSaveChanges}>
                    Save Changes
                </button>
            </div>
        </div>
    );
};

// Internal CSS styles
const styles = {
    pageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: `url(${BG})`, // Set image separately
        backgroundSize: "cover", // Define size separately
        padding: "20px",
    },
    container: {
        padding: "30px",
        fontFamily: '"Poppins", Arial, sans-serif',
        maxWidth: "700px",
        width: "100%",
        backgroundColor: "rgba(30, 30, 47, 0.5)", // Slight transparency for background
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
    },
    title: {
        fontSize: "24px",
        marginBottom: "20px",
        textAlign: "center",
        color: "#ffffff", // White color for the title
    },
    form: {
        marginBottom: "20px",
    },
    formField: {
        marginBottom: "20px", // Space between form fields
        width: "680px",
    },
    label: {
        display: "block",
        marginBottom: "8px",
        fontSize: "16px",
        color: "white", // Light gray for text
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "4px",
        border: "1px solid #444", // Dark border
        fontSize: "14px",
        backgroundColor: "#2e2e3d", // Dark background for input fields
        color: "#e0e0e0", // Light text
    },
    inputFile: {
        marginBottom: "15px",
        color: "#e0e0e0", // Light text color for file input
        width: "680px",
    },
    imagePreview: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        objectFit: "cover",
        marginTop: "10px",
    },
    saveButton: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#29b6f6", // Blue button
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background 0.3s",
    },
    message: {
        marginTop: "15px",
        fontSize: "16px",
        fontWeight: "bold",
        textAlign: "center",
        padding: "10px", // Add padding to the message box
        borderRadius: "4px", // Rounded corners for message box
    },
};

export default EditProfilePage;
