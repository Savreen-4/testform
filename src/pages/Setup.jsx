import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "mr",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    tnc: false,
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!form.firstName.trim() || !nameRegex.test(form.firstName))
      return "First Name is required and must contain only letters.";

    if (form.middleName && !nameRegex.test(form.middleName))
      return "Middle Name must contain only letters.";

    if (!form.lastName.trim() || !nameRegex.test(form.lastName))
      return "Last Name is required and must contain only letters.";

    if (!emailRegex.test(form.email))
      return "Invalid email address.";

    if (!form.password || form.password.length < 6)
      return "Password must be at least 6 characters.";

    if (form.password !== form.confirmPassword)
      return "Passwords do not match.";

    if (!form.dob) return "Date of Birth is required.";
    const age = new Date().getFullYear() - new Date(form.dob).getFullYear();
    if (age < 24) return "You must be 24 years or older.";

    if (!form.tnc) return "You must accept Terms & Conditions.";

    return null;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      alert(error);
      return;
    }
    localStorage.setItem("user", JSON.stringify(form));
    navigate("/welcome");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "300px",
          background: "#f9f9f9",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Signup</h2>

        <select name="title" value={form.title} onChange={onChange}>
          <option value="mr">Mr</option>
          <option value="ms">Ms</option>
          <option value="mrs">Mrs</option>
        </select>

        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={onChange}
        />
        <input
          name="middleName"
          placeholder="Middle Name (optional)"
          value={form.middleName}
          onChange={onChange}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={onChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={onChange}
        />
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={onChange}
        />

        <label style={{ fontSize: "14px" }}>
          <input
            type="checkbox"
            name="tnc"
            checked={form.tnc}
            onChange={onChange}
          />
          &nbsp; I accept Terms & Conditions
        </label>

        <button type="submit" style={{ padding: "8px", cursor: "pointer" }}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
