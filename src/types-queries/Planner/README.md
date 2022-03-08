# General structure

Each entity class has its own `.ts` file here. The pattern of these files is as follows:

- At the top are types, interfaces, and classes, as well as the GraphQL query, for that entity in `Search` components (e.g. `../components/planner/Ability/AbilitySearch.tsx`).
- Next is the same thing, but for representing that entity's `Page` component. The GraphQL query in this case is for counting connections, rather than getting data on the connections themselves, to determine which sections to render in the accordion on the `Page`. For example, if there's no results in the `abilityCreatesFieldState` connection, then we're not going to render that section in the `../components/planner/Ability/AbilityPage.tsx` component.
- Finally, there is similar code for handling the entity's various connections with other entities (e.g. the connections between Abilities and Field States).

## `helpers.tsx`

This file provides various `interface`s and `abstract class`es for use throughout this directory. Generally, we classify entities into 'Main' (Abilities, Items, Moves) and 'Aux' entities (the rest).

Main entities directly pertain to Pokemon in that Pokemon can possess them, and their descriptions vary across the different games, so their descriptions are represented a bit differently in `poke-gql`, and we need to account for that.

Aux entities on the other hand, aside from Types, are logical classifications made by `poke-db`/`poke-gql`/`poke-team`, somewhat independently from the games. For example, they have custom descriptions that aren't present in the games.