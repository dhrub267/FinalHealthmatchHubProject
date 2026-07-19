import { useEffect, useState } from "react";
import axios from "axios";

function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/hospitals");

      console.log("Hospital API Response:", res.data);

      if (res.data.success) {
        setHospitals(res.data.hospitals);
      } else {
        setHospitals([]);
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      setHospitals([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Hospitals...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Our Hospitals</h2>

      <div className="row">
        {hospitals.length > 0 ? (
          hospitals.map((hospital) => (
            <div className="col-md-4 mb-4" key={hospital._id}>
              <div className="card shadow-lg border-0 h-100">
                <div className="card-body">
                  <h4 className="text-primary">{hospital.name}</h4>

                  <hr />

                  <p>
                    <strong>Address:</strong> {hospital.address}
                  </p>

                  <p>
                    <strong>Phone:</strong> {hospital.phone}
                  </p>

                  <p>
                    <strong>Email:</strong> {hospital.email}
                  </p>

                  <button className="btn btn-success w-100 mt-3">
                    View Doctors
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <h4>No Hospitals Found</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hospitals;