import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface Props {
  children: ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isLoggedIn, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <div>Loading...</div>;
  if (!isLoggedIn) return <Navigate to="/auth" />;

  return <>{children}</>;
};

export default ProtectedRoute;
