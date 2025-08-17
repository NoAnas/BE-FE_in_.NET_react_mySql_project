import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { handleSignup } from "../store/items";

export default function SignupForm(setIsLoggedIn) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await handleSignup(
        formData.username,
        formData.password,
        setIsLoggedIn,
        navigate
      );
      console.log(formData);

      if (result.success) {
        setMessage("Signup successful!");
        setFormData({ username: "", password: "" });

        setTimeout(() => navigate("/login"), 1000);
      } else {
        setMessage(result.message || "Signup failed!");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong!");
    }
  };

  return (
    <div
      className="fullPageBlur"
      style={{
        width: "100%",
        backgroundColor: "#000000a1",
        height: "100vh",
        position: "absolute",
        top: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="signup-container" style={{ margin: "5px" }}>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        <div
          style={{ marginTop: "10px", textAlign: "center", fontSize: "0.9rem" }}
        >
          Already have an account?{" "}
          <Link style={{ color: "teal", cursor: "pointer" }} to={"/login"}>
            Login
          </Link>
        </div>

        {message && (
          <p
            className={
              message.includes("successful") ? "success-msg" : "error-msg"
            }
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
