import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const role = params.get("role");
    const status = params.get("status");

    if (!token) return;

    localStorage.setItem("token", token);

    if (role === "admin") {
      navigate("/dashboard");
      return;
    }

    if (status === "approved") {
      navigate("/approved");
      return;
    }

    navigate("/pending");
  }, []);

  return <h2>Logging you in...</h2>;
}

export default AuthCallback;