const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    specialization: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    // hospital: {
    //   type: String,
    //   required: true,
    // },

  hospital: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Hospital",
  required: true,
},

    consultationFee: {
      type: Number,
      required: true,
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Doctors() {
//   const [doctors, setDoctors] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/doctors");

//       if (res.data.success) {
//         setDoctors(res.data.doctors);
//       } else {
//         setDoctors([]);
//       }
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
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
//       <div className="container text-center mt-5">
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

//       <div className="row justify-content-center mb-5">
//         <div className="col-md-6">
//           <input
//             type="text"
//             className="form-control form-control-lg"
//             placeholder="Search Doctor or Specialization..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="row">

//         {filteredDoctors.length > 0 ? (

//           filteredDoctors.map((doctor) => (

//             <div className="col-lg-4 col-md-6 mb-4" key={doctor._id}>

//               <div className="card border-0 shadow h-100">

//                 <div className="card-body text-center">

//                   <img
//                     src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
//                     alt="Doctor"
//                     width="100"
//                     className="mb-3"
//                   />

//                   <h3 className="text-primary fw-bold">
//                     {doctor.fullName}
//                   </h3>

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
//                     {doctor.hospital?.name ||
//                       doctor.hospital ||
//                       "N/A"}
//                   </p>

//                   <p>
//                     <span className="badge bg-warning text-dark fs-6">
//                       ₹ {doctor.consultationFee}
//                     </span>
//                   </p>

//                   <div className="text-warning fs-4 mb-3">
//                     ★★★★★
//                   </div>

//                   <button
//                     className="btn btn-primary rounded-pill w-100"
//                     onClick={() =>
//                       navigate(`/appointments?doctor=${doctor._id}`)
//                     }
//                   >
//                     <i className="bi bi-calendar-check me-2"></i>
//                     Book Appointment
//                   </button>

//                 </div>

//               </div>

//             </div>

//           ))

//         ) : (

//           <div className="text-center">
//             <h3>No Doctors Found</h3>
//           </div>

//         )}

//       </div>

//     </div>
//   );
// }

// export default Doctors;