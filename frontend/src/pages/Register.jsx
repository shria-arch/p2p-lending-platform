import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Borrower");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser({
        name,
        email,
        password,
        role,
      });

      console.log(response);

      alert("Registration successful!");

      navigate("/login");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed.");
      }
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Role</label>
          <br />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Borrower">Borrower</option>
            <option value="Investor">Investor</option>
          </select>
        </div>

        <br />

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;