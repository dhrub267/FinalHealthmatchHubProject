import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [doctorRes, hospitalRes, appointmentRes] =
        await Promise.all([
          api.get("/doctors"),
          api.get("/hospitals"),
          api.get("/appointments"),
        ]);

      setDoctors(doctorRes.data.doctors);
      setHospitals(hospitalRes.data.hospitals);
      setAppointments(appointmentRes.data.appointments);
    } catch (error) {
      console.log(error);
      alert("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/appointments/${id}`, {
        status,
      });

      alert(res.data.message);

      loadDashboard();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to update status."
      );
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Dashboard...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">

      <h2 className="text-center mb-4">
        Admin Dashboard
      </h2>

      {/* Summary Cards */}

      <div className="row">

        <div className="col-md-4 mb-3">

          <div className="card shadow border-primary">

            <div className="card-body text-center">

              <h5>Total Doctors</h5>

              <h2 className="text-primary">
                {doctors.length}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-3">

          <div className="card shadow border-success">

            <div className="card-body text-center">

              <h5>Total Hospitals</h5>

              <h2 className="text-success">
                {hospitals.length}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-4 mb-3">

          <div className="card shadow border-danger">

            <div className="card-body text-center">

              <h5>Total Appointments</h5>

              <h2 className="text-danger">
                {appointments.length}
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* Appointment Table */}

      <div className="card shadow mt-4">

        <div className="card-header bg-dark text-white">

          <h4 className="mb-0">
            Appointment Management
          </h4>

        </div>

        <div className="card-body table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-primary">

              <tr>

                <th>Patient</th>

                <th>Doctor</th>

                <th>Hospital</th>

                <th>Date</th>

                <th>Time</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {appointments.map((appointment) => (
                <tr key={appointment._id}>

                  <td>
                    {appointment.patient?.fullName}
                  </td>

                  <td>
                    {appointment.doctor?.fullName}
                  </td>

                  <td>
                    {appointment.hospital?.name}
                  </td>

                  <td>
                    {new Date(
                      appointment.appointmentDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {appointment.appointmentTime}
                  </td>

                  <td>
                    <span
                      className={`badge bg-${
                        appointment.status === "Pending"
                          ? "warning"
                          : appointment.status === "Confirmed"
                          ? "success"
                          : appointment.status === "Completed"
                          ? "primary"
                          : "danger"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  <td>
                                        <select
                      className="form-select"
                      defaultValue={appointment.status}
                      onChange={(e) =>
                        updateStatus(
                          appointment._id,
                          e.target.value
                        )
                      }
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>
                    </select>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
