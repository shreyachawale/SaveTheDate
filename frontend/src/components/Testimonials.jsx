import React, { useState } from 'react'

// Mock data for initial testimonials
const initialTestimonials = [
  { id: 1, name: 'John Doe', message: 'Beautiful wedding! Congratulations to the happy couple!', image: '/placeholder.svg?height=100&width=100' },
  { id: 2, name: 'Jane Smith', message: 'What a wonderful celebration of love. Thank you for letting us be a part of it.', image: '/placeholder.svg?height=100&width=100' },
]

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(initialTestimonials)
  const [newTestimonial, setNewTestimonial] = useState({ name: '', message: '', image: '' })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasAttended, setHasAttended] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newTestimonial.name && newTestimonial.message) {
      setTestimonials([...testimonials, { 
        id: Date.now(), 
        ...newTestimonial, 
        image: newTestimonial.image || '/placeholder.svg?height=100&width=100'
      }])
      setNewTestimonial({ name: '', message: '', image: '' })
    }
  }

  const canAddTestimonial = isAuthenticated || hasAttended

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2em', marginBottom: '20px' }}>Wedding Testimonials</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
              />
              <strong>{testimonial.name}</strong>
            </div>
            <p style={{ color: '#666' }}>{testimonial.message}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', border: '1px solid #ccc', borderRadius: '8px', padding: '20px' }}>
        <h2>Add Your Testimonial</h2>
        {canAddTestimonial ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              placeholder="Your Name"
              value={newTestimonial.name}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
              required
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="url"
              placeholder="Your Image URL (optional)"
              value={newTestimonial.image}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, image: e.target.value })}
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <textarea
              placeholder="Your Message"
              value={newTestimonial.message}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, message: e.target.value })}
              required
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', resize: 'none' }}
            />
            <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px' }}>
              Submit Testimonial
            </button>
          </form>
        ) : (
          <p style={{ color: '#666' }}>You must be logged in or have attended the wedding to add a testimonial.</p>
        )}
      </div>

      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: isAuthenticated ? '#007BFF' : 'transparent',
            color: isAuthenticated ? 'white' : '#007BFF',
          }}
          onClick={() => setIsAuthenticated(!isAuthenticated)}
        >
          {isAuthenticated ? "Log Out" : "Log In"}
        </button>
        <button
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: hasAttended ? '#007BFF' : 'transparent',
            color: hasAttended ? 'white' : '#007BFF',
          }}
          onClick={() => setHasAttended(!hasAttended)}
        >
          {hasAttended ? "Unmark Attendance" : "Mark as Attended"}
        </button>
      </div>
    </div>
  )
}