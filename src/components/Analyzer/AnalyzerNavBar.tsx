import { BGManager, classWithBGShadow } from '../../hooks/App/BGManager';
import LinkButton from '../Reusables/LinkButton/LinkButton';
import './../NavBar/NavBar.css';

type AnalyzerNavBarProps = {
  bgManager: BGManager
}

const AnalyzerNavBar = ({
  bgManager,
}: AnalyzerNavBarProps) => {
  return (
    <div className={classWithBGShadow("nav-bar__wrapper", bgManager)}>
      {/* */}
      <nav
        className="nav-bar"
        role="navigation" aria-label="Secondary"
      >
        <li className="nav-item">
          <LinkButton
            to="coverage"
            title="View a summary of your team's type matchups, type coverage, and more"
            label="Coverage"
            end={true}
          />
        </li>
        <li className="nav-item">
          <LinkButton
            to="Versus"
            title="See how your team fares against another, imported team"
            label="Versus"
            end={true}
          />
        </li>
      </nav>
    </div>
  )
}

export default AnalyzerNavBar;