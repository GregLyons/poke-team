# General structure

The `App` folder contains the actions and reducers necessary for `useReducer` hooks. `App/ContainerSize.tsx` is used for determining the size that the main container should be, so that the app remains on one screen.

The `Builder` folder contains a single basic hook, specialized for the kind of searches necessary in that section.

The `Planner` folder contains a few hooks for the Planner section. 

- `Entries.tsx`: used for handling UX for the search entries (expanding/contracting depending on the user's mouse position).
- `PageQueries.tsx`: used for handling queries on the individual ability/item/etc. pages. For those pages, since the user can navigate to them with the selected Generation being prior to their introduction (e.g. 'Accelerock' is not available in Generation 1, but the user could still navigate to that page directly via URL with the Generation slider set to 1, or they could change the Generation while on that page), so each page actually uses two queries: a 'debut query' to figure out when the entity in question was introduced, followed by, if the entity is present in the given generation, a query to get the actual details. 
- `Selections.tsx`: used for handling selecting/de-selecting Pokemon in search entries.

## `Searches.tsx`

In virtually every search we perform, we the selected Generation serves as a search variable, so we need to connect the search to the `GenFilter` state. Moreover, for some entities (e.g. moves), we also need to keep track of the SwSh/BDSP game mode for Generation 8, also tracked in the `GenFilter` state. Thus, the first four hooks in `Searches.tsx` connect these filters to the search variables. Moreover, we often need to use a search bar for queries, using the value in the search bar as a variable for the query. This is handled in `useGen/RemovalConnectedSearchBar`, which constructs a `searchBar` component and connects that as well as the `GenFilter` state to the query, after which it returns the component in addition to the connected search variables. 

The list filter hooks are used for connecting query variables to other list filter components as necesary (e.g. dropdowns, sliders), in addition to `GenFilter` and a search bar component. The list render hooks are used for rendering search results in response to the queries.