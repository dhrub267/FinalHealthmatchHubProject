import Hero from "../components/Hero";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(to right, #0d6efd, #4facfe)",
          color: "white",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="fw-bold display-4 mb-4">
                🏥 HealthMatch Hub
              </h1>

              <h3 className="mb-3">
                Connecting Patients with Trusted Healthcare
              </h3>

              <p className="lead">
                Find experienced doctors, discover trusted hospitals,
                and book appointments in just a few clicks.
              </p>

              <div className="mt-4">
                <Link
                  to="/book-appointment"
                  className="btn btn-light btn-lg me-3 mb-2"
                >
                  📅 Book Appointment
                </Link>

                <Link
                  to="/doctors"
                  className="btn btn-outline-light btn-lg mb-2"
                >
                  👨‍⚕️ Find Doctors
                </Link>
              </div>
            </div>

            <div className="col-lg-6 text-center mt-5 mt-lg-0">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2966/2966483.png"
                alt="Healthcare"
                className="img-fluid"
                style={{
                  maxHeight: "420px",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}

      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">
            Why Choose HealthMatch Hub?
          </h2>

          <div className="row g-4">
            <div className="col-md-3">
              <div className="card shadow h-100 text-center">
                <div className="card-body">
                  <h1>👨‍⚕️</h1>
                  <h4>Verified Doctors</h4>
                  <p>
                    Consult experienced and trusted doctors.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow h-100 text-center">
                <div className="card-body">
                  <h1>🏥</h1>
                  <h4>Trusted Hospitals</h4>
                  <p>
                    Explore top-rated hospitals near your location.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow h-100 text-center">
                <div className="card-body">
                  <h1>⚡</h1>
                  <h4>Instant Booking</h4>
                  <p>
                    Book appointments anytime without waiting.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow h-100 text-center">
                <div className="card-body">
                  <h1>🔒</h1>
                  <h4>Secure Platform</h4>
                  <p>
                    Your healthcare data remains safe and protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}

      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">
            Our Impact
          </h2>

          <div className="row text-center">

            <div className="col-md-3 mb-4">
              <h1 className="text-primary">👨‍⚕️</h1>
              <h2 className="fw-bold text-primary">500+</h2>
              <h5>Doctors</h5>
            </div>

            <div className="col-md-3 mb-4">
              <h1 className="text-success">🏥</h1>
              <h2 className="fw-bold text-success">100+</h2>
              <h5>Hospitals</h5>
            </div>

            <div className="col-md-3 mb-4">
              <h1 className="text-danger">📅</h1>
              <h2 className="fw-bold text-danger">20K+</h2>
              <h5>Appointments</h5>
            </div>

            <div className="col-md-3 mb-4">
              <h1 className="text-warning">😊</h1>
              <h2 className="fw-bold text-warning">50K+</h2>
              <h5>Happy Patients</h5>
            </div>

          </div>
        </div>
      </section>


      {/* Our Services */}

<section className="py-5">

  <div className="container">

    <h2 className="text-center fw-bold mb-3">
      Our Services
    </h2>

    <p className="text-center text-muted mb-5">
      We provide everything you need to manage your healthcare journey.
    </p>

    <div className="row g-4">

      <div className="col-md-4">

        <div className="card shadow border-0 h-100 text-center">

          <div className="card-body p-4">

            <h1 className="display-4">👨‍⚕️</h1>

            <h4 className="mt-3">
              Find Doctors
            </h4>

            <p className="text-muted">
              Search experienced doctors
              based on specialization and
              book appointments instantly.
            </p>

          </div>

        </div>

      </div>

      <div className="col-md-4">

        <div className="card shadow border-0 h-100 text-center">

          <div className="card-body p-4">

            <h1 className="display-4">🏥</h1>

            <h4 className="mt-3">
              Explore Hospitals
            </h4>

            <p className="text-muted">
              Discover trusted hospitals
              with modern facilities and
              experienced healthcare staff.
            </p>

          </div>

        </div>

      </div>

      <div className="col-md-4">

        <div className="card shadow border-0 h-100 text-center">

          <div className="card-body p-4">

            <h1 className="display-4">📅</h1>

            <h4 className="mt-3">
              Book Appointments
            </h4>

            <p className="text-muted">
              Schedule appointments
              quickly and manage them
              anytime from your account.
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>

{/* Testimonials */}

<section className="py-5 bg-light">

  <div className="container">

    <h2 className="text-center fw-bold mb-3">
      What Our Patients Say
    </h2>

    <p className="text-center text-muted mb-5">
      Trusted by thousands of happy patients.
    </p>

    <div className="row g-4">

      <div className="col-md-4">

        <div className="card shadow border-0 h-100">

          <div className="card-body">

            <h4>⭐⭐⭐⭐⭐</h4>

            <p className="mt-3">
              "Booking my appointment was quick and easy.
              The doctor was very professional."
            </p>

            <hr />

            <h5 className="mb-0">
              Rahul Sharma
            </h5>

            <small className="text-muted">
              Patient
            </small>

          </div>

        </div>

      </div>

      <div className="col-md-4">

        <div className="card shadow border-0 h-100">

          <div className="card-body">

            <h4>⭐⭐⭐⭐⭐</h4>

            <p className="mt-3">
              "HealthMatch Hub helped me find the
              best hospital near my location."
            </p>

            <hr />

            <h5 className="mb-0">
              Priya Singh
            </h5>

            <small className="text-muted">
              Patient
            </small>

          </div>

        </div>

      </div>

      <div className="col-md-4">

        <div className="card shadow border-0 h-100">

          <div className="card-body">

            <h4>⭐⭐⭐⭐⭐</h4>

            <p className="mt-3">
              "Amazing user experience and instant
              appointment confirmation."
            </p>

            <hr />

            <h5 className="mb-0">
              Aman Verma
            </h5>

            <small className="text-muted">
              Patient
            </small>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>

{/* Developer Section */}

<section
  className="py-5"
  style={{
    background: "#1e293b",
    color: "white",
  }}
>
  <div className="container">

    <h2 className="text-center fw-bold mb-5 text-white">
      Meet the Developer
    </h2>

    <div className="row align-items-center">

      {/* Left */}

      <div className="col-lg-4 text-center">

        <img
          src="/developer.jpg"
          alt="Developer"
          className="img-fluid rounded-circle shadow-lg"
        //   style={{
        //     width: "280px",
        //     height: "280px",
        //     objectFit: "cover",
        //     border: "6px solid white",
        //   }}
        style={{
  width: "280px",
  height: "280px",
  objectFit: "cover",
  border: "8px solid white",
  boxShadow: "0 0 30px rgba(0,123,255,0.5)",
}}
        />

      </div>

      {/* Right */}

      <div className="col-lg-8 mt-5 mt-lg-0">

        <h2 className="fw-bold text-white">
          Dhrub Kumar Thakur
        </h2>

        <h5 className="text-info mb-3">
          Full Stack MERN Developer
        </h5>

        <p className="lead">
          Passionate Full Stack Developer
          who loves building scalable web
          applications and teaching programming
          through Coding Commander.
        </p>

        {/* <div className="mt-4"> */}
        <div className="mt-4 d-flex flex-wrap justify-content-center gap-3">

          <a
            href="mailto:dhrubkumarthakur267@gmail.com"
            className="btn btn-outline-light"
          >
            <i className="bi bi-envelope-fill me-2"></i> Gmail
          </a>

          <a
            href="https://github.com/dhrub267"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-light"
          >
            <i className="bi bi-github me-2"></i> GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/dhrub-kumar-thakur-521510291"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-light"
          >
            <i className="bi bi-linkedin me-2"></i> LinkedIn
          </a>

          <a
            href="https://www.youtube.com/channel/UCrLWWb6ffa--fWi7FZ6K4Lw"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-danger"
          >
            <i className="bi bi-youtube me-2"></i> YouTube
          </a>

          <a
            href="https://www.instagram.com/dhrubkumarthakur267/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-warning"
          >
            <i className="bi bi-instagram me-2"></i> Instagram
          </a>

          <a
            href="https://www.facebook.com/share/18xDDPKjTw/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-primary"
          >
            <i className="bi bi-facebook me-2"></i> Facebook
          </a>

        </div>

        <hr className="my-4" />

        <h5 className="text-warning">
          ⚡ Powered by Coding Commander
        </h5>

        <p className="mb-0">
          Code • Learn • Grow 🚀
        </p>

      </div>

    </div>

  </div>
</section>

{/* Contact Section */}

<section className="py-5 bg-light">

  <div className="container">

    <div className="text-center mb-5">

      <h2 className="fw-bold">
        Contact Us
      </h2>

      <p className="text-muted">
        We'd love to hear from you. Feel free to contact us anytime.
      </p>

    </div>

    <div className="row">

      {/* Contact Information */}

      <div className="col-lg-5 mb-4">

        <div className="card shadow border-0 h-100">

          <div className="card-body p-4">

            <h3 className="mb-4">
              Get in Touch
            </h3>

            <p>
              📧 <strong>Email:</strong><br />
              dhrubkumarthakur267@gmail.com
            </p>

            <p>
              📞 <strong>Phone:</strong><br />
              +91 7209054039
            </p>

            <p>
              📍 <strong>Location:</strong><br />
              India
            </p>

            <hr />

            <p className="text-muted mb-0">
              We usually respond within 24 hours.
            </p>

          </div>

        </div>

      </div>

      {/* Contact Form */}

      <div className="col-lg-7">

        <div className="card shadow border-0">

          <div className="card-body p-4">

            <form>

              <div className="mb-3">

                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Message
                </label>

                <textarea
                  rows="5"
                  className="form-control"
                  placeholder="Write your message..."
                ></textarea>

              </div>

              <button
                className="btn btn-primary btn-lg"
                type="button"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>

{/* Footer */}

<footer
  className="py-5 text-white"
  style={{
    background: "#0f172a",
  }}
>
  <div className="container">

    <div className="row">

      {/* Company */}

      <div className="col-md-4 mb-4">

        <h3 className="fw-bold">
          🏥 HealthMatch Hub
        </h3>

        <p>
          Connecting Patients with Trusted Healthcare.
        </p>

      </div>

      {/* Quick Links */}

      <div className="col-md-4 mb-4">

        <h4>
          Quick Links
        </h4>

        <ul className="list-unstyled">

          <li>
            <Link
              to="/"
              className="text-decoration-none text-light"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/doctors"
              className="text-decoration-none text-light"
            >
              Doctors
            </Link>
          </li>

          <li>
            <Link
              to="/hospitals"
              className="text-decoration-none text-light"
            >
              Hospitals
            </Link>
          </li>

          <li>
            <Link
              to="/appointments"
              className="text-decoration-none text-light"
            >
              Appointments
            </Link>
          </li>

        </ul>

      </div>

      {/* Developer */}

      <div className="col-md-4">

        <h4>
          Developer
        </h4>

        <p className="mb-1">
          Dhrub Kumar Thakur
        </p>

        <p className="mb-1">
          📧 dhrubkumarthakur267@gmail.com
        </p>

        <p className="text-warning fw-bold">
          ⚡ Powered by Coding Commander
        </p>

      </div>

    </div>

    <hr className="border-secondary" />

    <div className="text-center">

      <p className="mb-0">
        © 2026 HealthMatch Hub | All Rights Reserved.
      </p>

      <small className="text-secondary">
        Made with ❤️ using MERN Stack
      </small>

    </div>

  </div>
</footer>

    </>
  );
}



export default Home;