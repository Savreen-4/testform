import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) {
      navigate("/signup");
    } else {
      setUser(JSON.parse(u));
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div>
      <h2>Welcome, {user.title} {user.firstName} {user.lastName}</h2>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Date of Birth:</b> {user.dob}</p>
      <p><b>Middle Name:</b> {user.middleName || "—"}</p>

      <button
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}
