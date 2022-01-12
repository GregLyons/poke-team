// React and contexts
// #region

import {
  useContext,
} from 'react';

import {
  Outlet,
} from 'react-router-dom';

import {
  TeamContext,
} from '../../../../contexts';

// #endregion

// Apollo
// #region

import {
  EFFECT_SEARCH_QUERY,
} from './effectQueries';

// #endregion

// Types
// #region

import {
  Effect,
  EffectGQLResult,
} from '../../../../typeDefs/Effect';

// #endregion

// Components
// #region

import EffectEntry from './EffectEntry';
import EntitySearchMain from '../EntitySearchMain';
import { DocumentNode } from 'graphql';

// #endregion

type EffectSearchProps = {
  query: DocumentNode
}

const EffectSearch = ({
  query,
}: EffectSearchProps) => {
  const { addToTeam } = useContext(TeamContext);
  
  return (
    <>   
      {/* <EntitySearchMain 
        query={EFFECT_SEARCH_QUERY}
        keyName={'effects'}
        listRender={(effect: EffectGQLResult) => (
          <>
            <EffectEntry 
              key={'effectEntry_' + effect.id} 
              addToTeam={addToTeam}
              effect={new Effect(effect)} 
            />
          </>
          )}
      /> */}
      <Outlet />
    </>
  );
};

export default EffectSearch;