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
      
      // Check if the response contains errors
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email); // Show email error
          if (password) generateError(password); // Show password error
        } else {
          // Redirect on successful login using userId
          const userId = data.user.id; // Assuming user ID is present in the response
          console.log(userId)
          navigate(`/${userId}`); // Navigate to /:userId
        }
      }
    } catch (err) {
      console.log("An error occurred during login: " + err);
      generateError("Login failed. Please try again."); // General error message
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginContainer}>
        {/* Update the title to "Login as Guest" */}
        <h2 style={styles.title}>Login as Guest</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input Field */}
          <div style={styles.inputContainer}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              style={styles.input}
              required
            />
          </div>

          {/* Password Input Field */}
          <div style={styles.inputContainer}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              style={styles.input}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" style={styles.button}>Login</button>

          {/* Navigation to Register */}
          <span style={styles.registerLink}>
            Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
          </span>
        </form>

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  loginContainer: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
  },
  inputContainer: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  registerLink: {
    display: "block",
    marginTop: "15px",
    fontSize: "14px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
};



export default Login;
