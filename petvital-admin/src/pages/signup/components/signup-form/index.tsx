import React, { useState } from "react";
import TextInput from "../../../../components/text-input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logInWithEmailAndPassword } from "../../../../service/firebase/firebase-config"; // Replace with actual API URL
import { message } from "antd";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const handleSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3010/api/v1/pet-clinic/register/",
        {
          name: name, 
          email: email,
          password: password,
        }
      );
      console.log("Response:", response.data);
      setLoading(false);
      message.success("Signup successful! Please log in.");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      message.error("Something went wrong. Please try again!");
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="login-form">
      <TextInput
        label="Pet Clinic Name"
        placeholder="Enter your pet clinic name"
        type="text"
        width="440px"
        height="50px"
        darkMode={false}
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ backgroundColor: "#ffffff" }}
      />
      <TextInput
        label="Email"
        placeholder="john.dowry@example.com"
        type="text"
        width="440px"
        height="50px"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ backgroundColor: "#ffffff", padding: "10px" }}
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
      {error && <div style={{ color: "red" }}>{error}</div>}
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
        onClick={handleSignUp}
      >
        {loading ? "Please wait..." : "Sign up"}
      </div>
    </div>
  );
};

export default SignupForm;
