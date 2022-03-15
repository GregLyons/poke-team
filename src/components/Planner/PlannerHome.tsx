const PlannerHome = () => {
  return (
    <div className="planner-home__wrapper">
      <h1>
        Planner
      </h1>
      <section>
        <h2>
          Main searches
        </h2>
        <p>
          Each of the tabs ("Abilities", "Items", etc.) corresponds to searching according to a certain mechanic in Pokemon, some of which are unofficial:
        </p>
        <ul>
          <li>
            Abilities
          </li>
          <li>
            Items
          </li>
          <li>
            Moves
          </li>
          <li>
            Effects: grouping for miscellaneous mechanics (restoring HP, adding priority to moves, etc.);
          </li>
          <li>
            Field states: weather, hazards, screens, and other effects which last multiple turns and affect one or both sides of the field;
          </li>
          <li>
            Stats
          </li>
          <li>
            Statuses
          </li>
          <li>
            Types
          </li>
          <li>
            Usage methods: classification of moves which are relevant for certain abilities, items, etc. (e.g. "Soundproof" nullifies moves with the "Sound" usage method).
          </li>
        </ul>
        <p>
          Search results always contain the name of the result, in addition to some other basic data.
          When applicable, results will also contain a list of Pokemon, represented by icons (e.g. a result in the "Moves" tab will contain a list of Pokemon which know the corresponding move).
          You can select one or more of these Pokemon, and then click the "SAVE TO BOX" button to save your selection for when you build your team in the Builder.
          You can change the Type, Base Stat, and Tier filters in the Control Panel to filter Pokemon.
        </p>
      </section>
      <section>
        <h2>Pages</h2>
        <p>
          Each of the main search results contains a link to a page for that particular result.
          Certain pages, like the one for the move "Pound", will be empty, but others will list relationships that the result has with other categories.
          For example, the page for the weather effect "Rain" (in the field states section) has several tabs, each corresponding to an interaction between "Rain" and other categories (e.g. abilities which are activated by rain, moves which are enhanced by the rain).
          The results in these tabs function similarly to those in the main searches, but with a couple differences:
        </p>
        <ul>
          <li>
            Rather than showing data about the result itself (e.g. the power of a move), the result shows data about the relationship (e.g. how many turns of rain are created by "Rain Dance");
          </li>
          <li>
            Each tab on the page may be broken into further subsections, which are color-coded according to whether the interaction is positive or negative (in some sense; for example, the "Move interactions with Rain" section has four sections: "Created by move", "Enhances move", "Hinders move", and "Removed by move", the first two of which are green, and the latter two of which are red);
          </li>
        </ul>
      </section>
      <section>
        <h2>Notes</h2>
        <ul>
          <li>
            Results with overflowing content (e.g. those with a lot of icons) will expand, but only when you hover over the data or the icons (the content which could cause overflow). This means that the result will not expand when you're hovering over the controls (which could cause the button to move from under your mouse).
          </li>
          <li>
            Since Sw/Sh and BDSP omit Pokemon, certain abilities, items, etc. which are present in Gen 8 (e.g. for the National Dex format) may have missing data/Pokemon icons.
          </li>
          <li>
            On the result pages, when a result is related to a specific type, Pokemon icons are only displayed if the interaction affects Pokemon of that type rather than moves of that type. For example, Poison-type Pokemon remove toxic spikes, so Pokemon icons would be shown for that result on the page for toxic spikes. On the other hand, rain boosts Water-type <em>moves</em> rather than Pokemon, so Pokemon icons would not be shown for that result.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default PlannerHome;