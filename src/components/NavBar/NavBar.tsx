import { BGManager, classWithBGShadow } from '../../hooks/App/BGManager';
import { useContainerSize } from '../../hooks/App/ContainerSize';
import LinkButton from '../Reusables/LinkButton/LinkButton';
import './NavBar.css';


type NavBarProps = {
  bgManager: BGManager
  headerRef: React.RefObject<HTMLElement>
  navBarRef: React.RefObject<HTMLDivElement>
}

const NavBar = ({
  bgManager,
  headerRef,
  navBarRef,
}: NavBarProps) => {
  const [containerWidth] = useContainerSize(headerRef, navBarRef);

  return (
    <div 
      ref={navBarRef}
      className={classWithBGShadow("nav-bar__wrapper", bgManager)}
      style={{
        width: containerWidth,
      }}
    >
      <nav
        className="nav-bar"
        role="Primary Navigation"
      >
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