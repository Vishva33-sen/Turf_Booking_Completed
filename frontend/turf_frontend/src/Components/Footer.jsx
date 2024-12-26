const Footer = () => {
    const styles = {
        footer: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "#fff",
            textAlign: "center",
            marginTop: "auto", // Pushes the footer to the bottom
            width: "95%",
        },
        socialIcons: {
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginBottom: "10px",
        },
        iconLink: {
            color: "#fff",
            fontSize: "24px",
            textDecoration: "none",
            transition: "color 0.3s ease",
        },
        p: {
            margin: 0,
            fontSize: "14px",
        },
    };

    return (
        <div style={styles.footer}>
            <div style={styles.socialIcons}>
                <a
                    href="#youtube"
                    aria-label="YouTube"
                    style={styles.iconLink}
                    onMouseEnter={(e) => (e.target.style.color = "rgb(0,188,212)")}
                    onMouseLeave={(e) => (e.target.style.color = "#fff")}
                >
                    <i className="fab fa-youtube"></i>
                </a>
                <a
                    href="#facebook"
                    aria-label="Facebook"
                    style={styles.iconLink}
                    onMouseEnter={(e) => (e.target.style.color = "rgb(0,188,212)")}
                    onMouseLeave={(e) => (e.target.style.color = "#fff")}
                >
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a
                    href="#twitter"
                    aria-label="Twitter"
                    style={styles.iconLink}
                    onMouseEnter={(e) => (e.target.style.color = "rgb(0,188,212)")}
                    onMouseLeave={(e) => (e.target.style.color = "#fff")}
                >
                    <i className="fab fa-twitter"></i>
                </a>
                <a
                    href="#instagram"
                    aria-label="Instagram"
                    style={styles.iconLink}
                    onMouseEnter={(e) => (e.target.style.color = "rgb(0,188,212)")}
                    onMouseLeave={(e) => (e.target.style.color = "#fff")}
                >
                    <i className="fab fa-instagram"></i>
                </a>
            </div>
            <p style={styles.p}>&copy; 2024 TurfBooking System. All rights reserved.</p>
        </div>
    );
};

export default Footer;
