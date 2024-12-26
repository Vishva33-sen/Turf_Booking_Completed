import { useEffect, useState } from "react";
import BG from '../assets/sports_11zon.jpg';

const WishlistPage = () => {
    const [wishlistTurfs, setWishlistTurfs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoverIndex, setHoverIndex] = useState(-1); // Tracks hover state

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const email = localStorage.getItem("email");
                if (!email) {
                    console.error("User email not found in localStorage.");
                    setLoading(false);
                    return;
                }

                const response = await fetch(`http://localhost:8081/home/wishlist/${email}`);
                if (!response.ok) {
                    console.error("Failed to fetch wishlist data:", response.statusText);
                    setLoading(false);
                    return;
                }

                const turfsData = await response.json();
                setWishlistTurfs(turfsData || []);
            } catch (error) {
                console.error("Error fetching wishlist data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    const containerStyle = {
        color: "white",
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingTop: "75px",
        minHeight: "100vh",
        padding: "0 15px", // Padding on left and right for spacing
        position: "relative", // To ensure the background image fills the container
        alignItems:"center",
    };

    const gridStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "30px", // Reduced gap for better alignment
        width: "100%", // Ensures grid takes full available width
        maxWidth: "1200px", // Maximum width for better readability
        margin: "30px auto", // Centers grid horizontally with spacing from top and bottom
    };

    const cardStyle = (isHovered) => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        border: `1px solid ${isHovered ? "rgb(0, 188, 212)" : "#ccc"}`,
        borderRadius: "8px",
        padding: "15px",
        backgroundColor: "rgba(0,0,0,0.8)",
        boxShadow: isHovered
            ? "0 5px 30px rgba(0, 188, 212, 1)"
            : "0 2px 5px rgba(0, 0, 0, 0.1)",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        width: "100%",
        maxWidth: "350px", // Adjusted width to fit better
        margin: "auto",
    });

    const imgContainerStyle = {
        height: "180px",
        width: "100%",
        borderRadius: "8px",
        backgroundColor: "#ddd",
        backgroundImage: "url('../assets/turf.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginBottom: "15px", // Increased margin for better separation
    };

    const titleStyle = {
        fontSize: "2.5rem",
        marginBottom: "50px", // Increased margin for better spacing
        textAlign: "center",
        color: "rgb(0,188,212)",
        fontWeight: "600",
        border: "2px solid black",
        padding:"10px",
        width:"250px",
    };

    const textStyle = {
        color: "#fff",
        fontSize: "1rem",
        marginBottom: "10px",
        textAlign: "center", // Centered text for a more polished look
    };

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>My Wishlist</h1>
            {loading ? (
                <p style={{ textAlign: "center", fontSize: "1.5rem", color: "#ccc" }}>Loading...</p>
            ) : wishlistTurfs.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "1.5rem", color: "#ccc" }}>
                    Your wishlist is empty.
                </p>
            ) : (
                <div style={gridStyle}>
                    {wishlistTurfs.map((turf, index) => (
                        <div
                            key={turf.turfid}
                            style={cardStyle(hoverIndex === index)}
                            onMouseEnter={() => setHoverIndex(index)} // Set hover index
                            onMouseLeave={() => setHoverIndex(-1)} // Reset hover index
                        >
                            <div style={imgContainerStyle}></div>
                            <h2 style={{ color: "#00bcd4", fontSize: "1.8rem", marginBottom: "15px", textAlign: "center" }}>
                                {turf.turfname}
                            </h2>
                            <p style={textStyle}><strong>Location:</strong> {turf.location}</p>
                            <p style={textStyle}><strong>Price:</strong> ₹{turf.price}</p>
                            <p style={textStyle}>
                                <strong>Sports:</strong>{" "}
                                {turf.sports ? JSON.parse(turf.sports).join(", ") : "N/A"}
                            </p>
                            <p style={textStyle}><strong>Contact:</strong> {turf.mobilenumber}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
