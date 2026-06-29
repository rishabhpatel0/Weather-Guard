import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <h2>Dashboard</h2>

      <div className="user">

        <img
          src="https://i.pravatar.cc/150"
          alt=""
        />

        <span>Rishabh Patel</span>

      </div>
    </header>
  );
}

export default Navbar;