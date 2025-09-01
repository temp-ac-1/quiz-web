// src/pages/OAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      navigate("/"); // or wherever you want to go after login
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>Redirecting...</p>;
};

export default OAuthSuccess;
