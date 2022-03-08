# Introduction

As with [`poke-db`](https://github.com/GregLyons/poke-db) and [`poke-gql`](https://github.com/GregLyons/poke-gql), we provide `README.md` files for many of the folders to give a high-level explanation of the code therein.

# General structure

The folder structure is as follows:

- `assets`: sprite sheets and other images.
- `components`: code for all the React components.
- `example-teams`: strings representing Pokemon teams in the standard Pokemon import/export format.
- `hooks`: custom hooks and reducers used in the app.
- `types-queries`: all GraphQL queries, as well as the `type`s, `interface`s, and `class`es for working with the query results.
- `utils`: various constants and helpers used throughout the app.

Many of the folders are further split into subfolders corresponding to the major sections of the app: the Analyzer, Builder, and Planner. In some cases, e.g. `hooks/Searches.tsx`, the code is used throughout each of these components, and so they have either their own folder, or are placed in the common ancestor directory.

## CSS structure

In general, we have individual stylesheets in the same folder as the components to which they apply. The main exception is when multiple components across different folders comprise a larger layout. In this case, the CSS for laying out those components will be in the common ancestor directory, separate from their individual CSS.

# `index.css` and `index.tsx`

Most CSS variables are defined in `index.css`. This is also where we overwrite a lot of the default formatting for forms, scrollbars, etc. 

The Apollo Client is set up in `index.tsx`, which is also, as usual, the entry point for the app.