import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Ensure you import the CSS for toast notifications

const Login = () => {
  const navigate = useNavigate();

  // State to manage email and password input
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // Function to generate and display error messages via Toast
  const generateError = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });

  // Handle form submission and API request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/guests/login",
        { ...values },
        { withCredentials: true }
      );
      
      console.log(data);

      // Check if the response contains errors
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email); // Show email error
          if (password) generateError(password); // Show password error
        } else {
          // Redirect on successful login
          navigate("/");
        }
      }
    } catch (err) {
      console.log("An error occurred during login: " + err);
      generateError("Login failed. Please try again."); // General error message
    }
  };

  return (
    <div className="container">
      <h2>Login to Your Account</h2>
      <form onSubmit={handleSubmit}>
        {/* Email Input Field */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            required
          />
        </div>

        {/* Password Input Field */}
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            }
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>

        {/* Navigation to Register */}
        <span>
          Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;
