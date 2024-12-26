import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="video-container">
                <video autoPlay loop muted>
                    <source src="/src/assets/videos/home_background.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="landing">
                <h1 className="animate_animated animate_fadeInUp">Welcome to TurfBooking System!</h1>
                <p>Your Ultimate Sports Destination</p>
                <p>
                    Whether you're a casual player or a pro athlete, we make booking your favorite sports turf simple,
                    fast, and hassle-free.
                </p>
            </div>

            <div className="cta">
                <h2 className="animate_animated animate_bounceIn">Get Started Today!</h2>
                <a href="/signup" className="cta-button">Sign Up Now</a>
            </div>

            {/* Sports Icons */}
            <div className="sports-icons">
                <div className="ball-soccer"></div>
                <div className="ball-tennis"></div>
                <div className="ball-basketball"></div>
            </div>

            {/* Why Choose Us Section */}
            <section className="features">
                <h2 className="section-title">Why Choose Us?</h2>
                <div className="feature-items">
                    <div className="feature-item">
                        <img src="https://example.com/icon-easy-booking.png" alt="Easy Booking" />
                        <h3>Easy Booking</h3>
                        <p>Book your favorite turf in just a few clicks!</p>
                    </div>
                    <div className="feature-item">
                        <img src="https://example.com/icon-availability.png" alt="Availability Check" />
                        <h3>Real-time Availability</h3>
                        <p>Check the availability of turf instantly and plan your session.</p>
                    </div>
                    <div className="feature-item">
                        <img src="https://example.com/icon-secure-payment.png" alt="Secure Payment" />
                        <h3>Secure Payment</h3>
                        <p>Pay securely with multiple payment options.</p>
                    </div>
                </div>
            </section>

            {/* Turf Categories Section */}
            <section className="turf-categories">
                <h2 className="section-title">Explore Our Turf Categories</h2>
                <div className="category-items">
                    <div className="category-item">
                        <img src="https://example.com/football-turf.jpg" alt="Football Turf" />
                        <h3>Football</h3>
                        <p>Find the best football turfs near you and enjoy the game!</p>
                    </div>
                    <div className="category-item">
                        <img src="https://example.com/tennis-turf.jpg" alt="Tennis Turf" />
                        <h3>Tennis</h3>
                        <p>Book a tennis court and improve your skills with friends!</p>
                    </div>
                    <div className="category-item">
                        <img src="https://example.com/basketball-turf.jpg" alt="Basketball Turf" />
                        <h3>Basketball</h3>
                        <p>Find the perfect court for your next basketball match!</p>
                    </div>
                </div>
            </section>

            {/* Customer Reviews Section */}
            <section className="customer-reviews">
                <h2 className="section-title">Customer Reviews</h2>
                <div className="review-items">
                    <div className="review-item">
                        <h3>Chirag Chedda</h3>
                        <p>
                            <span className="stars">★★★★★</span>
                            Have been using this app to book cricket turfs, and it's the best I have come across. The turf options are great, and their customer support team is also very helpful and quick to respond. I regularly get offers and coupons, which gives a good discount for my turf bookings.
                        </p>
                        <span className="user-type">Pay N Play User</span>
                    </div>
                    <div className="review-item">
                        <h3>Jyothslina Paul</h3>
                        <p>
                            <span className="stars">★★★★★</span>
                            I've been using KheloMore for football training for my kid at the comfort of my residence. The coaches of KheloMore are really knowledgeable and treat kids with care and caution. Recommend 10/10.
                        </p>
                        <span className="user-type">Coaching User</span>
                    </div>
                    <div className="review-item">
                        <h3>Harsh Agarwal</h3>
                        <p>
                            <span className="stars">★★★★★</span>
                            Woke up with a hangover on a Saturday morning to a message on Bumble suggesting an offbeat date. So, I booked a badminton session on KheloMore. The app is sleek and fast, has plenty of options, time slots, and offers. It was a great first date.
                        </p>
                        <span className="user-type">Pay N Play User</span>
                    </div>
                </div>
                <p className="usage-info">Join 100+ users who trust and love using our app for booking their favorite sports turfs and training sessions!</p>
            </section>

            <style>
                {`
                    .home-container {
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                        justify-content: flex-start;
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
                        padding-top: 120px;
                        text-align: center;
                        position: relative;
                        z-index: 2;
                        color: white;
                        background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
                        padding: 20px;
                        border-radius: 8px;
                    }

                    .landing h1 {
                        font-size: 36px;
                        margin-bottom: 15px;
                        color: #00bcd4;
                    }

                    .landing p {
                        font-size: 18px;
                        line-height: 1.8;
                        margin-bottom: 20px;
                        max-width: 800px;
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .cta {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        margin-top: 50px;
                        padding: 20px;
                        background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
                        border-radius: 8px;
                    }

                    .cta h2 {
                        color: white;
                        margin-bottom: 15px;
                    }

                    .cta a {
                        text-decoration: none;
                        color: white;
                        background-color: #00bcd4;
                        padding: 10px 20px;
                        font-size: 18px;
                        font-weight: 500;
                        border-radius: 5px;
                        transition: background-color 0.3s;
                        margin-top: 10px;
                    }

                    .cta a:hover {
                        background-color: #008c9e;
                    }

                    .sports-icons {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        display: flex;
                        gap: 20px;
                        z-index: 2;
                    }

                    .sports-icons div {
                        width: 50px;
                        height: 50px;
                        background-size: cover;
                        animation: floating 4s ease-in-out infinite;
                    }

                    .ball-soccer {
                        background-image: url('https://example.com/soccer-ball.png');
                        animation-delay: 0s;
                    }

                    .ball-tennis {
                        background-image: url('https://example.com/tennis-ball.png');
                        animation-delay: 1s;
                    }

                    .ball-basketball {
                        background-image: url('https://example.com/basketball.png');
                        animation-delay: 2s;
                    }

                    .features {
                        background: rgba(0, 0, 0, 0.4); /* Semi-transparent background */
                        padding: 60px 20px;
                        text-align: center;
                        color: white;
                    }

                    .section-title {
                        font-size: 32px;
                        color: #00bcd4;
                        margin-bottom: 40px;
                    }

                    .feature-items {
                        display: flex;
                        justify-content: space-around;
                        gap: 30px;
                    }

                    .feature-item {
                        text-align: center;
                        max-width: 300px;
                    }

                    .feature-item img {
                        width: 60px;
                        height: 60px;
                        margin-bottom: 20px;
                    }

                    .feature-item h3 {
                        font-size: 22px;
                        margin-bottom: 10px;
                    }

                    .feature-item p {
                        font-size: 16px;
                        color: #fff;
                    }

                    .turf-categories {
                        background: rgba(0, 0, 0, 0.4); /* Semi-transparent background */
                        padding: 60px 20px;
                        text-align: center;
                        color: white;
                    }

                    .category-items {
                        display: flex;
                        justify-content: space-around;
                        gap: 30px;
                    }

                    .category-item {
                        text-align: center;
                        max-width: 300px;
                    }

                    .category-item img {
                        width: 100%;
                        height: 200px;
                        object-fit: cover;
                        margin-bottom: 20px;
                    }

                    .category-item h3 {
                        font-size: 22px;
                        margin-bottom: 10px;
                    }

                    .category-item p {
                        font-size: 16px;
                        color: #fff;
                    }

                    .customer-reviews {
                        background: rgba(0, 0, 0, 0.4); /* Semi-transparent background */
                        padding: 60px 20px;
                        text-align: center;
                        color: white;
                    }

                    .review-items {
                        display: flex;
                        flex-direction: column;
                        gap: 30px;
                        align-items: center;
                    }

                    .review-item {
                        text-align: left;
                        max-width: 800px;
                        background: rgba(255, 255, 255, 0.1);
                        padding: 20px;
                        border-radius: 8px;
                        color: #fff;
                    }

                    .review-item h3 {
                        font-size: 20px;
                        margin-bottom: 10px;
                    }

                    .review-item p {
                        font-size: 16px;
                    }

                    .review-item .stars {
                        color: gold;
                    }

                    .usage-info {
                        margin-top: 30px;
                        font-size: 18px;
                        color: #00bcd4;
                    }
                `}
            </style>
        </div>
    );
};

export default HomePage;