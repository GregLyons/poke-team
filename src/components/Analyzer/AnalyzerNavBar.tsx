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
      <nav className="nav-bar">
        <li className="nav-item">
          <LinkButton
            to="coverage"
            title="View a summary of your team's type matchups, type coverage, and more"
            label="Coverage"
            end={true}
          />
        </li>
      </nav>
      <nav className="nav-bar">
        <li className="nav-item">
          <LinkButton
            to="6v1"
            title="See how your team fares against a single Pokemon"
            label="6v1"
            end={true}
          />
        </li>
      </nav>
      <nav className="nav-bar">
        <li className="nav-item">
          <LinkButton
            to="thresholds"
            title="Calculate speed tiers and KO ranges for your team compared to common Pokemon in the given tier"
            label="Thresholds"
            end={true}
          />
        </li>
      </nav>
    </div>
  )
}

export default AnalyzerNavBar;