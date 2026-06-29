import "./Login.css";

function Login() {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="login-container">
      <div className="card">

        <div className="logo">☁️</div>

        <h1>WeatherGuard</h1>

        <p className="subtitle">
          Secure Weather Alert Management System
        </p>

        <button
          className="google-btn"
          onClick={handleGoogleLogin}
        >
          <img
            className="google-icon"
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
          />

          Continue with Google
        </button>

      </div>
    </div>
  );
}

export default Login;
