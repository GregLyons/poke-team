# General structure

The main file of this directory, `ImportPokemon.ts`, handles creating `MemberPokemon` instances from user-provided strings. In particular, it queries all the ability/move/etc. information in a single query (though separate queries are needed for Items and Natures, handled in `ImportItem.ts` and `ImportNature.ts`, respectively). 

The `setsToMembers` function in `ImportPokemon.ts` combines the imported `PokemonSet`s (the third party-library `@pkmn/sets` converts the user-provided strings to instances of the `PokemonSet` class) with the results of these queries to get `MemberPokemon` instances.