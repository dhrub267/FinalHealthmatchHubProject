import { useEffect, useState } from "react";
import api from "../services/api";

function AddDoctor() {

  const [loading, setLoading] = useState(false);

  const [hospitals, setHospitals] = useState([]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    qualification: "",
    consultationFee: "",
    hospital: "",
    availableDays: "",
    availableTime: "",
  });

  useEffect(() => {
    loadHospitals();
  }, []);

  const loadHospitals = async () => {
    try {

      const res = await api.get("/hospitals");

      setHospitals(res.data.hospitals);

    } catch (error) {

      console.log(error);
      alert("Unable to load hospitals.");

    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const payload = {
        ...formData,
        availableDays: formData.availableDays
          .split(",")
          .map((day) => day.trim()),
      };

      const res = await api.post(
        "/doctors",
        payload
      );

      alert(res.data.message);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        specialization: "",
        experience: "",
        qualification: "",
        consultationFee: "",
        hospital: "",
        availableDays: "",
        availableTime: "",
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
          "Unable to add doctor."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
        <div className="container mt-5 mb-5">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          <div className="card shadow">

            <div className="card-header bg-primary text-white text-center">

              <h3>Add New Doctor</h3>

            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="row">

                  <div className="col-md-6 mb-3">

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

                  <div className="col-md-6 mb-3">

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

                </div>

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Specialization
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Qualification
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Experience (Years)
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label className="form-label">
                      Consultation Fee
                    </label>

                    <input
                      type="number"
                      className="form-control"
                      name="consultationFee"
                      value={formData.consultationFee}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Hospital
                  </label>

                  <select
                    className="form-select"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select Hospital
                    </option>

                    {hospitals.map((hospital) => (

                      <option
                        key={hospital._id}
                        value={hospital._id}
                      >
                        {hospital.name}
                      </option>

                    ))}

                  </select>

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Available Days
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="availableDays"
                    value={formData.availableDays}
                    onChange={handleChange}
                    placeholder="Monday, Tuesday, Friday"
                    required
                  />

                  <small className="text-muted">
                    Separate days using commas.
                  </small>

                </div>

                <div className="mb-3">

                  <label className="form-label">
                    Available Time
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="availableTime"
                    value={formData.availableTime}
                    onChange={handleChange}
                    placeholder="10:00 AM - 5:00 PM"
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading
                    ? "Adding Doctor..."
                    : "Add Doctor"}
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddDoctor;