const BuilderHome = () => {
  return (
    <div
      className="section-home__wrapper"
    >
      <h1>
        Builder
      </h1>
      <section>
        <h2>Team</h2>
        <p>
          Here you can use the teambuilding interface, which functions like the one on Pokemon Showdown, to build your team of six Pokemon.
          When adding Pokemon, you can select either from your pinned boxes in the "Cart" section (see next section), or from individual Pokemon that you saved in the "Quick Search" section.
          Blank boxes in the teambuilding interface indicate a mechanic which is not present in the currently selected generation, e.g. the "Hidden Power" box in the "Stats" panel will be blank in Gens 1 and 8.
        </p>
      </section>
      <section>
        <h2>Cart</h2>
        <p>
          Boxes saved in the Planner, as well as your own custom boxes, are displayed here.
          Boxes from the Planner are organized by the section in which you found them, and your custom boxes are at the bottom.
          You can combine any number of boxes using the boolean "AND", "OR" operations to make new boxes.
          Here's how to combine boxes:
        </p>
        <ul>
          <li>
            Select a box to start the combination (you can change the order later on if you change your mind);
          </li>
          <li>
            Add additional boxes to the combination by pressing either "AND" or "OR" (the order of combination proceeds from top to bottom);
          </li>
          <li>
            You can change the "AND"/"OR" operation or the combination order on the right, and you can even remove boxes if you wish;
          </li>
          <li>
            When you're done, hit the "COMBO" button, name your box, and hit "SUBMIT".
          </li>
          <li>
            If you want to cancel the combination without making a new box, you can hit the "COMBO" button again (on the left; if you changed the box that is first, the box in the first slot will have the "COMBO" button), or hit the "BREAK" button (on the right).
          </li>
        </ul>
        <p>
          At any point, you can click the "PIN" button on any box in order to make it accessible in the "Team" section.
        </p>
      </section>
      <section>
        <h2>Quick Search</h2>
        <p>
          Search individual Pokemon by name, and save them for use in the Team tab.
        </p>
      </section>
      <section>
        <h2>
          Notes
        </h2>
        <ul>
          <li>
            When considering boxes, the filters in the Control Panel apply, just as in the Planner.
          </li>
          <li>
            The "Quick Search" section is primarly meant for when you want to search for a specific Pokemon to add to your team; for searching for Pokemon by Ability, by Move, and so on, use the Planner instead.
          </li>
        </ul>
      </section>
    </div>
  );
}
export default BuilderHome;