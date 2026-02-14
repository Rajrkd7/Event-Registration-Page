import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import RegistrationForm from "./components/RegistrationForm";
import "./App.css";

const STORAGE_KEY = "EVENT_REGISTRATIONS";

function App() {
  // load data from localStorage on page load
  const [registrations, setRegistrations] = useState(() => {
    const data = localStorage.getItem(STORAGE_KEY);

    console.log("Loaded from localStorage:", data);

    if (data) {
      return JSON.parse(data);
    }
    return [];
  });

  // save data to localStorage whenever registrations change
  useEffect(() => {
    console.log("Saving to localStorage:", registrations);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
  }, [registrations]);

  return (
    <div className="app">
      <h1 className="page-title">Event Registration Page</h1>

      <Dashboard registrations={registrations} />

      <RegistrationForm
        registrations={registrations}
        setRegistrations={setRegistrations}
      />
    </div>
  );
}

export default App;
