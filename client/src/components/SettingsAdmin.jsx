import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSave } from "react-icons/fa";
import "../assets/css/SettingsAdmin.css";

const SettingsAdmin = () => {
  const [settings, setSettings] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  // ✅ Fetch settings from backend
  const fetchSettings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/settings", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSettings(response.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
      setErrorMessage("Failed to fetch settings. Please try again.");
    }
  };

  // ✅ Handle settings change
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePasswordPolicyChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      passwordPolicy: {
        ...prev.passwordPolicy,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      notificationEvents: {
        ...prev.notificationEvents,
        [name]: checked,
      },
    }));
  };

  // ✅ Save settings to backend
  const handleSave = async () => {
    try {
      await axios.patch("http://localhost:5000/api/admin/settings", settings, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Settings saved successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      setErrorMessage("Failed to save settings. Please try again.");
    }
  };

  if (!settings) return <div>Loading...</div>;

  return (
    <div className="settings-admin-container">
      <h1>Admin Settings</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="settings-grid">
        {/* ✅ Dark Mode */}
        <div className="settings-card">
          <label>
            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleChange}
            />
            Enable Dark Mode
          </label>
        </div>

        {/* ✅ Language Selection */}
        <div className="settings-card">
          <label>
            Language:
            <select name="language" value={settings.language} onChange={handleChange}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </label>
        </div>

        {/* ✅ Notifications */}
        <div className="settings-card">
          <label>
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
            />
            Enable Email Notifications
          </label>
          <div className="notification-events">
            <label>
              <input
                type="checkbox"
                name="newReservations"
                checked={settings.notificationEvents.newReservations}
                onChange={handleNotificationChange} // ✅ Function is now used
              />
              New Reservations
            </label>
            <label>
              <input
                type="checkbox"
                name="cancellations"
                checked={settings.notificationEvents.cancellations}
                onChange={handleNotificationChange} // ✅ Function is now used
              />
              Reservation Cancellations
            </label>
            <label>
              <input
                type="checkbox"
                name="userRegistrations"
                checked={settings.notificationEvents.userRegistrations}
                onChange={handleNotificationChange} // ✅ Function is now used
              />
              User Registrations
            </label>
          </div>
        </div>

        {/* ✅ Password Policies */}
        <div className="settings-card">
          <label>
            Min Password Length:
            <input
              type="number"
              name="minLength"
              value={settings.passwordPolicy.minLength}
              onChange={handlePasswordPolicyChange}
              min="6"
            />
          </label>
        </div>

        {/* ✅ Auto-Approval */}
        <div className="settings-card">
          <label>
            <input
              type="checkbox"
              name="autoApproval"
              checked={settings.autoApproval}
              onChange={handleChange}
            />
            Auto-Approve Reservations
          </label>
        </div>

        {/* ✅ Save Button */}
        <button onClick={handleSave} className="save-button">
          <FaSave /> Save
        </button>
      </div>
    </div>
  );
};

export default SettingsAdmin;