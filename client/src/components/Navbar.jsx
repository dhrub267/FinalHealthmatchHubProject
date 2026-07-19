import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container">

        <NavLink className="navbar-brand fw-bold fs-4" to="/">
          <i className="bi bi-heart-pulse-fill me-2 text-warning"></i>
          HealthMatch Hub
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "fw-bold text-warning" : ""}`
                }
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/doctors"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "fw-bold text-warning" : ""}`
                }
              >
                Doctors
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/hospitals"
                className={({ isActive }) =>
                  `nav-link ${isActive ? "fw-bold text-warning" : ""}`
                }
              >
                Hospitals
              </NavLink>
            </li>

            {token && (
              <li className="nav-item">
                <NavLink
                  to="/appointments"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "fw-bold text-warning" : ""}`
                  }
                >
                  My Appointments
                </NavLink>
              </li>
            )}

            {user?.role === "admin" && (
              <li className="nav-item">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "fw-bold text-warning" : ""}`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            )}

            {!token ? (
              <>
                <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                  <NavLink
                    className="btn btn-light rounded-pill px-4"
                    to="/login"
                  >
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Login
                  </NavLink>
                </li>

                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <NavLink
                    className="btn btn-warning rounded-pill px-4"
                    to="/register"
                  >
                    <i className="bi bi-person-plus-fill me-2"></i>
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                  <span className="badge bg-light text-primary fs-6 rounded-pill px-3 py-2">
                    <i className="bi bi-person-circle me-2"></i>
                    {user?.name}
                  </span>
                </li>

                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <button
                    className="btn btn-danger rounded-pill px-4"
                    onClick={logout}
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;