# General structure

The folder structure is as follows:

- `CartView`: displays the boxes which the user saved from the Planner section. They can also combine these boxes in various ways to make custom boxes that they can then 'pin', i.e. save for use in the `TeamView` component.
- `QuickSearch`: allows the user to search individual Pokemon and save them for use in the `TeamView` component.
- `TeamView`: displays the user's pinned/saved Pokemon from either of the previous two components. Provides a teambuilding interface for the user to select Abilities, Items, Moves, etc. for their Pokemon. If the user instead imported a team, then the imported Pokemon will be displayed here and can be modified as desired.
