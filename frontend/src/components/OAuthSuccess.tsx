import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { checkAuth } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth())
      .unwrap()
      .then(() => navigate("/")) // go to home
      .catch(() => navigate("/auth")); // fallback
  }, [dispatch, navigate]);

  return <div>Logging you in...</div>;
};

export default OAuthSuccess;
