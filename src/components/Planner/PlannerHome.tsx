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
      <div className="section-home__padder">
        <h1 className="section-home__header">
          Planner
        </h1>
        <section aria-labelledby="searches-description" className="section-home__section">
          <h2 id="searches-description" className="section-home__section-header">
            Main searches
          </h2>
          <p className="section-home__text">
            Each of the tabs (<span className="app-element-name --section">Abilities</span>, <span className="app-element-name --section">Items</span>, etc.) corresponds to searching according to a certain mechanic in Pokemon, some of which are unofficial:
          </p>
          <ul className="section-home__list">
            <li className="section-home__list-item">
              <span className="app-element-name --section">Abilities</span>
            </li>
            <li className="section-home__list-item">
              <span className="app-element-name --section">Items</span>
            </li>
            <li className="section-home__list-item">
              <span className="app-element-name --section">Moves</span>
            </li>
            <li className="section-home__list-item">
              <span className="app-element-name --section">Effects</span>: grouping for miscellaneous mechanics (restoring HP, adding priority to moves, etc.);
            </li>
            <li className="section-home__list-item">
              <span className="app-element-name --section">Field states</span>: weather, hazards, screens, and other effects which last multiple turns and affect one or both sides of the field;
            </li>
            <li className="section-home__list-item">
              <span className="app-element-name --section">Stats</span>
            </li>
            <li className="section-home__list-item">
              <span className="app-element-name --section">Statuses</span>
            </li>
            <li className="section-home__list-item">
              <span className="app-element-name --section">Types</span>
            </li>
            <li className="section-home__list-item">
              <span className="app-element-name --section">Usage methods</span>: classification of moves which are relevant for certain abilities, items, etc. (e.g. the ability Soundproof nullifies moves with the Sound usage method).
            </li>
          </ul>
          <p className="section-home__text">
            Search results always contain the name of the result, in addition to some other basic data.
            When applicable, results will also contain a list of Pokemon, represented by icons (e.g. a result in the <span className="app-element-name --section">Moves</span> tab will contain a list of Pokemon which know the corresponding move).
            You can select one or more of these Pokemon, and then click the <span className="app-element-name --widget">SAVE TO BOX</span> button to save your selection for when you build your team in the Builder.
            You can change the <span className="app-element-name --widget">Type Filter</span>, <span className="app-element-name --widget">Base Stat Filter</span>, and <span className="app-element-name --widget">Tier Filter</span> in the <span className="app-element-name --section">Control Panel</span> to filter Pokemon.
          </p>
        </section>
        <section aria-labelledby="pages-description" className="section-home__section">
          <h2 id="pages-description" className="section-home__section-header">Pages</h2>
          <p className="section-home__text">
            Each of the main search results contains a link to a page for that particular result.
            Certain pages, like the one for the move Pound, will be empty, but others will list relationships that the result has with other categories.
            For example, the page for the weather effect Rain (in the <span className="app-element-name --section">Field states</span> section) has several tabs, each corresponding to an interaction between Rain and other categories (e.g. abilities which are activated by rain, moves which are enhanced by the rain).
            The results in these tabs function similarly to those in the main searches, but with a couple differences:
          </p>
          <ul className="section-home__list">
            <li className="section-home__list-item">
              Rather than showing data about the result itself (e.g. the power of a move), the result shows data about the relationship (e.g. how many turns of rain are created by the move Rain Dance);
            </li>
            <li className="section-home__list-item">
              Each tab on the page may be broken into further subsections, which are color-coded according to whether the interaction is positive or negative (in some sense; for example, the <span className="app-element-name --section">Move interactions with Rain</span> section has four sub-sections: <span className="app-element-name --section">Created by move</span>, <span className="app-element-name --section">Enhances move</span>, <span className="app-element-name --section">Hinders move</span>, and <span className="app-element-name --section">Removed by move</span>, the first two of which are green, and the latter two of which are red).
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
              Since Sw/Sh and BD/SP omit Pokemon, certain abilities, items, etc. which are present in Gen 8 (e.g. for the National Dex format) may have missing data/Pokemon icons.
            </li>
            <li className="section-home__list-item">
              On the result pages, when a result is related to a specific type, Pokemon icons are only displayed if the interaction affects Pokemon of that type rather than moves of that type. For example, Poison-type Pokemon remove toxic spikes, so Pokemon icons would be shown for that result on the page for Toxic Spikes. On the other hand, rain boosts Water-type <em>moves</em> rather than Pokemon, so Pokemon icons would not be shown for that result.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PlannerHome;