# General structure

The folder structure is as follows:

- `Analyzer`, `Builder`, and `Planner`: components corresponding to one of the three main features of the app. Usually these consist of a couple top-level Home and NavBar components, followed by individual folders for the lower-level components.
- `ControlPanel`: components for the various filters at the top of the screen, as well as import/export functionality.
- `Icons`: various icons for Pokemon, items, etc. Putting them all here allows us to put all the CSS necessary for the sprites in one place.
- `NavBar`: the main navigation bar for the app.
- `Reusables`: various reusable UI elements, such as sliders and dropdowns.

## `App.css` and `App.tsx`

`App.css` contains styling for the overall app, mainly for the decorative sidebars and the background lighting. `App.tsx` handles all the routing, and distributes the dispatchers/filters (from `useReducer`) to lower-level components.