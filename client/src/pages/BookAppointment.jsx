import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import PaymentModal from "../components/PaymentModal";

function BookAppointment() {
  const [searchParams] = useSearchParams();

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Payment
  const [showPayment, setShowPayment] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");

  const [formData, setFormData] = useState({
    doctor: "",
    hospital: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });

  // Fetch Doctors
  useEffect(() => {
    fetchDoctors();
  }, []);

  // Auto Select Doctor
  useEffect(() => {
    if (doctors.length === 0) return;

    const doctorId = searchParams.get("doctor");

    if (!doctorId) return;

    const selectedDoctor = doctors.find(
      (doctor) => doctor._id === doctorId
    );

    if (selectedDoctor) {
      setFormData((prev) => ({
        ...prev,
        doctor: doctorId,
        hospital:
          selectedDoctor.hospital?._id ||
          selectedDoctor.hospital ||
          "",
      }));
    }
  }, [doctors, searchParams]);

  // Fetch Doctors
  // const fetchDoctors = async () => {
  //   try {
  //     const res = await api.get("/doctors");

  //     if (res.data.success) {
  //       setDoctors(res.data.doctors);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     alert("Unable to load doctors.");
  //   }
  // };

  // Fetch Doctors
const fetchDoctors = async () => {
  try {
    const res = await api.get("/doctors");

    console.log("Doctors API Response:", res.data);
    console.log("Doctors List:", res.data.doctors);

    if (res.data.success) {
      setDoctors(res.data.doctors);
    }
  } catch (error) {
    console.log("Error:", error);
    alert("Unable to load doctors.");
  }
};

  // Doctor Change
  const handleDoctorChange = (e) => {
    const doctorId = e.target.value;

    const selectedDoctor = doctors.find(
      (doctor) => doctor._id === doctorId
    );

    setFormData({
      ...formData,
      doctor: doctorId,
      hospital:
        selectedDoctor?.hospital?._id ||
        selectedDoctor?.hospital ||
        "",
    });
  };

  // Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.doctor ||
      !formData.hospital ||
      !formData.appointmentDate ||
      !formData.appointmentTime ||
      !formData.reason
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/appointments",
        formData
      );

      setAppointmentId(res.data.appointment._id);

      setShowPayment(true);

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Appointment booking failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedDoctor = doctors.find(
    (doctor) => doctor._id === formData.doctor
  );

  return (
        <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="card shadow">

            <div className="card-header bg-primary text-white">
              <h3 className="text-center">
                Book Appointment
              </h3>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                {/* Doctor */}

                <div className="mb-3">
                  <label className="form-label">
                    Select Doctor
                  </label>

                  <select
                    className="form-select"
                    value={formData.doctor}
                    onChange={handleDoctorChange}
                    disabled={!!searchParams.get("doctor")}
                    required
                  >

                    <option value="">
                      Choose Doctor
                    </option>

                    {doctors.map((doctor) => (

                      <option
                        key={doctor._id}
                        value={doctor._id}
                      >
                        {doctor.fullName} - {doctor.specialization}
                      </option>

                    ))}

                  </select>

                </div>

                {/* Hospital */}

                <div className="mb-3">

                  <label className="form-label">
                    Hospital
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={
                      selectedDoctor?.hospital?.name ||
                      selectedDoctor?.hospital?.hospitalName ||
                      selectedDoctor?.hospital ||
                      ""
                    }
                    readOnly
                  />

                </div>

                {/* Date */}

                <div className="mb-3">

                  <label className="form-label">
                    Appointment Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* Time */}

                <div className="mb-3">

                  <label className="form-label">
                    Appointment Time
                  </label>

                  <input
                    type="time"
                    className="form-control"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* Reason */}

                <div className="mb-3">

                  <label className="form-label">
                    Reason
                  </label>

                  <textarea
                    className="form-control"
                    rows="4"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Describe your health problem..."
                    required
                  ></textarea>

                </div>

                <button
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading
                    ? "Booking Appointment..."
                    : "Book Appointment"}
                </button>

              </form>

            </div>

          </div>

          {selectedDoctor && (

            <div className="card mt-4 shadow">

              <div className="card-header bg-success text-white">
                <h5>Doctor Details</h5>
              </div>

              <div className="card-body">

                <p>
                  <strong>Name :</strong> {selectedDoctor.fullName}
                </p>

                <p>
                  <strong>Specialization :</strong> {selectedDoctor.specialization}
                </p>

                <p>
                  <strong>Qualification :</strong> {selectedDoctor.qualification}
                </p>

                <p>
                  <strong>Experience :</strong> {selectedDoctor.experience} Years
                </p>

                <p>
                  <strong>Consultation Fee :</strong> ₹{selectedDoctor.consultationFee}
                </p>

                <p>
                  <strong>Hospital :</strong>{" "}
                  {selectedDoctor.hospital?.name ||
                    selectedDoctor.hospital?.hospitalName ||
                    selectedDoctor.hospital}
                </p>

                <p>
                  <strong>City :</strong>{" "}
                  {selectedDoctor.hospital?.city || "N/A"}
                </p>

              </div>

            </div>

          )}

          <PaymentModal
            show={showPayment}
            onClose={() => setShowPayment(false)}
            doctor={selectedDoctor}
            appointmentId={appointmentId}
          />

        </div>
      </div>
    </div>
  );
}

export default BookAppointment;