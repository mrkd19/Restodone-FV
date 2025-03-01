import React, { useState } from 'react'; // Import React and useState hook
import { FaUserAlt } from 'react-icons/fa'; // Import user icon from react-icons
import '../assets/css/SignInForm.css'; // Import CSS for styling

const SignInForm = ({ onSubmit }) => { // Define SignInForm component with onSubmit prop
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input

  const handleSubmit = (e) => { // Handle form submission
    e.preventDefault(); // Prevent default form submission
    onSubmit(email, password); // Call onSubmit prop with email and password
  };

  return (
    <div className="signup-container"> {/* Container for the sign-in form */}
      <div className="signup-header"> {/* Header section */}
        <div className="logo-container"> {/* Container for the logo */}
          <FaUserAlt className="logo-icon" /> {/* User icon */}
        </div>
        <h2 className="signup-title">Sign In</h2> {/* Title */}
      </div>

      <form onSubmit={handleSubmit} className="signup-form"> {/* Form element */}
        <div className="form-group"> {/* Email input group */}
          <input
            id="email"
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state on change
            className="form-input"
          />
        </div>

        <div className="form-group"> {/* Password input group */}
          <input
            id="password"
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on change
            className="form-input"
          />
        </div>

        <div className="forgot-password"> {/* Forgot password link */}
          <button type="button" className="forgot-password-link">
            Forgot your password?
          </button>
        </div>

        <button type="submit" className="submit-button"> {/* Submit button */}
          SIGN IN
        </button>
      </form>
    </div>
  );
};

export default SignInForm; // Export SignInForm component