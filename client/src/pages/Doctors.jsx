// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // function Doctors() {
// //   const [doctors, setDoctors] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchDoctors();
// //   }, []);

// //   const fetchDoctors = async () => {
// //     try {
// //       const res = await axios.get("http://localhost:5000/api/doctors");

// //       console.log("API Response:", res.data);

// //       if (res.data.success) {
// //         setDoctors(res.data.doctors);
// //       } else {
// //         setDoctors([]);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching doctors:", error);
// //       setDoctors([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="container mt-5 text-center">
// //         <h3>Loading Doctors...</h3>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mt-5">
// //       <h2 className="text-center mb-4">Our Doctors</h2>

// //       <div className="row">
// //         {doctors.length > 0 ? (
// //           doctors.map((doctor) => (
// //             <div className="col-md-4 mb-4" key={doctor._id}>
// //               <div className="card shadow-lg border-0 h-100">
// //                 <div className="card-body">
// //                   <h4 className="card-title text-primary">
// //                     {doctor.fullName}
// //                   </h4>

// //                   <hr />

// //                   <p>
// //                     <strong>Specialization:</strong>{" "}
// //                     {doctor.specialization}
// //                   </p>

// //                   <p>
// //                     <strong>Experience:</strong>{" "}
// //                     {doctor.experience} Years
// //                   </p>

// //                   <p>
// //                     <strong>Qualification:</strong>{" "}
// //                     {doctor.qualification}
// //                   </p>

// //                   <p>
// //                     <strong>Hospital:</strong>{" "}
// //                     {doctor.hospital}
// //                   </p>

// //                   <p>
// //                     <strong>Consultation Fee:</strong> ₹
// //                     {doctor.consultationFee}
// //                   </p>

// //                   <button className="btn btn-primary w-100 mt-3">
// //                     Book Appointment
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <div className="text-center">
// //             <h4>No Doctors Found</h4>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Doctors;

// import { useEffect, useState } from "react";
// import axios from "axios";

// function Doctors() {
//   const [doctors, setDoctors] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/doctors");

//       console.log("Doctors API:", res.data);

//       if (res.data.success) {
//         setDoctors(res.data.doctors || []);
//       } else {
//         setDoctors([]);
//       }
//     } catch (error) {
//       console.error(error);
//       setDoctors([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredDoctors = doctors.filter((doctor) => {
//     const name = (doctor.fullName || "").toLowerCase();
//     const specialization = (doctor.specialization || "").toLowerCase();

//     return (
//       name.includes(search.toLowerCase()) ||
//       specialization.includes(search.toLowerCase())
//     );
//   });

//   if (loading) {
//     return (
//       <div className="container mt-5 text-center">
//         <h3>Loading Doctors...</h3>
//       </div>
//     );
//   }

//   return (
//     <div className="container py-5">

//       <h2 className="text-center fw-bold mb-4">
//         <i className="bi bi-heart-pulse-fill text-danger me-2"></i>
//         Our Doctors
//       </h2>

//       <div className="row justify-content-center mb-4">
//         <div className="col-md-6">
//           <input
//             type="text"
//             className="form-control form-control-lg"
//             placeholder="Search by doctor name or specialization..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="row">

//         {filteredDoctors.length > 0 ? (

//           filteredDoctors.map((doctor) => (

//             <div className="col-lg-4 col-md-6 mb-4" key={doctor._id}>

//               <div className="card shadow border-0 h-100">

//                 <div className="card-body text-center">

//                   <img
//                     src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
//                     alt="Doctor"
//                     width="90"
//                     className="mb-3"
//                   />

//                   <h4 className="text-primary fw-bold">
//                     {doctor.fullName}
//                   </h4>

//                   <span className="badge bg-success mb-3">
//                     Available
//                   </span>

//                   <hr />

//                   <p>
//                     <strong>Specialization</strong><br />
//                     {doctor.specialization}
//                   </p>

//                   <p>
//                     <strong>Experience</strong><br />
//                     {doctor.experience} Years
//                   </p>

//                   <p>
//                     <strong>Qualification</strong><br />
//                     {doctor.qualification}
//                   </p>

//                   <p>
//                     <strong>Hospital</strong><br />
//                     {doctor.hospital?.hospitalName || doctor.hospital || "N/A"}
//                   </p>

//                   <p>
//                     <span className="badge bg-warning text-dark">
//                       ₹ {doctor.consultationFee}
//                     </span>
//                   </p>

//                   <div className="text-warning fs-5 mb-3">
//                     ★★★★★
//                   </div>

//                   <button className="btn btn-primary rounded-pill w-100">
//                     <i className="bi bi-calendar-check me-2"></i>
//                     Book Appointment
//                   </button>

//                 </div>

//               </div>

//             </div>

//           ))

//         ) : (

//           <div className="text-center">
//             <h4>No Doctors Found</h4>
//           </div>

//         )}

//       </div>

//     </div>
//   );
// }


// export default Doctors;


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors");

      console.log("Doctors API:", res.data);

      if (res.data.success) {
        setDoctors(res.data.doctors || []);
      } else {
        setDoctors([]);
      }
    } catch (error) {
      console.error(error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const name = (doctor.fullName || "").toLowerCase();
    const specialization = (doctor.specialization || "").toLowerCase();

    return (
      name.includes(search.toLowerCase()) ||
      specialization.includes(search.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading Doctors...</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <h2 className="text-center fw-bold mb-4">
        <i className="bi bi-heart-pulse-fill text-danger me-2"></i>
        Our Doctors
      </h2>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Search by doctor name or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="row">

        {filteredDoctors.length > 0 ? (

          filteredDoctors.map((doctor) => (

            <div className="col-lg-4 col-md-6 mb-4" key={doctor._id}>

              <div className="card shadow border-0 h-100">

                <div className="card-body text-center">

                  <img
                    src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
                    alt="Doctor"
                    width="90"
                    className="mb-3"
                  />

                  <h4 className="text-primary fw-bold">
                    {doctor.fullName}
                  </h4>

                  <span className="badge bg-success mb-3">
                    Available
                  </span>

                  <hr />

                  <p>
                    <strong>Specialization</strong><br />
                    {doctor.specialization}
                  </p>

                  <p>
                    <strong>Experience</strong><br />
                    {doctor.experience} Years
                  </p>

                  <p>
                    <strong>Qualification</strong><br />
                    {doctor.qualification}
                  </p>

                  <p>
                    <strong>Hospital</strong><br />
                    {doctor.hospital?.name ||
                      doctor.hospital?.hospitalName ||
                      doctor.hospital ||
                      "N/A"}
                  </p>

                  <p>
                    <span className="badge bg-warning text-dark">
                      ₹ {doctor.consultationFee}
                    </span>
                  </p>

                  <div className="text-warning fs-5 mb-3">
                    ★★★★★
                  </div>

                  <button
                    className="btn btn-primary rounded-pill w-100"
                    onClick={() =>
                      navigate(`/book-appointment?doctor=${doctor._id}`)
                    }
                  >
                    <i className="bi bi-calendar-check me-2"></i>
                    Book Appointment
                  </button>

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="text-center">
            <h4>No Doctors Found</h4>
          </div>

        )}

      </div>

    </div>
  );
}

export default Doctors;