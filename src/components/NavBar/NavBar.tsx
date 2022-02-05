import { BGAction, BGManager, classWithBGShadow } from '../../hooks/App/BGManager';
import LinkButton from '../Reusables/LinkButton/LinkButton';

import './NavBar.css';

type NavBarProps = {
  dispatchBGManager: React.Dispatch<BGAction>
  bgManager: BGManager
}

const NavBar = ({
  dispatchBGManager,
  bgManager,
}: NavBarProps) => {
  return (
    <div className={classWithBGShadow("nav-bar__wrapper", bgManager)}>
      <nav className="nav-bar">
        <li className="nav-item">
          <LinkButton 
            to="/"
            title='Home'
            label='Home'
            end={true}
          />
        </li>
        <li className="nav-item">
          <LinkButton 
            to="/Planner"
            title='Planner'
            label='Planner'
            end={false}
          />
        </li>
        <li className="nav-item">
          <LinkButton 
            to="/Builder"
            title='Builder'
            label='Builder'
            end={false}
          />
        </li>
        <li className="nav-item">
          <LinkButton 
            to="/Analyzer"
            title='Analyzer'
            label='Analyzer'
            end={false}
          />
        </li>
      </nav>
    </div>
  )
}

export default NavBar;