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
      <h1 className="section-home__header">
        Builder
      </h1>
      <section aria-labelledby="team-description" className="section-home__section">
        <h2 id="team-description" className="section-home__section-header">Team</h2>
        <p className="section-home__text">
          Here you can use the teambuilding interface, which functions like the one on Pokemon Showdown, to build your team of six Pokemon.
          When adding Pokemon, you can select either from your pinned boxes in the "Cart" section (see next section), or from individual Pokemon that you saved in the "Quick Search" section.
          Blank boxes in the teambuilding interface indicate a mechanic which is not present in the currently selected generation, e.g. the "Hidden Power" box in the "Stats" panel will be blank in Gens 1 and 8.
        </p>
      </section>
      <section aria-labelledby="cart-description" className="section-home__section">
        <h2 id="cart-description" className="section-home__section-header">Cart</h2>
        <p className="section-home__text">
          Boxes saved in the Planner, as well as your own custom boxes, are displayed here.
          Boxes from the Planner are organized by the section in which you found them, and your custom boxes are at the bottom.
          You can combine any number of boxes using the boolean "AND", "OR" operations to make new boxes.
          Here's how to combine boxes:
        </p>
        <ul className="section-home__list">
          <li className="section-home__list-item">
            Select a box to start the combination (you can change the order later on if you change your mind);
          </li>
          <li className="section-home__list-item">
            Add additional boxes to the combination by pressing either "AND" or "OR" (the order of combination proceeds from top to bottom);
          </li>
          <li className="section-home__list-item">
            You can change the "AND"/"OR" operation or the combination order on the right, and you can even remove boxes if you wish;
          </li>
          <li className="section-home__list-item">
            When you're done, hit the "COMBO" button, name your box, and hit "SUBMIT".
          </li>
          <li className="section-home__list-item">
            If you want to cancel the combination without making a new box, you can hit the "COMBO" button again (on the left; if you changed the box that is first, the box in the first slot will have the "COMBO" button), or hit the "BREAK" button (on the right).
          </li>
        </ul>
        <p className="section-home__text">
          At any point, you can click the "PIN" button on any box in order to make it accessible in the "Team" section.
        </p>
      </section>
      <section aria-labelledby="quick-search-description" className="section-home__section">
        <h2 id="quick-search-description" className="section-home__section-header">Quick Search</h2>
        <p className="section-home__text">
          Search individual Pokemon by name, and save them for use in the Team tab.
        </p>
      </section>
      <section aria-labelledby="builder-notes" className="section-home__section">
        <h2 id="builder-notes" className="section-home__section-header">
          Notes
        </h2>
        <ul className="section-home__list">
          <li className="section-home__list-item">
            When considering boxes, the filters in the Control Panel apply, just as in the Planner.
          </li>
          <li className="section-home__list-item">
            The "Quick Search" section is primarly meant for when you want to search for a specific Pokemon to add to your team; for searching for Pokemon by Ability, by Move, and so on, use the Planner instead.
          </li>
          <li className="section-home__list-item">
            In the "Team View" section, pressing 'Shift' and a number 1-6 will select the corresponding member of your team.
          </li>
        </ul>
      </section>
    </div>
  );
}
export default BuilderHome;