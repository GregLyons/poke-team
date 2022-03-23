import { useEffect, useState } from "react";

const PlannerHome = () => {
  const [opacity, setOpacity] = useState<0 | 1>(0);

  useEffect(() => {
    setOpacity(1);
  }, []);

  return (
    <div
      className={`
        section-home__wrapper
        planner-home
      `}
      style={{
        opacity,
      }}
    >
      <h1 className="section-home__header">
        Planner
      </h1>
      <section aria-labelledby="searches-description" className="section-home__section">
        <h2 id="searches-description" className="section-home__section-header">
          Main searches
        </h2>
        <p className="section-home__text">
          Each of the tabs ("Abilities", "Items", etc.) corresponds to searching according to a certain mechanic in Pokemon, some of which are unofficial:
        </p>
        <ul className="section-home__list">
          <li className="section-home__list-item">
            Abilities
          </li>
          <li className="section-home__list-item">
            Items
          </li>
          <li className="section-home__list-item">
            Moves
          </li>
          <li className="section-home__list-item">
            Effects: grouping for miscellaneous mechanics (restoring HP, adding priority to moves, etc.);
          </li>
          <li className="section-home__list-item">
            Field states: weather, hazards, screens, and other effects which last multiple turns and affect one or both sides of the field;
          </li>
          <li className="section-home__list-item">
            Stats
          </li>
          <li className="section-home__list-item">
            Statuses
          </li>
          <li className="section-home__list-item">
            Types
          </li>
          <li className="section-home__list-item">
            Usage methods: classification of moves which are relevant for certain abilities, items, etc. (e.g. "Soundproof" nullifies moves with the "Sound" usage method).
          </li>
        </ul>
        <p className="section-home__text">
          Search results always contain the name of the result, in addition to some other basic data.
          When applicable, results will also contain a list of Pokemon, represented by icons (e.g. a result in the "Moves" tab will contain a list of Pokemon which know the corresponding move).
          You can select one or more of these Pokemon, and then click the "SAVE TO BOX" button to save your selection for when you build your team in the Builder.
          You can change the Type, Base Stat, and Tier filters in the Control Panel to filter Pokemon.
        </p>
      </section>
      <section aria-labelledby="pages-description" className="section-home__section">
        <h2 id="pages-description" className="section-home__section-header">Pages</h2>
        <p className="section-home__text">
          Each of the main search results contains a link to a page for that particular result.
          Certain pages, like the one for the move "Pound", will be empty, but others will list relationships that the result has with other categories.
          For example, the page for the weather effect "Rain" (in the field states section) has several tabs, each corresponding to an interaction between "Rain" and other categories (e.g. abilities which are activated by rain, moves which are enhanced by the rain).
          The results in these tabs function similarly to those in the main searches, but with a couple differences:
        </p>
        <ul className="section-home__list">
          <li className="section-home__list-item">
            Rather than showing data about the result itself (e.g. the power of a move), the result shows data about the relationship (e.g. how many turns of rain are created by "Rain Dance");
          </li>
          <li className="section-home__list-item">
            Each tab on the page may be broken into further subsections, which are color-coded according to whether the interaction is positive or negative (in some sense; for example, the "Move interactions with Rain" section has four sections: "Created by move", "Enhances move", "Hinders move", and "Removed by move", the first two of which are green, and the latter two of which are red);
          </li>
        </ul>
      </section>
      <section aria-labelledby="planner-notes" className="section-home__section">
        <h2 id="planner-notes" className="section-home__section-header">Notes</h2>
        <ul className="section-home__list">
          <li className="section-home__list-item">
            Results with overflowing content (e.g. those with a lot of icons) will expand, but only when you hover over the data or the icons (the content which could cause overflow). This means that the result will not expand when you're hovering over the controls (which could cause the button to move from under your mouse).
          </li>
          <li className="section-home__list-item">
            Since Sw/Sh and BDSP omit Pokemon, certain abilities, items, etc. which are present in Gen 8 (e.g. for the National Dex format) may have missing data/Pokemon icons.
          </li>
          <li className="section-home__list-item">
            On the result pages, when a result is related to a specific type, Pokemon icons are only displayed if the interaction affects Pokemon of that type rather than moves of that type. For example, Poison-type Pokemon remove toxic spikes, so Pokemon icons would be shown for that result on the page for toxic spikes. On the other hand, rain boosts Water-type <em>moves</em> rather than Pokemon, so Pokemon icons would not be shown for that result.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PlannerHome;