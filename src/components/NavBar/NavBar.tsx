import { useRef } from 'react';
import { BGAction, BGManager, classWithBGShadow } from '../../hooks/App/BGManager';
import { useContainerSize } from '../../hooks/App/ContainerSize';
import LinkButton from '../Reusables/LinkButton/LinkButton';

import './NavBar.css';

type NavBarProps = {
  dispatchBGManager: React.Dispatch<BGAction>
  bgManager: BGManager
  headerRef: React.RefObject<HTMLElement>
  navBarRef: React.RefObject<HTMLDivElement>
}

const NavBar = ({
  dispatchBGManager,
  bgManager,
  headerRef,
  navBarRef,
}: NavBarProps) => {
  return (
    <div 
      ref={navBarRef}
      className={classWithBGShadow("nav-bar__wrapper", bgManager)}
    >
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