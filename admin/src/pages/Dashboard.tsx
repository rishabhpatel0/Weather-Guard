import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";

function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingUsers: 0,
    approvedUsers: 0,
    telegramLinked: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:3000/users/stats",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setStats(data);
  }

    return (
    <Layout>
        <div className="min-h-screen bg-slate-100 p-8">

        <div className="mb-10">
            <h1 className="text-4xl font-bold text-slate-800">
            ☁️ WeatherGuard Dashboard
            </h1>

            <p className="text-slate-500 mt-2">
            Monitor users, approvals and Telegram integrations.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
           

            <p className="text-gray-500 mt-3">
                Total Users
            </p>

            <h2 className="text-5xl font-bold mt-2">
                {stats.totalUsers}
            </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
           

            <p className="text-gray-500 mt-3">
                Pending Users
            </p>

            <h2 className="text-5xl font-bold text-yellow-600 mt-2">
                {stats.pendingUsers}
            </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            

            <p className="text-gray-500 mt-3">
                Approved Users
            </p>

            <h2 className="text-5xl font-bold text-green-600 mt-2">
                {stats.approvedUsers}
            </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-cyan-500">
            <div className="text-4xl">🤖</div>

            <p className="text-gray-500 mt-3">
                Telegram Linked
            </p>

            <h2 className="text-5xl font-bold text-cyan-600 mt-2">
                {stats.telegramLinked}
            </h2>
            </div>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-10">

            <h2 className="text-2xl font-semibold mb-4">
            System Overview
            </h2>

            <p className="text-gray-600 leading-7">
            WeatherGuard is an invite-only weather alert platform.
            Administrators approve new users, users connect their
            Telegram account, and automated weather alerts are sent
            whenever severe weather conditions are detected.
            </p>

        </div>

        </div>
    </Layout>
    );

}

export default Dashboard;
