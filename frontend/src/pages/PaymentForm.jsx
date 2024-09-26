import React, { useState } from "react";
import { CreditCard, Smartphone } from "lucide-react";

const Input = ({ id, placeholder, type = "text" }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    className="mt-1 p-2 border border-gray-300 rounded w-full bg-white focus:ring focus:ring-pink-300 focus:outline-none"
  />
);

const RadioButton = ({ value, checked, onChange, label, icon }) => (
  <div
    className={`rounded-md p-4 flex items-center justify-center cursor-pointer ${
      checked ? "bg-pink-500 text-white" : "bg-white text-pink-500"
    }`}
    onClick={() => onChange(value)}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </div>
);

const Select = ({ children }) => (
  <div className="relative mt-1">
    <select className="block w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-pink-300">
      {children}
    </select>
  </div>
);

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="w-full max-w-md mx-auto bg-pink-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <RadioButton
          value="card"
          checked={paymentMethod === "card"}
          onChange={setPaymentMethod}
          label="Card"
          icon={<CreditCard className="mr-2" />}
        />
        <RadioButton
          value="upi"
          checked={paymentMethod === "upi"}
          onChange={setPaymentMethod}
          label="UPI"
          icon={<Smartphone className="mr-2" />}
        />
      </div>

      {paymentMethod === "card" ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card number</label>
            <Input id="cardNumber" placeholder="1234 1234 1234 1234" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Expiration date</label>
              <Input id="expirationDate" placeholder="MM / YY" />
            </div>
            <div>
              <label htmlFor="securityCode" className="block text-sm font-medium text-gray-700">Security code</label>
              <Input id="securityCode" placeholder="CVC" />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">UPI ID</label>
            <Input id="upiId" placeholder="yourname@upi" />
          </div>
        </div>
      )}

      <div className="mt-4">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
        <Select>
          <option value="" disabled selected>Select a country</option>
          <option value="india">India</option>
          <option value="usa">USA</option>
          <option value="uk">UK</option>
          {/* Add more countries as needed */}
        </Select>
      </div>

      <button className="w-full mt-6 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded transition duration-200">
        Confirm Payment
      </button>
    </div>
  );
};

export default PaymentForm;
