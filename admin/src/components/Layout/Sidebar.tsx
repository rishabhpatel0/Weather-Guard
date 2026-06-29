import "./Sidebar.css";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <h2 className="logo">☁️ WeatherGuard</h2>

      <nav>
        <ul>
          <li>
            <Link to="/dashboard">🏠 Dashboard</Link>
          </li>

          {/* <li>
            <Link to="/weather">
                🌦 Weather
            </Link>
            </li> */}

          <li>
            <Link to="/users">👥 Users</Link>
          </li>

        </ul>
      </nav>

      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;