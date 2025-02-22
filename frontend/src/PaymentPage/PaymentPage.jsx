import React, { useState } from "react";
import axios from "axios";
import "../PaymentPage/PaymentPage.css";
import { FaGooglePay, FaCreditCard, FaWallet } from "react-icons/fa";

const PaymentPage = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [details, setDetails] = useState({
    studentName: "",
    studentId: "",
    upiId: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    bank: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
    setStep(3);
  };

  const initiatePayment = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/payments/initiate", {
        amount: parseInt(details.amount) * 100, // Convert to smallest currency unit
        currency: "INR",
        sessionId: details.sessionId,
      });

      const { orderId, amount: orderAmount, currency } = response.data;

      const options = {
        key: "your_key_id", // Replace with Razorpay Key ID
        amount: orderAmount,
        currency,
        name: "Eklavya Tutoring",
        description: "Session Booking Payment",
        order_id: orderId,
        handler: async function (response) {
          await validatePayment(response);
        },
        prefill: {
          name: details.studentName,
          email: "your.email@example.com",
          contact: "1234567890",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      setPaymentStatus("Failed to initiate payment. Please try again.");
    }
  };

  const validatePayment = async (paymentResponse) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentResponse;

      const response = await axios.post("http://localhost:3000/api/payments/validate", {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
      });

      if (response.data.success) {
        setPaymentStatus("Payment Successful!");
        await linkPaymentToSession(razorpay_payment_id);
      } else {
        setPaymentStatus("Payment validation failed.");
      }
    } catch (error) {
      console.error("Error validating payment:", error);
      setPaymentStatus("Error validating payment. Please contact support.");
    }
  };

  const linkPaymentToSession = async (paymentId) => {
    try {
      const response = await axios.post("http://localhost:3000/api/payments/link-session", {
        sessionId: details.sessionId,
        paymentId,
      });

      if (response.data.success) {
        setPaymentStatus("Payment linked to session successfully!");
      } else {
        setPaymentStatus("Failed to link payment to session.");
      }
    } catch (error) {
      console.error("Error linking payment to session:", error);
      setPaymentStatus("Error linking payment. Please contact support.");
    }
  };

  const handlePayment = () => {
    initiatePayment();
  };

  return (
    <div className="payment-page-body">
      {/* Header Section */}
      <header className="payment-header">
        <h1>Secure Your Learning Journey</h1>
        <p>Invest in Knowledge, Pay Seamlessly</p>
      </header>

      {/* Student Details Section */}
      {step === 1 && (
        <div className="student-details">
          <h2>Step 1: Enter Your Details</h2>
          <input
            type="text"
            name="studentName"
            placeholder="Student Name"
            value={details.studentName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={details.studentId}
            onChange={handleInputChange}
          />
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {/* Payment Method Selection */}
      {step === 2 && (
        <div className="payment-method">
          <h2>Step 2: Select Payment Method</h2>
          <div className="methods">
            <button onClick={() => handlePaymentMethod("UPI")}>
              <FaGooglePay /> UPI
            </button>
            <button onClick={() => handlePaymentMethod("Card")}>
              <FaCreditCard /> Credit/Debit Card
            </button>
            <button onClick={() => handlePaymentMethod("Wallet")}>
              <FaWallet /> Wallet
            </button>
          </div>
          <button onClick={handleBack}>Back</button>
        </div>
      )}

      {/* Payment Details Section */}
      {step === 3 && (
        <div className="payment-details">
          <h2>Step 3: Enter Payment Details</h2>
          {paymentMethod === "UPI" && (
            <input
              type="text"
              name="upiId"
              placeholder="UPI ID"
              value={details.upiId}
              onChange={handleInputChange}
            />
          )}
          {paymentMethod === "Card" && (
            <>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={details.cardNumber}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="expiry"
                placeholder="Expiry Date (MM/YY)"
                value={details.expiry}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="cvv"
                placeholder="CVV"
                value={details.cvv}
                onChange={handleInputChange}
              />
            </>
          )}
          {paymentMethod === "Wallet" && (
            <input
              type="text"
              name="bank"
              placeholder="Wallet ID"
              value={details.bank}
              onChange={handleInputChange}
            />
          )}
          <button onClick={handlePayment}>Pay Now</button>
          <button onClick={handleBack}>Back</button>
        </div>
      )}

      {/* Payment Success Section */}
      {step === 4 && (
        <div className="payment-success">
          <h2>Thank You for Your Payment!</h2>
          <div className="flying-wallet">
            <FaWallet />
          </div>
          <button onClick={() => setStep(1)}>Back to Dashboard</button>
        </div>
      )}

      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default PaymentPage;
