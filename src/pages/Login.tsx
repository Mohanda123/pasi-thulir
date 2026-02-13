import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#0f172a",
    }}
  >
    <div
      style={{
        backgroundColor: "#1e293b",
        padding: "30px",
        borderRadius: "10px",
        width: "300px",
        boxShadow: "0 0 15px rgba(0,0,0,0.5)",
      }}
    >
      <h2 style={{ color: "white", marginBottom: "20px" }}>
        Admin Login
      </h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            backgroundColor: "#0f172a",
            color: "white",
            border: "1px solid #334155",
            borderRadius: "5px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            backgroundColor: "#0f172a",
            color: "white",
            border: "1px solid #334155",
            borderRadius: "5px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#06b6d4",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login
        </button>
      </form>
    </div>
  </div>
);

};

export default Login;
