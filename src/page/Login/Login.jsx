import { useEffect, useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Navigate to home whenever currentUser changes to a valid user
  useEffect(() => {
    if (currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  const validateForm = () => {
    if (!email.includes("@")) {
      setError("Invalid email");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be 6+ characters");
      return false;
    }
    setError("");
    return true;
  };

  const signIn = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      // no need to navigate here, effect will handle it
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      setLoading(false);
      // no need to navigate here, effect will handle it
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        className="auth-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <input
        className="auth-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      {error && <p className="auth-error">{error}</p>}
      <button
        className="auth-button"
        onClick={signIn}
        disabled={loading}
      >
        {loading ? "Loading..." : "Login"}
      </button>
      <button
        className="auth-button google"
        onClick={signInWithGoogle}
        disabled={loading}
      >
        {loading ? "Loading..." : "Login with Google"}
      </button>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};
