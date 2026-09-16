import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">

        {/* Logo */}
        <NavLink to="/analyse" className="brand">
          <div className="brand-mark">
            RS
          </div>

          <div className="brand-text">
            <span className="brand-name">RawSignal</span>
            <span className="brand-tagline">
              Read between the lines
            </span>
          </div>
        </NavLink>

        {/* Navigation */}
        <nav className="nav-links">

          <NavLink
            to="/analyse"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Analyse
          </NavLink>

          <NavLink
            to="/compare"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Compare
          </NavLink>

          <NavLink
            to="/write"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Write
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>

        </nav>

        {/* Status */}
        <div className="system-status">
          <span className="status-dot"></span>
          <span>System ready</span>
        </div>

      </div>
    </header>
  );
}

export default Navbar;