import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function VerifyOTP() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const registerData = JSON.parse(
        localStorage.getItem("registerData")
      );

      if (!registerData) {
        alert("Registration data not found.");
        navigate("/register");
        return;
      }

      const res = await api.post("/auth/verify-otp", {
        ...registerData,
        otp,
      });

      alert(res.data.message);

      localStorage.removeItem("registerData");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      className="container mt-5"
      style={{ maxWidth: "500px" }}
    >
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Verify Email OTP
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">
              Enter OTP
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Verify OTP
          </button>

        </form>

      </div>
    </div>
  );
}

export default VerifyOTP;