# General structure

## Entity folders

Many of the directories in this section share a common pattern:

- They are named after some Pokemon-related entity, e.g. 'Abilities', 'Moves', 'Effects', etc.
- Within each directory, there are three files: a `Search` component, a `Page` component, and a `Connections` component.
  - `Search`: responsible for handling top-level searches. We write the `listRender` and `listFilter` functions for rendering and filtering search results, respectively. The `Search` component itself simply combines the two components-results and filters- returned by these functions.
  - `Page`: individual pages for entries. These handle the necessary queries for data displayed on these pages. These data concern how entities of different classes relate to each other, e.g. a page in the `FieldState` section will have an accordion, whose sections might pertain to Abilities which create the given Field State, Moves which are enhanced by the given Field State, and so on.
  - `Connections`: responsible for rendering the results of the queries in the `Page` component. For every potential relationship between two entities (e.g. Field State to Ability, and the opposite direction of Ability to Field State), we need to specify how to render the entries pertaining to that connection.

## Other folders

There are a few other folders in this directory:

- `Entries`: defines general components for rendering results from each of the searches. These are slightly different depending on whether they are to be rendered in a `Search` component or on a `Page` component (e.g. in the former, general data is given on the entity, whereas in the latter, the entry displays data pertaining to that relationship), but their functionality is pretty much the same.
- The concerns of `Pages` and `MainSearch` are self-explanatory.

## `helpers.tsx`

In addition to defining error classes and a couple types, the `helpers.tsx` files specifies functions which take in search variables and output the necessary arguments for rendering sliders, dropdowns, etc. (whose code is in the `../Reusables` directory). In particular, they return functions which modify the given query variables, `queryVars`, through `setQueryVars`, which are to be called upon interacting with the aforementioned sliders and dropdowns.
