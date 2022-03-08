# General structure

As mentioned in `../README.md`, the `Analyzer`, `Builder`, and `Planner` directories contain GraphQL queries, as well as types for working with the results of these queries.

The `Member` folder contains the types and queries for representing Pokemon Teams within the app. In particular, members of the user's team are instances of the `MemberPokemon` class, which contains all the ability, item, etc. info for that Pokemon.

The `Import` folder handles queries for importing teams; the format used for importing/exporting teams across different Pokemon applications (e.g. PokemonShowdown) consists of the necessary information to create a Pokemon team (what Abilities, Items, and Moves do you have? What Natures? What EVs/IVs?), but for some of the features of the app we need additional data which is currently only available from `poke-gql`, e.g. item requirements for Pokemon and Moves, in order to get a `MemberPokemon` instance. Thus, we still need to perform queries, and then combine the imported data with the query results.

## `helpers.ts`

This file contains types for various patterns for GraphQL query results (e.g. `Edge`s between two different `Node` types), as well as some other core data types.

## `entities.ts`

This file also contains types pertaining to entities (e.g. Effects, Field States, etc.), but are more abstracted from the GraphQL query results. In other words, `helpers.ts` is primarily concerned with parsing and correctly typing GraphQL query results, whereas `entities.ts` mainly focuses on types and constants for representing and using that data in the app once the GraphQL data has beenn parsed.