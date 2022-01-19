import {
  useState,
} from 'react';
import {
  Outlet,
} from 'react-router-dom';

import {
  MoveSearchQuery,
  MoveSearchResult,
  MoveSearchVars,
  MoveInSearch,

  MOVE_SEARCH_QUERY,
} from '../../../../types-queries/Move';
import {
  GenerationNum,
} from '../../../../types-queries/Generation';
import {
  ListRenderArgs, MissingDispatchError,
} from '../helpers';

import { 
  CartAction,
  TeamAction,
} from "../../../App";

import EntitySearchMain from '../EntitySearchMain';
import EntitySearchEntry from '../EntitySearchEntry';

const listRender = ({ data, dispatchCart, dispatchTeam, }: ListRenderArgs<MoveSearchQuery>) => {
  if (!data || !data.moves) return (<div>Data not found for the query 'moves'.</div>);
  if (!dispatchCart || !dispatchTeam) throw new MissingDispatchError('Missing dispatches. Check that you passed the appropriate dispatches to the EntitySearchMain component.');
  
  return (
    <>
      {data.moves.map((moveSearchResult: MoveSearchResult) => {
        const move = new MoveInSearch(moveSearchResult);

        return (
          <>
            <EntitySearchEntry
              entityClass="moves"
              key={'moveEntry_' + move.id}
              name={move.formattedName}
              linkName={move.name}
              description={move.description}
              data={[
                {
                  key: 'Accuracy', value: move.accuracy === 0 ? '--' : move.accuracy,
                },
                {
                  key: 'Category', value: move.category,
                },
                {
                  key: 'Contact', value: move.contact ? 'Yes' : 'No'
                },
                {
                  key: 'Power', value: move.power,
                },
                {
                  key: 'PP', value: move.pp === 0 ? '--': move.pp,
                },
                {
                  key: 'Priority', value: move.priority,
                },
                {
                  key: 'Target', value: move.target,
                },
              ]}
              icons={{
                iconData: move.pokemonIconData,
                dispatchCart,
                dispatchTeam,
              }}
            />
          </>
        );
      })}
    </>
  );
}

type MoveSearchProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const MoveSearch = ({
  dispatchCart,
  dispatchTeam,
  gen,
}: MoveSearchProps) => {
  const [queryVars, setQueryVars] = useState<MoveSearchVars>({
    gen: gen,
    startsWith: '',
    limit: 5,
  })

  const handleSubmit: (newQueryVars: MoveSearchVars) => void = (newQueryVars) => {
    setQueryVars({
      ...newQueryVars,
    });
  }

  return (
    <>
      <EntitySearchMain 
        dispatchCart={dispatchCart}
        dispatchTeam={dispatchTeam}
        gen={gen}
        handleSubmit={handleSubmit}
        listRender={listRender}
        query={MOVE_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default MoveSearch;