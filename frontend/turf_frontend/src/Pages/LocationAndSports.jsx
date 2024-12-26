import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BG from '../assets/sports_11zon.jpg';

const LocationAndSports = () => {
    const [locations, setLocations] = useState([]);
    const [sports, setSports] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [hoveredItem, setHoveredItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch locations from backend
        axios.get("http://localhost:8081/home/locations")
            .then((response) => setLocations(response.data))
            .catch((error) => console.error("Error fetching locations:", error));

        // Fetch sports from backend
        axios.get("http://localhost:8081/home/sports")
            .then((response) => setSports(response.data))
            .catch((error) => console.error("Error fetching sports:", error));
    }, []);

    const handleSportClick = (location, sport) => {
        console.log(location);
        console.log(sport);
        if (location && sport) {
            navigate(`/turfs?location=${location}&sport=${sport}`);
        } else {
            alert("Please select a location first!");
        }
    };

    // Function to get the image path based on the sport name
    const getSportImage = (sport) => {
        const sportImageMap = {
            Tennis: "tennis.jpeg",
            Football: "football.jpg",
            Volleyball: "volleyball.jpg",
            Badminton: "badminton.jpg",
            Cricket: "cricket.jpg",
            Basketball: "basketball.jpeg",
        };

        // Default image if the sport is not found in the map
        return `/images/${sportImageMap[sport] || "default.jpg"}`;
    };

    // Inline styling objects
    const bodyStyle = {
        fontFamily: "'Roboto', sans-serif",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "black",
        backgroundImage: `url(${BG})`,
    };

    const locSportPageStyle = {
        background: "rgba(0, 0, 0, 0.6)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        boxSizing: "border-box",
        borderRadius: "15px",
        overflow: "hidden",
    };

    const titleStyle = {
        marginTop: "10px",
        fontSize: "36px",
        color: "rgb(0,188,212)",
        fontWeight: "bold",
        textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
        border: "2px solid black",
        padding:"10px",
    };

    const dropdownContainerStyle = {
        marginTop: "30px",
        width: "100%",
        maxWidth: "300px",

    };

    const dropdownStyle = {
        padding: "12px 15px",
        fontSize: "20px",
        width: "100%",
        borderRadius: "8px",
        border: "1px solid #ccc",
        backgroundColor: "rgb(0,188,212)",
        color: "black",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        fontFamily: "bold",
    };

    const gridContainerStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "40px",
        marginTop: "40px",
        width: "100%",
        maxWidth: "1200px",
    };

    const gridItemStyle = (isHovered) => ({
        backgroundColor: "white",
        borderRadius: "12px",
        textAlign: "center",
        cursor: "pointer",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: isHovered ? "translateY(-10px)" : "none",
        boxShadow: isHovered ? "6px 12px 24px rgba(0, 188, 212, 1)" : "0 4px 15px rgba(0, 0, 0, 0.2)",
    });

    const sportImageStyle = {
        width: "100%",
        height: "180px",
        objectFit: "fill",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
    };

    return (
        <div style={bodyStyle}>
            <div style={locSportPageStyle}>
                <h2 style={titleStyle}>Select Location and Sport</h2>
                <div style={dropdownContainerStyle}>
                    <select
                        style={dropdownStyle}
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                        <option value="">Select Location</option>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={gridContainerStyle}>
                    {sports.length > 0 ? (
                        sports.map((sport, index) => (
                            <div
                                key={index}
                                style={gridItemStyle(hoveredItem === index)}
                                onClick={() => handleSportClick(selectedLocation, sport)}
                                onMouseEnter={() => setHoveredItem(index)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <img
                                    src={getSportImage(sport)}
                                    alt={sport}
                                    style={sportImageStyle}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No sports available...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LocationAndSports;
