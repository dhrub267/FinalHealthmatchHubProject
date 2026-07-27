import api from "../services/api";

function PaymentModal({
  show,
  onClose,
  doctor,
  appointmentId,
}) {
  if (!show || !doctor) return null;

  const handlePayment = async () => {
    try {
      const res = await api.post("/payments/create", {
        appointment: appointmentId,
        amount: doctor.consultationFee,
      });

      alert(res.data.message);
      onClose();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Payment failed."
      );
    }
  };

  return (
    <div
      className="modal d-block"
      style={{ background: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">

          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">
              PhonePe Payment
            </h5>

            <button
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body text-center">

            <h4>{doctor.fullName}</h4>

            <h5 className="text-primary">
              ₹{doctor.consultationFee}
            </h5>

            <img
              src="/phonepe-qr.png"
              alt="PhonePe QR"
              width="250"
              className="img-fluid my-3"
            />

            <p>
              Scan this QR using PhonePe and complete
              your payment.
            </p>

            <button
              className="btn btn-success w-100"
              onClick={handlePayment}
            >
              I Have Paid
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default PaymentModal;