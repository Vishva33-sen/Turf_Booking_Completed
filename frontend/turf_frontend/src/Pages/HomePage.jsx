import  { useEffect } from "react";
import { useInView } from 'react-intersection-observer'; // for scroll animations

const HomePage = () => {
    // Smooth scroll to "About Us" section
    useEffect(() => {
        const handleScroll = () => {
            const hash = window.location.hash;
            if (hash && document.querySelector(hash)) {
                const target = document.querySelector(hash);
                target.scrollIntoView({ behavior: "smooth" });
            }
        };
        window.addEventListener("hashchange", handleScroll);
        return () => window.removeEventListener("hashchange", handleScroll);
    }, []);

    // Intersection observer hook for scroll animation
    const { ref: aboutRef, inView: aboutInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: featuresRef, inView: featuresInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: testimonialsRef, inView: testimonialsInView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <div className="home-container">
            {/* Video Background Section */}
            <div className="video-container">
                <video autoPlay loop muted>
                    <source src="/images/home_background.mp4" type="video/mp4"/>

                </video>
            </div>

            {/* Landing Section */}
            <div className="landing">
                <h1>Welcome to Sports Den!</h1>
                <p>Your Ultimate Sports Destination</p>
                <p>
                    Whether you're a casual player or a pro athlete, TurfBooking makes booking sports facilities simple,
                    fast, and hassle-free.
                </p>
                <a href="#about" className="cta-button">Learn More</a>
            </div>

            {/* Turf Categories Section */}
            <div className="categories-section">
                <h2>Our Turf Categories</h2>
                <div className="categories-container">
                    <div className="category-item">
                        <img src="/images/cricket.jpg" alt="Cricket"/>
                        <h3>Cricket</h3>
                        <p>Book premium cricket turfs for your next match. Play like a pro!</p>
                    </div>
                    <div className="category-item">
                        <img src="/images/football.jpg" alt="Football"/>
                        <h3>Football</h3>
                        <p>Get your football game on with the best turfs for all levels of play.</p>
                    </div>
                    <div className="category-item">
                        <img src="/images/tennis.jpeg" alt="Tennis"/>
                        <h3>Tennis</h3>
                        <p>From casual play to tournaments, we offer top-notch tennis courts for everyone.</p>
                    </div>
                    <div className={"category-item"}>
                        <img src="/images/basketball.jpeg" alt="Basketball"/>
                        <h3>BasketBall</h3>
                        <p>From friendly games to intense matches, we provide premium basketball courts for players of all levels..</p>
                    </div>
                </div>
            </div>

            <div id="about" ref={aboutRef} className={`about-section ${aboutInView ? 'fade-in' : ''}`}
                 style={{marginTop: aboutInView ? '80px' : '0'}}>
                <h2>About Us</h2>
                <p>
                    At TurfBooking System, we are dedicated to providing a seamless experience for sports enthusiasts.
                    We partner with premium venues across the country to offer top-quality turfs for a variety of sports
                    including football, cricket, tennis, and more.
                </p>
                <p>
                    Our mission is to foster community, promote healthy living, and ensure easy access to sports
                    facilities. Join us today and elevate your game with hassle-free bookings!
                </p>
            </div>


            {/* Features Section */}
            <div ref={featuresRef} className={`features ${featuresInView ? 'fade-in' : ''}`}>
                <h2 className="features-title">Why Choose Us?</h2>
                <div className="features-container">
                    <div className="feature-item">
                        <h3>Easy Booking</h3>
                        <p>Book your turf in just a few clicks, anytime and anywhere. We make it simple for you!</p>
                    </div>
                    <div className="feature-item">
                        <h3>Instant Availability</h3>
                        <p>Get real-time updates on available slots at your favorite turfs. Never miss your game!</p>
                    </div>
                    <div className="feature-item">
                        <h3>Affordable Pricing</h3>
                        <p>Choose from a range of affordable options that fit your budget without compromising
                            quality.</p>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div ref={testimonialsRef} className={`testimonials ${testimonialsInView ? 'fade-in' : ''}`}>
                <h2 className="userreview">What Our Users Say</h2>
                <div className="testimonial-container">
                    <div className="testimonial-item">
                        <img src="/images/profile_photo.jpg" alt="Basketball"/>
                        <p>"The best turf booking experience! The platform is user-friendly, and I got the best turf at
                            the best price." - Rahul K.</p>
                        <div className="rating">⭐⭐⭐⭐⭐</div>
                    </div>
                    <div className="testimonial-item">
                        <img src="/images/profile_photo.jpg" alt="Basketball"/>
                        <p>"Super convenient! I was able to book a spot for my team within minutes. Highly recommended!"
                            - Priya S.</p>
                        <div className="rating">⭐⭐⭐⭐</div>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="cta">
                <h2>Get Started Today!</h2>
                <a href="/signup" className="cta-button">Sign Up Now</a>
            </div>

            <style>{`
    .home-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        justify-content: flex-start; /* Adjust to start from top */
        padding-top: 80px;
        color: white; 
        overflow: hidden;
    }
    .userreview{
      margin-left:185px;
    }
    .video-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: -1;
    }

    .video-container video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .landing {
        padding: 40px 20px;
        text-align: center;
        position: relative;
        z-index: 2;
        color: #f1f1f1;
        margin-top: 50px;
    }

    .landing h1 {
        font-size: 48px;
        color: #00bcd4;
        margin-bottom: 20px;
        font-family: 'Roboto', sans-serif;
        font-weight: bold;
    }

    .landing p {
        font-size: 22px;
        line-height: 1.6;
        margin-bottom: 30px;
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
        font-family: 'Arial', sans-serif;
    }

    .cta-button {
        margin-top: 20px;
        text-decoration: none;
        color: white;
        background-color: #008c9e;
        padding: 15px 50px;
        font-size: 20px;
        border-radius: 5px;
        transition: background-color 0.3s;
        cursor: pointer;
        display: inline-block;
        margin-left: auto;
        margin-right: auto;
    }

    .cta-button:hover {
        background-color: #006e7f;
    }

    .categories-section {
        text-align: center;
        margin-top: 50px;
        color: white;
    }

    .categories-container {
        display: flex;
        justify-content: center;
        gap: 40px;
        margin-top: 20px;
        flex-wrap: wrap; /* Ensure responsiveness */
    }

    .category-item {
        background-color: rgba(0, 0, 0, 0.6);
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        width: 250px;
        text-align: center;
        color: white;
        transition: transform 0.3s;
        margin-bottom: 30px; /* Add bottom margin for spacing */
    }

    .category-item img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 15px;
    }

    .category-item:hover {
        transform: scale(1.1);
    }

    .about-section, .features, .testimonials {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 1s, transform 1s;
        margin: 50px auto;
        max-width: 1200px;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    }

    .fade-in {
        opacity: 1;
        transform: translateY(0);
    }

    .about-section {
        background-color: rgba(255, 255, 255, 0.8);
        text-align: center;
        font-family: 'Arial', sans-serif;
        color:black;
        margin-top:40px;
    }

    .features-title {
        text-align: center;
        font-weight: 700;
        font-size: 36px;
        color: #fff;
        margin-bottom: 40px;
    }

    .features {
        background-color: rgb(125, 125, 125, 0.8);
        color: white;
    }

    .features-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 30px;
        width: 100%;
    }

    .feature-item {
        background-color: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        width: 300px;
        font-weight: bold;
        color: black;
        text-align: center;
        cursor: pointer;
        font-family: 'Arial', sans-serif;
    }

    .feature-item:hover {
        transform: scale(1.1);
        font-weight: bolder;
    }

    .testimonial-container {
        display: flex;
        gap: 40px;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .testimonial-item {
        text-align: center;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        color: white;
        max-width: 250px;
        margin-bottom: 30px; /* Add bottom margin for spacing */
    }

    .testimonial-item img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 12px;
        margin-bottom: 15px;
    }

    .testimonial-item .rating {
        color: #ff9900;
        font-size: 18px;
    }

    .cta {
        text-align: center;
        margin-top: 50px;
        margin-bottom: 90px;
    }

    .cta h2 {
        margin-bottom: 30px;
        font-size: 36px;
    }

    .cta-button {
        margin-top: 20px;
        padding: 15px 50px;
        background-color: #00bcd4;
        color: white;
        font-size: 20px;
        border-radius: 5px;
        text-decoration: none;
        transition: background-color 0.3s;
    }

    .cta-button:hover {
        background-color: #008c9e;
       
    }
`}</style>

        </div>
    );
};

export default HomePage;