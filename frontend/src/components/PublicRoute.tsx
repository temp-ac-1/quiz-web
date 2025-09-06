// src/components/PublicRoute.tsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <div>Loading...</div>;
  if (isLoggedIn) return <Navigate to="/" />; // redirect logged-in users away from login/signup

  return children;
};

export default PublicRoute;
