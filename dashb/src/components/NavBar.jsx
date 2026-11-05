import { NavLink } from "react-router";

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end>Home</NavLink>
      <NavLink to="/albums">Albums</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  );
}

export default NavBar;