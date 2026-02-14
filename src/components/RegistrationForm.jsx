import { useState } from "react";

function RegistrationForm({ registrations, setRegistrations }) {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    email: "",
    mobile: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // basic required field check
    if (
      form.name === "" ||
      form.email === "" ||
      form.mobile === "" ||
      form.gender === ""
    ) {
      setMessage("Please fill all required fields");
      setIsError(true);
      return;
    }

    // mobile number validation
    if (!/^\d{10}$/.test(form.mobile)) {
      setMessage("Mobile number should be 10 digits");
      setIsError(true);
      return;
    }

    // check duplicate email or mobile
    const duplicateFound = registrations.some((item) => {
      return (
        item.email.toLowerCase() === form.email.toLowerCase() ||
        item.mobile === form.mobile
      );
    });

    if (duplicateFound) {
      setMessage("Email or Mobile already registered");
      setIsError(true);
      return;
    }

    // create new registration object
    const newRegistration = {
      name: form.name,
      gender: form.gender,
      email: form.email,
      mobile: form.mobile,
      registeredAt: new Date().toISOString(),
    };

    // add to existing registrations
    setRegistrations((prev) => {
      return [...prev, newRegistration];
    });

    setMessage("Registration successful");
    setIsError(false);

    // reset form
    setForm({
      name: "",
      gender: "",
      email: "",
      mobile: "",
    });
  };

  return (
    <section className="form-section">
      <h3>Guest Registration</h3>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name *"
          value={form.name}
          onChange={handleChange}
        />

        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="mobile"
          placeholder="Mobile Number *"
          value={form.mobile}
          onChange={handleChange}
        />

        <button type="submit">Register</button>
      </form>

      {message && (
        <p className={isError ? "msg error" : "msg success"}>{message}</p>
      )}
    </section>
  );
}

export default RegistrationForm;
