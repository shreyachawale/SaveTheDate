import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toast notifications

const Register = () => {
  const navigate = useNavigate();
  
  const [values, setValues] = useState({
    name: "",        // Added name field
    phone: "",       // Added phone field
    email: "",
    password: "",
  });

  const generateError = (err) => {
    toast.error(err, {
      position: "top-left",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:8000/register',
        { ...values },
        { withCredentials: true }
      );
      
      console.log(data);

      if (data) {
        if (data.errors) {
          const { name, phone, email, password } = data.errors; // Updated to include name and phone
          if (name) generateError(name);
          if (phone) generateError(phone);
          if (email) generateError(email);
          if (password) generateError(password);
        } else {
          navigate("/"); // Redirect to homepage or dashboard
        }
      }
    } catch (err) {
      console.log("An error occurred in axios: " + err);
      generateError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Register Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={values.name}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={values.phone}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
