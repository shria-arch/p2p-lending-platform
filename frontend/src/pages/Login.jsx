import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      console.log("Login button clicked");

      const data = await loginUser(email, password);

      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful!");

      if (data.user.role === "Borrower") {
        navigate("/borrower");
      } else if (data.user.role === "Investor") {
        navigate("/investor");
      } else {
        navigate("/login");
      }

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#0f172a",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "30px",
          background: "#111827",
          borderRadius: "10px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
        }}
      >
       <h2
  style={{
    textAlign: "center",
    color: "#f8fafc",
    fontSize: "28px",
    marginBottom: "8px",
  }}
>
  Welcome Back
</h2>

<p
  style={{
    textAlign: "center",
    color: "#94a3b8",
    marginTop: "0",
    marginBottom: "20px",
  }}
>
  Sign in to your P2P Lending account
</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            marginBottom: "15px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
                <p style={{ textAlign: "center", marginTop: "15px" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;