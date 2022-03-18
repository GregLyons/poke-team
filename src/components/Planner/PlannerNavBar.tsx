import { BGManager, classWithBGShadow } from "../../hooks/App/BGManager";
import LinkButton from "../Reusables/LinkButton/LinkButton";
import './../NavBar/NavBar.css';

type PlannerNavBarProps = {
  bgManager: BGManager
}

const PlannerNavBar = ({
  bgManager,
}: PlannerNavBarProps) => {
  return (
    <div className={classWithBGShadow("nav-bar__wrapper", bgManager)}>
      <nav
        className="nav-bar"
        role="navigation" aria-label="Secondary"
      >
        <li className="nav-item">
          <LinkButton
            to="abilities"
            title="Abilities"
            label="Abilities"
            end={false}
          />
        </li>
        <li className="nav-item">
          <LinkButton
            to="items"
            title="Items"
            label="Items"
            end={false}
          />
        </li>
        <li className="nav-item">
          <LinkButton
            to="moves"
            title="Moves"
            label="Moves"
            end={false}
          />
        </li>
        <li className="nav-item">
          <LinkButton
            to="effects"
            title="Effects"
            label="Effects"
            end={false}
          />
        </li>
        <li className="nav-item">
          <LinkButton
            to="fieldStates"
            title="Field states"
            label="Field states"
            end={false}
          />
        </li>
        <li className="nav-item">
          <LinkButton
            to="stats"
            title="Stats"
            label="Stats"
            end={false}
          />
        </li>
        <li className="nav-item">
          <LinkButton
            to="statuses"
            title="Statuses"
            label="Statuses"
            end={false}
          />
        </li>
        <li className="nav-item">
          <LinkButton
            to="types"
            title="Types"
            label="Types"
            end={false}
          />
        </li>
        <li className="nav-item">
          <LinkButton
            to="usageMethods"
            title="Usage methods"
            label="Usage methods"
            end={false}
          />
        </li>
      </nav>
    </div>
  )
}

export default PlannerNavBar;