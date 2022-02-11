import { BGAction, BGManager, classWithBG, classWithBGShadow } from '../../hooks/App/BGManager';
import LinkButton from '../Reusables/LinkButton/LinkButton';
import './../NavBar/NavBar.css';

type AnalyzerNavBarProps = {
  dispatchBGManager: React.Dispatch<BGAction>
  bgManager: BGManager
}

const AnalyzerNavBar = ({
  dispatchBGManager,
  bgManager,
}: AnalyzerNavBarProps) => {
  return (
    <div className={classWithBGShadow("nav-bar__wrapper", bgManager)}>
      {/* */}
      <nav className="nav-bar">
        <li className="nav-item">
          <LinkButton
            to="test"
            title="test"
            label="test"
            end={true}
          />
        </li>
      </nav>
    </div>
  )
}

export default AnalyzerNavBar;