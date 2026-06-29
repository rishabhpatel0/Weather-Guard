import { useEffect, useState } from "react";

function Approved() {
  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:3000/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProfile(await res.json());
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">

      <div className="bg-white rounded-2xl shadow-xl p-10 w-[600px] text-center">

        <div className="text-6xl mb-5">
          ✅
        </div>

        <h1 className="text-4xl font-bold text-green-600">
          Access Approved
        </h1>

        <p className="mt-5 text-gray-600">
          Your account has been approved.
        </p>

        <div className="bg-gray-100 rounded-xl p-6 mt-8">

          <h2 className="font-bold text-lg">
            Connect Telegram
          </h2>

          <p className="mt-3 text-gray-600">
            Send the following command to the WeatherGuard Telegram Bot:
          </p>

          <div className="bg-white rounded-lg border mt-5 p-4 font-mono break-all text-blue-700">

            {profile
              ? `/start ${profile._id}`
              : "Loading..."}

          </div>

        </div>

        <p className="text-sm text-gray-500 mt-8">
          After connecting Telegram, you'll automatically receive weather alerts.
        </p>

      </div>

    </div>
  );
}

export default Approved;
