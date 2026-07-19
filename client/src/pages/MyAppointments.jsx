import { useEffect, useState } from "react";
import api from "../services/api";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments/my");

      if (res.data.success) {
        setAppointments(res.data.appointments);
      }
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
          "Unable to fetch appointments."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed":
        return "success";

      case "Pending":
        return "warning";

      case "Completed":
        return "primary";

      case "Cancelled":
        return "danger";

      default:
        return "secondary";
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading Appointments...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">

      <h2 className="text-center mb-4">
        My Appointments
      </h2>

      {appointments.length === 0 ? (

        <div className="alert alert-info text-center">

          No appointments found.

        </div>

      ) : (

        <div className="row">

          {appointments.map((appointment) => (

            <div
              className="col-md-6 mb-4"
              key={appointment._id}
            >

              <div className="card shadow h-100">

                <div className="card-header bg-primary text-white">

                  <h5 className="mb-0">

                    {appointment.doctor?.fullName}

                  </h5>

                </div>

                <div className="card-body">

                  <p>

                    <strong>Specialization :</strong>{" "}

                    {appointment.doctor?.specialization}

                  </p>

                  <p>

                    <strong>Hospital :</strong>{" "}

                    {appointment.hospital?.name}

                  </p>

                  <p>

                    <strong>City :</strong>{" "}

                    {appointment.hospital?.city}

                  </p>

                  <p>

                    <strong>Date :</strong>{" "}

                    {new Date(
                      appointment.appointmentDate
                    ).toLocaleDateString()}

                  </p>
                                    <p>

                    <strong>Time :</strong>{" "}

                    {appointment.appointmentTime}

                  </p>

                  <p>

                    <strong>Reason :</strong>{" "}

                    {appointment.reason}

                  </p>

                  <p>

                    <strong>Status :</strong>{" "}

                    <span
                      className={`badge bg-${getStatusBadge(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>

                  </p>

                </div>

                <div className="card-footer text-muted">

                  Booked On{" "}
                  {new Date(
                    appointment.createdAt
                  ).toLocaleDateString()}

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default MyAppointments;