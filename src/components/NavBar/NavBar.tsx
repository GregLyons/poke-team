import { 
  Link,
} from 'react-router-dom';

import './NavBar.css';

const NavBar = () => {
  return (
    <div className="nav-bar__wrapper">
      <nav className="nav-bar">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
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
    </div>
  )
}

export default NavBar;