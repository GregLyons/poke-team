import { Link } from 'react-router-dom';

import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <li className="nav-item">
        <Link to="/planner">Planner</Link>
      </li>
      <li className="nav-item">
        <Link to="/builder">Builder</Link>
      </li>
      <li className="nav-item">
        <Link to="/analyzer">Analyzer</Link>
      </li>
    </nav>
  )
}

export default NavBar;