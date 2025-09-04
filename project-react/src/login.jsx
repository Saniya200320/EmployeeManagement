import { useState } from "react";
import { login } from "./api";

export default function Login({ onSuccess }) {
  const [username, setU] = useState("admin");
  const [password, setP] = useState("password");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(username, password);
      onSuccess?.();
    } catch {
      setErr("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        background: "linear-gradient(135deg, #e0eafc, #cfdef3)",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <form
        onSubmit={submit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          padding: "30px",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "350px",
          background: "#fff",
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#333" }}>
          Welcome Back
        </h2>

        <input
          value={username}
          onChange={(e) => setU(e.target.value)}
          placeholder="Username"
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
            transition: "border-color 0.3s",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#007bff")}
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            value={password}
            onChange={(e) => setP(e.target.value)}
            placeholder="Password"
            type={showPass ? "text" : "password"}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
          <button
            type="button"
            onClick={() => setShowPass((prev) => !prev)}
            style={{
              marginLeft: "8px",
              padding: "6px 10px",
              fontSize: "12px",
              cursor: "pointer",
              background: "#f0f0f0",
              border: "none",
              borderRadius: "6px",
            }}
          >
            {showPass ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#007bff",
            color: "#fff",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background 0.3s",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {err && (
          <span
            style={{
              color: "red",
              textAlign: "center",
              animation: "fadeIn 0.5s ease-in-out",
            }}
          >
            {err}
          </span>
        )}
      </form>
    </div>
  );
}
