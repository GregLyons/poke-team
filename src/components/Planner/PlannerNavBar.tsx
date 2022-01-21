import {
  Link,
} from "react-router-dom";
import './Planner.css';

const PlannerNavBar = () => {
  return (
    <div className="planner-nav-bar">
      {/* */}
      <nav className="planner-nav-bar__main">
        <li className="planner-nav-bar__main-item">
          <Link to="abilities">Abilities</Link>
        </li>
        <li className="planner-nav-bar__main-item">
          <Link to="items">Items</Link>
        </li>
        <li className="planner-nav-bar__main-item">
          <Link to="moves">Moves</Link>
        </li>
      </nav>

      {/* */}
      <nav className="planner-nav-bar__secondary">
        <li className="planner-nav-bar__secondary-item">
          <Link to="effects">Effects</Link>
        </li>
        <li className="planner-nav-bar__secondary-item">
          <Link to="fieldStates">Field states</Link>
        </li>
        <li className="planner-nav-bar__secondary-item">
          <Link to="stats">Stats</Link>
        </li>
        <li className="planner-nav-bar__secondary-item">
          <Link to="statuses">Statuses</Link>
        </li>
        <li className="planner-nav-bar__secondary-item">
          <Link to="types">Types</Link>
        </li>
        <li className="planner-nav-bar__secondary-item">
          <Link to="usageMethods">Usage methods</Link>
        </li>
      </nav>
    </div>
  )
}

export default PlannerNavBar;