import {
  Link,
} from "react-router-dom";
import LinkButton from "../Reusables/LinkButton/LinkButton";
import './Planner.css';

const PlannerNavBar = () => {
  return (
    <div className="planner__nav-bar-wrapper">
      {/* */}
      <div className="planner__nav-main-cell">
        <nav className="planner__nav-main">
          <li className="planner__nav-item">
            <LinkButton
              to="abilities"
              title="Abilities"
              label="Abilities"
              end={false}
            />
          </li>
          <li className="planner__nav-item">
            <LinkButton
              to="items"
              title="Items"
              label="Items"
              end={false}
            />
          </li>
          <li className="planner__nav-item">
            <LinkButton
              to="moves"
              title="Moves"
              label="Moves"
              end={false}
            />
          </li>
        </nav>
      </div>

      {/* */}
      <div className="planner__nav-secondary-cell">
        <nav className="planner__nav-secondary">
          <li className="planner__nav-item">
            <LinkButton
              to="effects"
              title="Effects"
              label="Effects"
              end={false}
            />
          </li>
          <li className="planner__nav-item">
            <LinkButton
              to="fieldStates"
              title="Field states"
              label="Field states"
              end={false}
            />
          </li>
          <li className="planner__nav-item">
            <LinkButton
              to="stats"
              title="Stats"
              label="Stats"
              end={false}
            />
          </li>
          <li className="planner__nav-item">
            <LinkButton
              to="statuses"
              title="Statuses"
              label="Statuses"
              end={false}
            />
          </li>
          <li className="planner__nav-item">
            <LinkButton
              to="types"
              title="Types"
              label="Types"
              end={false}
            />
          </li>
          <li className="planner__nav-item">
            <LinkButton
              to="usageMethods"
              title="Usage methods"
              label="Usage methods"
              end={false}
            />
          </li>
        </nav>
      </div>
    </div>
  )
}

export default PlannerNavBar;