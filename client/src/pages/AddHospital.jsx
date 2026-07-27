import { useState } from "react";
import api from "../services/api";

function AddHospital() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    departments: "",
    emergencyAvailable: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        departments: formData.departments
          .split(",")
          .map((dept) => dept.trim()),
      };

      const res = await api.post(
        "/hospitals",
        payload
      );

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        departments: "",
        emergencyAvailable: true,
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Unable to add hospital."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
        <div className="container mt-5 mb-5">

      <div className="row justify-content-center">

        <div className="col-md-8">

          <div className="card shadow">

            <div className="card-header bg-primary text-white text-center">

              <h3>Add New Hospital</h3>

            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Hospital Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Phone
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Address
                  </label>

                  <textarea
                    className="form-control"
                    rows="3"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      City
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      State
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Pincode
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Departments
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="departments"
                    value={formData.departments}
                    onChange={handleChange}
                    placeholder="Cardiology, Neurology, Orthopedics"
                    required
                  />

                  <small className="text-muted">
                    Separate departments using commas.
                  </small>

                </div>

                <div className="form-check mb-4">

                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="emergencyAvailable"
                    checked={formData.emergencyAvailable}
                    onChange={handleChange}
                  />

                  <label className="form-check-label">
                    Emergency Available
                  </label>

                </div>

                <button
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading
                    ? "Adding Hospital..."
                    : "Add Hospital"}
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddHospital;