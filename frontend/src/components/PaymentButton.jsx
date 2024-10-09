import React from "react";
import MakePayment from "../pages/PaymentForm";

const PaymentButton = () => {
  const handleClick = () => {
    // Call the MakePayment function when the button is clicked
    MakePayment();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Complete Your Payment</h2>
      <p style={styles.text}>
        You are about to pay for "Test Wedding". Click the button below to proceed with the payment.
      </p>
      <button style={styles.button} onClick={handleClick}>
        Pay Now
      </button>
    </div>
  );
};

// Simple inline styles for the UI
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    maxWidth: "400px",
    margin: "2rem auto",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    marginBottom: "1rem",
    color: "#333",
  },
  text: {
    marginBottom: "1rem",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6772e5",
    color: "#fff",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default PaymentButton;
