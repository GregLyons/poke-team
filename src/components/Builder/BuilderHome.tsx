import { useEffect, useState } from "react";

const BuilderHome = () => {
  const [opacity, setOpacity] = useState<0 | 1>(0);

  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <div
      className={`
        section-home__wrapper
        builder-home
      `}
      style={{
        opacity,
      }}
    >
      <div className="section-home__padder">

        <h1 className="section-home__header">
          Builder
        </h1>
        <section aria-labelledby="team-description" className="section-home__section">
          <h2 id="team-description" className="section-home__section-header">Team</h2>
          <p className="section-home__text">
            Here you can use the teambuilding interface, which functions like the one on Pokemon Showdown, to build your team of six Pokemon.
            When adding Pokemon, you can select either from your pinned boxes in the <span className="app-element-name --section">Cart</span> section (see next section), or from individual Pokemon that you saved in the <span className="app-element-name --section">Quick Search</span> section.
          </p>
          <p className="section-home__text">
            The teambuilding interface changes slightly depending on the selected generation in the <span className="app-element-name --widget">Gen Filter</span>. Blank boxes in the teambuilding indicate a mechanic which is not present in the currently selected generation, e.g. the <span className="app-element-name --widget">Hidden Power</span> box in the <span className="app-element-name --widget">Stats</span> panel will be blank in Gens 1 and 8.
          </p>
          <p className="section-home__text">
            Pokemon which you <span className="app-element-name --widget">Import</span> are automatically added to fill any available space in your team.
            Clicking <span className="app-element-name --widget">Export</span> will convert your current team to a Pokemon Showdown-compatible text format, which you can then copy to your clipboard for external use.
          </p>
        </section>
        <section aria-labelledby="cart-description" className="section-home__section">
          <h2 id="cart-description" className="section-home__section-header">Cart</h2>
          <p className="section-home__text">
            Boxes saved in the <span className="app-element-name --section">Planner</span>, as well as your own custom boxes, are displayed here.
            Boxes from the <span className="app-element-name --section">Planner</span> are organized by the section in which you found them, and your custom boxes are at the bottom.
            You can combine any number of boxes using the boolean <span className="app-element-name --widget">AND</span>, <span className="app-element-name --widget">OR</span> operations to make new boxes.
            Here's how to combine boxes:
          </p>
          <ul className="section-home__list">
            <li className="section-home__list-item">
              Select a box to start the combination (you can change the order later on if you change your mind);
            </li>
            <li className="section-home__list-item">
              Add additional boxes to the combination by pressing either <span className="app-element-name --widget">AND</span> or <span className="app-element-name --widget">OR</span> (the order of combination proceeds from top to bottom);
            </li>
            <li className="section-home__list-item">
              You can change the <span className="app-element-name --widget">AND</span>/<span className="app-element-name --widget">OR</span> operation or the combination order on the right, and you can even remove boxes if you wish;
            </li>
            <li className="section-home__list-item">
              When you're done, hit the <span className="app-element-name --widget">COMBO</span> button, name your box, and hit <span className="app-element-name --widget">SUBMIT</span>.
            </li>
            <li className="section-home__list-item">
              If you want to cancel the combination without making a new box, you can hit the <span className="app-element-name --widget">COMBO</span> button again (on the left; if you changed the box that is first, the box in the first slot will have the <span className="app-element-name --widget">COMBO</span> button), or hit the <span className="app-element-name --widget">BREAK</span> button (on the right).
            </li>
          </ul>
          <p className="section-home__text">
            At any point, you can click the <span className="app-element-name --widget">PIN</span> button on any box in order to make it accessible in the <span className="app-element-name --section">Team</span> section.
          </p>
        </section>
        <section aria-labelledby="quick-search-description" className="section-home__section">
          <h2 id="quick-search-description" className="section-home__section-header">Quick Search</h2>
          <p className="section-home__text">
            Search individual Pokemon by name, and save them for use in the Team tab.
          </p>
        </section>
        <section className="section-home__section">
          <h2 id="importing-description">Importing Pokemon</h2>
          <p className="section-home__text">
            To import an existing team, use the <span className="app-element-name --widget">Import</span> button in the <span className="app-element-name --section">Control Panel</span> at the top of the screen. Separate individual Pokemon by line breaks. The imported Pokemon will fill in any existing space in your current team for the currently selected generation.
          </p>
          <p className="section-home__text">
              The importing feature that your team has valid moves, abilities, etc. for the given Pokemon in the currently selected generation. These checks are based on the games, however; to accomodate the National Dex format (when the <span className="app-element-name --widget">Gen Filter</span> is set to 8, de-select both <span className="app-element-name --widget">Sw/Sh</span> and <span className="app-element-name --widget">BD/SP</span>), the moveset check is removed when importing. Thus, it then becomes possible to import Pokemon with illegal moves. Please rely on Pokemon Showdown for its more robust team validation.
          </p>
        </section>
        <section aria-labelledby="builder-notes" className="section-home__section">
          <h2 id="builder-notes" className="section-home__section-header">
            Notes
          </h2>
          <ul className="section-home__list">
            <li className="section-home__list-item">
              When considering boxes, the filters in the <span className="app-element-name --section">Control Panel</span> apply, just as in the <span className="app-element-name --section">Planner</span>.
            </li>
            <li className="section-home__list-item">
              The <span className="app-element-name --section">Quick Search</span> section is primarly meant for when you want to search for a specific Pokemon to add to your team; for searching for Pokemon by ability, by move, and so on, use the <span className="app-element-name --section">Planner</span> instead.
            </li>
            <li className="section-home__list-item">
              In the <span className="app-element-name --section">Team</span> section, holding down <span className="--key">Shift</span> and pressing a number <span className="--key">1</span> through <span className="--key">6</span> will select the corresponding member of your team.
            </li>
            <li className="section-home__list-item">
              The Pokemon in the <span className="app-element-name --section">Cart</span> and <span className="app-element-name --section">Team</span> sections depend on the currently selected generation. Namely, if you save a Pokemon while in generation 7, in either the <span className="app-element-name --section">Planner</span> or <span className="app-element-name --section">Quick Search</span>, then that Pokemon will only be available for teambuilding when the <span className="app-element-name --widget">Gen Filter</span> is set to 7.
            </li>
            <li className="section-home__list-item">
              Choosing <span className="app-element-name --widget">Sw/Sh</span> vs. <span className="app-element-name --widget">BD/SP</span> in the <span className="app-element-name --widget">Gen Filter</span> for generation 8 will change which moves and Pokemon are available in searches. To enter National Dex mode, you can deactive both of these modes. Please not that this app's team builder is currently unable to accomodate all the additional moves a Pokemon gains upon entering the National Dex format (as it's not in this app's underlying database), so you'll need to use the <span className="app-element-name --widget">Import</span> button to access such moves.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
export default BuilderHome;