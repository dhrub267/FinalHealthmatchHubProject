import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", formData);

      console.log("========== LOGIN RESPONSE ==========");
      console.log(res.data);
      console.log("User :", res.data.user);
      console.log("Role :", res.data.user.role);
      console.log("Token :", res.data.token);

      // Save Token
      localStorage.setItem("token", res.data.token);

      // Save User
      login(res.data.user);

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      console.log("========== LOGIN ERROR ==========");
      console.log(error);
      console.log(error.response);

      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>

          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>

          <input
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;