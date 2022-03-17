const AnalyzerHome = () => {

  return (
    <div
      className="section-home__wrapper"
    >
      <h1>
        Analyzer
      </h1>
      <section>
        <h2>
          Coverage
        </h2>
        <p>
          See how well-rounded your team is through various tables.
        </p>
        <ul>
          <li>
            The Type Matchup Table shows your team's offensive and defensive type matchups. The numbers in the cell represent an amount of Pokemon on your team (as opposed to the number of moves).
          </li>
          <li>
            The Status Control Table shows ways your team can cause or resist certain status conditions. For status conditions caused as secondary effects of moves, they are only counted when the probability is at least 30%. 
          </li>
          <li>
            The Speed Control Table counts the forms of Speed Control your team has. Causing Paralysis is considered a form of speed control when the probability is at least 30%.
          </li>
          <li>
            The Field Control Table counts the ways in which your team can cause or remove/mitigate various field states, namely entry hazards, terrains, and weather conditions. Since weather and terrain effects overwrite each other, causing them also counts as mitigating other weather and terrain effects.
          </li>
        </ul>
        <p>
          You can change your Pokemon's abilities, items, and moves as well by clicking on them.
        </p>
      </section>
      <section>
        <h2>
          Versus
        </h2>
        <p>
          View your team's matchups against up to six specific enemy Pokemon (whose sets you must import). These data include:
        </p>
        <ul>
          <li>
            The most effective move each of your Pokemon has against each of the enemy Pokemon, measured in terms of number of hits to KO (and whether that number is guaranteed or merely possible);
          </li>
          <li>
            The same calculation but from the perspective of each of the enemy Pokemon against your Pokemon;
          </li>
          <li>
            In each matchup, which Pokemon goes first, assuming each Pokemon uses the move calculated in the previous two steps.
          </li>
        </ul>
        <p>
          All calculations use Pokemon Showdown's official damage calculator.
          As in the Coverage section, you can hover over the cells in the table to highlight relevant factors, and you can change each individual Pokemon's abilities, items, and moves by clicking on them.
          Moreover, you can enter "Stat" mode to modify each Pokemon's EVs, IVs, and Natures.
          The app will briefly highlight any cells whose values for the above three bullet points change due to modifying your or the enemy's team members.
        </p>
      </section>
      <section>
        <h2>
          Notes
        </h2>
        <p>
          Before you can use this feature, you need to either build a team in the Builder, or import a team using the "IMPORT" button in the Control Panel.
        </p>
        <p>
          Hovering over a cell will highlight the Pokemon, abilities, items, etc. which contribute to that cell's value.
        </p>
        <p>
          Each cell/cell value is ranked from 1 to 5 (red to green/blue).
          Take these rankings with a grain of salt; a low value does not necessarily mean your team is bad. 
          Rather, they point out factors which can potentially pose a problem.
          If you see a low value, consider whether your team has other ways to account for it, which aren't captured by the app, before changing your team.
        </p>
      </section>
    </div>
  );
}
export default AnalyzerHome;