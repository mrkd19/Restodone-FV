import React from 'react'; // Import React
import ReactDOM from 'react-dom'; // Import ReactDOM for rendering the application
import App from './App'; // Import the main App component
import './assets/css/tailwind.css'; // Import Tailwind CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

ReactDOM.render(
  <React.StrictMode> {/* Enable strict mode for highlighting potential problems */}
    <App /> {/* Render the App component */}
  </React.StrictMode>,
  document.getElementById('root') // Mount the app to the root element in the HTML
);