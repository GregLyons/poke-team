import { useEffect, useState } from "react";

const AnalyzerHome = () => {
  const [opacity, setOpacity] = useState<0 | 1>(0);
  
  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <div
      className={`
        section-home__wrapper
        analyzer-home
      `}
      style={{
        opacity,
      }}
    >
      <div className="section-home__padder">

        <h1 className="section-home__header">
          Analyzer
        </h1>
        <section aria-labelledby="coverage-description" className="section-home__section">
          <h2 id="coverage-description" className="section-home__section-header">
            Coverage
          </h2>
          <p className="section-home__text">
            See how well-rounded your team is through various tables.
          </p>
          <ul className="section-home__list">
            <li className="section-home__list-item">
              The <span className="app-element-name --section">Type Matchup</span> table shows your team's offensive and defensive type matchups. The numbers in the cell represent an amount of Pokemon on your team (as opposed to the number of moves).
            </li>
            <li className="section-home__list-item">
              The <span className="app-element-name --section">Status Control</span> table shows ways your team can cause or resist certain status conditions. For status conditions caused as secondary effects of moves, they are only counted when the probability is at least 30%. 
            </li>
            <li className="section-home__list-item">
              The <span className="app-element-name --section">Speed Control</span> table counts the forms of Speed Control your team has. Causing Paralysis is considered a form of speed control when the probability is at least 30%.
            </li>
            <li className="section-home__list-item">
              The <span className="app-element-name --section">Field Control</span> table counts the ways in which your team can cause or remove/mitigate various field states, namely entry hazards, terrains, and weather conditions. Since weather and terrain effects overwrite each other, causing them also counts as mitigating other weather and terrain effects.
            </li>
          </ul>
          <p className="section-home__text">
            You can change your Pokemon's abilities, items, and moves as well by clicking on them.
          </p>
        </section>
        <section aria-labelledby="versus-description" className="section-home__section">
          <h2 id="versus-description" className="section-home__section-header">
            Versus
          </h2>
          <p className="section-home__text">
            View your team's matchups against up to six specific enemy Pokemon (whose sets you must import). These data include:
          </p>
          <ul className="section-home__list">
            <li className="section-home__list-item">
              The most effective move each of your Pokemon has against each of the enemy Pokemon, measured in terms of number of hits to KO (and whether that number is guaranteed or merely possible);
            </li>
            <li className="section-home__list-item">
              The same calculation but from the perspective of each of the enemy Pokemon against your Pokemon;
            </li>
            <li className="section-home__list-item">
              In each matchup, which Pokemon goes first, assuming each Pokemon uses the move calculated in the previous two steps.
            </li>
          </ul>
          <p className="section-home__text">
            All calculations use Pokemon Showdown's official damage calculator.
            As in the <span className="app-element-name --section">Coverage</span> section, you can hover over the cells in the table to highlight relevant factors, and you can change each individual Pokemon's abilities, items, and moves by clicking on them.
            Moreover, you can enter <span className="app-element-name --widget">Stat</span> mode to modify each Pokemon's EVs, IVs, and Natures.
            The app will briefly highlight any cells whose values for the above three bullet points change due to modifying your or the enemy's team members.
          </p>
        </section>
        <section aria-labelledby="analyzer-notes" className="section-home__section">
          <h2 id="analyzer-notes" className="section-home__section-header">
            Notes
          </h2>
          <ul className="section-home__list">
            <li className="section-home__list-item">
              Before you can use this feature, you need to either build a team in the <span className="app-element-name --section">Builder</span>, or import a team using the <span className="app-element-name --widget">IMPORT</span> button in the <span className="app-element-name --section">Control Panel</span>.
            </li>
            <li className="section-home__list-item">
              Hovering over a cell in the <span className="app-element-name --section">Versus</span> table will highlight the Pokemon, abilities, items, etc. which contribute to that cell's value.
            </li>
            <li className="section-home__list-item">
              Each cell/cell value is ranked on a scale of 1 to 5 (red to green/blue).
              Take these rankings with a grain of salt; a low value does not necessarily mean your team is bad. 
              Rather, they point out factors which can potentially pose a problem.
              If you see a low value, consider whether your team has other ways to account for it, which aren't captured by the app, before changing your team.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
export default AnalyzerHome;