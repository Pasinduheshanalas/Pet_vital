import React, { useState } from "react";
import TextInput from "../../../../components/text-input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logInWithEmailAndPassword } from "../../../../service/firebase/firebase-config"; // Replace with actual API URL

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      console.log("Email:", email);
      console.log("pass:", password);

      setLoading(true);
      // Call your authentication function here
      await logInWithEmailAndPassword(email, password, navigate, setError);
      await handleGetId();
      setLoading(false);
      console.log("Login successful");

      // navigate("/dashboard"); // Redirect user after successful login
    } catch (error: any) {
      setLoading(false);
      setError("Login failed. Please check your credentials.");
      console.error("Login failed:", error.message);
    }
  };

  const handleGetId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3010/api/v1/pet-clinic/center-id/${email}`
      );
      const petCenterId = response.data.uuid;
      localStorage.setItem("petCenterId", petCenterId);
      console.log("****************");
      console.log(response.data.uuid);
      console.log("****************");
    } catch (error) {
      console.error("Failed to fetch pet center ID:", error);
    }
  };

  return (
    <div className="login-form">
      <TextInput
        label="Email Address"
        placeholder="john.dowry@example.com"
        type="text"
        width="440px"
        height="50px"
        darkMode={false}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ backgroundColor: "#ffffff" }}
      />
      <TextInput
        label="Password"
        placeholder="************"
        type="password"
        width="440px"
        height="50px"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ backgroundColor: "#ffffff", padding: "10px" }}
      />
      {error && (
        <div style={{ color: "red" }}>
          {
            (typeof error === "string"
              ? error
              : (error as any)?.message || String(error)
            ).match(/\(auth\/([^)]+)\)/)?.[1]
          }
        </div>
      )}

      <div
        style={{
          border: "1px solid #000080",
          width: "440px",
          borderRadius: "8px",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#000080",
          color: "#ffffff",
          cursor: "pointer",
          opacity: loading ? 0.6 : 1,
          pointerEvents: loading ? "none" : "auto",
        }}
        onClick={handleLogin}
      >
        {loading ? "Logging in..." : "Log in"}
      </div>
    </div>
  );
};

export default LoginForm;
