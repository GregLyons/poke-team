import { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import MoveEntry from './MoveEntry';

import { MoveGQLResult, Move } from '../../../../typeDefs/Move';
import { Pokemon } from '../../../../typeDefs/Pokemon';

const MOVE_SEARCH_QUERY = gql`
  query MoveSearchQuery($filter: String!) {
    moves(filter: {startsWith: $filter}) {
      id
      name
      formattedName
      accuracy
      category
      contact
      power
      pp
      priority
      target

      type {
        edges {
          node {
            name
          }
        }
      }

      pokemon {
        edges {
          node {
            name
            formattedName
            speciesName
          }
        }
      }
    }
  }
`;

type MoveListProps = {
  addPokemonToTeam: (pokemon: Pokemon) => void
}

const MoveList = ({ addPokemonToTeam }: MoveListProps) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [executeSearch, { data }] = useLazyQuery(
    MOVE_SEARCH_QUERY
  );

  return (
    <>
      <div>
        Search
        <input
          type="text"
          onChange={(e) => setSearchFilter(e.target.value)}
        />
        <button
          onClick={() =>
            executeSearch({
              variables: { filter: searchFilter }
            })
          }
        >
          OK
        </button>
      </div>
      <div className="planner__table planner__table--move">
        <div className="planner__table-header">
          <div className="planner__table-name-header">name</div>
          <div className="planner__table-data-header">data</div>
          <div className="planner__table-pokemon-header">pokemon</div>
        </div>
        {data && 
          data.moves.map((move: MoveGQLResult) => (
              <MoveEntry 
                key={move.id} 
                addPokemonToTeam={addPokemonToTeam}
                move={new Move(move)} 
              />
            ))
        }
      </div>
    </>
  );
};

export default MoveList;