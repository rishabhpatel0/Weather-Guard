import { useState } from "react";

function Weather() {
  const [city, setCity] = useState("Delhi");
  const [loading, setLoading] = useState(false);

  async function sendAlert() {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/weather/send-alerts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            city,
          }),
        }
      );

      const data = await response.json();

      alert(
        `Weather alert sent to ${data.users} user(s)!`
      );
    } catch (error) {
      alert("Failed to send weather alerts.");
    }

    setLoading(false);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Weather Alerts
      </h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-md">

        <label className="block mb-2 font-semibold">
          City
        </label>

        <input
          className="border p-3 rounded w-full mb-4"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          onClick={sendAlert}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full"
        >
          {loading
            ? "Sending..."
            : "Send Weather Alert"}
        </button>

      </div>
    </div>
  );
}

export default Weather;