import React, { useState, useEffect } from "react";
import axios from "axios";
import "../PaymentPage/PaymentPage.css";
import { FaGooglePay, FaCreditCard, FaWallet } from "react-icons/fa";

const PaymentPage = () => {
  const [tutors, setTutors] = useState([]); // List of added tutors
  const [selectedTutor, setSelectedTutor] = useState(null); // Selected tutor for payment
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [details, setDetails] = useState({
    upiId: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    bank: "",
    amount: "",
  });

  // Fetch tutors added by the student
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/students/tutors"); 
        setTutors(response.data);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };

    fetchTutors();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  // Initiate payment
  const initiatePayment = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/payments/initiate", {
        amount: parseInt(details.amount) * 100, // Convert to smallest currency unit
        currency: "INR",
        tutorId: selectedTutor.id, // Pass selected tutor
      });

      const { orderId, amount: orderAmount, currency } = response.data;

      const options = {
        key: "your_key_id", // Replace with Razorpay Key ID
        amount: orderAmount,
        currency,
        name: "Eklavya Tutoring",
        description: `Payment for ${selectedTutor.name}`,
        order_id: orderId,
        handler: async function (response) {
          await validatePayment(response);
        },
        prefill: {
          name: selectedTutor.name,
          email: "your.email@example.com",
          contact: "1234567890",
        },
        theme: {
          color: "#530a8f",
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
      } else {
        setPaymentStatus("Payment validation failed.");
      }
    } catch (error) {
      console.error("Error validating payment:", error);
      setPaymentStatus("Error validating payment. Please contact support.");
    }
  };

  return (
    <div className="payment-page-body">
      <header className="payment-header">
        <h1>Secure Your Learning Journey</h1>
        <p>Invest in Knowledge, Pay Seamlessly</p>
      </header>

      {/* Step 1: Select Tutor */}
      {!selectedTutor && (
        <div className="tutor-selection">
          <h2>Select a Tutor to Make Payment</h2>
          <ul>
            {tutors.map((tutor) => (
              <li key={tutor.id} onClick={() => setSelectedTutor(tutor)}>
                {tutor.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Step 2: Payment Section */}
      {selectedTutor && (
        <div className="payment-section">
          <h2>Payment for {selectedTutor.name}</h2>

          <input
            type="number"
            name="amount"
            placeholder="Enter Amount"
            value={details.amount}
            onChange={handleInputChange}
          />

          <div className="payment-method">
            <h3>Select Payment Method</h3>
            <div className="methods">
              <button onClick={() => setPaymentMethod("UPI")}>
                <FaGooglePay /> UPI
              </button>
              <button onClick={() => setPaymentMethod("Card")}>
                <FaCreditCard /> Credit/Debit Card
              </button>
              <button onClick={() => setPaymentMethod("Wallet")}>
                <FaWallet /> Wallet
              </button>
            </div>
          </div>

          {/* Payment Details Input */}
          {paymentMethod === "UPI" && (
            <input
              type="text"
              name="upiId"
              placeholder="Enter UPI ID"
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

          <button onClick={initiatePayment} disabled={!paymentMethod}>
            Pay Now
          </button>
        </div>
      )}

      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default PaymentPage;
