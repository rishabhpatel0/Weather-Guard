import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Pending() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(checkStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  async function checkStatus() {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://https://weather-guard-1.onrender.com/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const user = await res.json();

    if (user.status === "approved") {
      navigate("/approved");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-xl p-10 w-[500px] text-center">

        <div className="text-6xl mb-5">⏳</div>

        <h1 className="text-3xl font-bold">
          Request Submitted
        </h1>

        <p className="text-gray-600 mt-4">
          Your account is waiting for administrator approval.
        </p>

        <div className="mt-8 bg-yellow-100 rounded-lg p-4">

          <h2 className="font-semibold">
            Current Status
          </h2>

          <p className="text-yellow-700 font-bold mt-2">
            Pending Approval
          </p>

        </div>

        <p className="mt-8 text-gray-500 text-sm">
          This page updates automatically once your request is approved.
        </p>

      </div>

    </div>
  );
}

export default Pending;