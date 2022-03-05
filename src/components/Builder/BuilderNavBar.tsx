import { BGManager, classWithBGShadow } from '../../hooks/App/BGManager';
import LinkButton from '../Reusables/LinkButton/LinkButton';
import './../NavBar/NavBar.css';

type BuilderNavBarProps = {
  bgManager: BGManager
}

const BuilderNavBar = ({
  bgManager,
}: BuilderNavBarProps) => {
  return (
    <div className={classWithBGShadow("nav-bar__wrapper", bgManager)}>
      {/* */}
      <nav className="nav-bar">
        <li className="nav-item">
          <LinkButton
            to="team"
            title="Team"
            label="Team"
            end={true}
          />
        </li>
        <li className="nav-item">
          <LinkButton
            to="cart"
            title="Cart"
            label="Cart"
            end={true}
          />
        </li>
        <li className="nav-item">
          <LinkButton
            to="quickSearch"
            title="Quick Search"
            label="Quick Search"
            end={true}
          />
        </li>
      </nav>
    </div>
  )
}

export default BuilderNavBar;