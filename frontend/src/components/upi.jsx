import React, { useState } from 'react';
import QRCode from 'react-qr-code';

export default function PaymentForm() {
  const [name, setName] = useState('');
  const [upiName, setUpiName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [amount, setAmount] = useState('');
  const [upiUrl, setUpiUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (upiId && upiName && amount) {
      const generatedUpiUrl = `upi://pay?pa=${upiId}&pn=${upiName}&am=${amount}&cu=INR`
      setUpiUrl(generatedUpiUrl);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          width: '100%',
          maxWidth: '400px'
        }}
      >
        <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Generate UPI Payment QR Code</h1>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: '#4a5568' }}>Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              marginTop: '4px',
              padding: '8px',
              border: '1px solid #cbd5e0',
              borderRadius: '8px',
              width: '100%'
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: '#4a5568' }}>UPI Name</label>
          <input
            type="text"
            value={upiName}
            onChange={(e) => setUpiName(e.target.value)}
            style={{
              marginTop: '4px',
              padding: '8px',
              border: '1px solid #cbd5e0',
              borderRadius: '8px',
              width: '100%'
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: '#4a5568' }}>UPI ID</label>
          <input
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            style={{
              marginTop: '4px',
              padding: '8px',
              border: '1px solid #cbd5e0',
              borderRadius: '8px',
              width: '100%'
            }}
            required
          />
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: '#4a5568' }}>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              marginTop: '4px',
              padding: '8px',
              border: '1px solid #cbd5e0',
              borderRadius: '8px',
              width: '100%'
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#3b82f6',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
            width: '100%',
            cursor: 'pointer',
            border: 'none',
            fontWeight: '600',
            transition: 'background-color 0.3s'
          }}
        >
          Generate QR Code
        </button>
      </form>

      {upiUrl && (
        <div style={{ marginTop: '24px', backgroundColor: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Scan to Pay</h2>
          <div style={{ padding: '16px', backgroundColor: '#e2e8f0', borderRadius: '8px', display: 'inline-block' }}>
            <QRCode value={upiUrl} />
          </div>
          <a
            href={upiUrl}
            style={{
              marginTop: '16px',
              display: 'inline-block',
              backgroundColor: '#3b82f6',
              color: '#fff',
              padding: '12px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'background-color 0.3s',
              cursor: 'pointer'
            }}
          >
            Pay Now!
          </a>
        </div>
      )}
    </div>
  );
}