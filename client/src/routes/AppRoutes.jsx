import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import VerifyOTP from "../pages/VerifyOTP";
import Doctors from "../pages/Doctors";
import Hospitals from "../pages/Hospitals";
import BookAppointment from "../pages/BookAppointment";
import MyAppointments from "../pages/MyAppointments";
import AdminDashboard from "../pages/AdminDashboard";
import AddHospital from "../pages/AddHospital";
import AddDoctor from "../pages/AddDoctor";
import NotFound from "../pages/NotFound";

import PrivateRoute from "../components/PrivateRoute";
import AdminRoute from "../components/AdminRoute";
import GuestRoute from "../components/GuestRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/hospitals" element={<Hospitals />} />

      {/* Guest Routes */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      <Route
        path="/verify-otp"
        element={
          <GuestRoute>
            <VerifyOTP />
          </GuestRoute>
        }
      />

      {/* Patient Routes */}
      <Route
        path="/book-appointment"
        element={
          <PrivateRoute>
            <BookAppointment />
          </PrivateRoute>
        }
      />

      <Route
        path="/appointments"
        element={
          <PrivateRoute>
            <MyAppointments />
          </PrivateRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/add-hospital"
        element={
          <AdminRoute>
            <AddHospital />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/add-doctor"
        element={
          <AdminRoute>
            <AddDoctor />
          </AdminRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;