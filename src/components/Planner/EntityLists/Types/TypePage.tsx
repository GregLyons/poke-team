import {
  useEffect,
} from 'react';
import {
  Outlet,
  useParams,
} from 'react-router-dom';
import {
  useLazyQuery,
} from '@apollo/client';

import {
  useEntityConnectionChangeHandler,
} from '../helpers';
import {
  TYPE_PAGE_QUERY,
  TypePageQuery,
  TypePageQueryVars,
  TypeOnPage,

  TYPE_ABILITY_QUERY,
  TypeAbilityQueryVars,

  TYPE_FIELDSTATE_QUERY,
  TypeFieldStateQueryVars,

  TYPE_ITEM_QUERY,
  TypeItemQueryVars,

  TYPE_MOVE_QUERY,
  TypeMoveQueryVars,
} from '../../../../types-queries/Type';
import {
  INTRODUCTION_QUERY,
  
  IntroductionQuery,
  IntroductionQueryVars,
} from '../../../../types-queries/helpers';
import {
  NUMBER_OF_GENS,
  TierFilter,
} from '../../../../utils/constants';
import {
  GenerationNum,
} from '../../../../types-queries/Generation';

import { 
  CartAction,
  TeamAction,
} from "../../../App";
import {
  listRenderTypeAbility,
  listRenderTypeFieldState,
  listRenderTypeItem,
  listRenderTypeMove,
} from './TypeConnections';
import AuxEntityDescription from '../AuxEntityDescription';

import EntityConnectionSearch from '../EntityConnectionSearch';
import ConnectionAccordion from '../ConnectionAccordion';

type TypePageProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
  tierFilter: TierFilter
}

const TypePage = ({
  dispatchCart,
  dispatchTeam,
  gen,
  tierFilter,
}: TypePageProps) => {
  const params = useParams();
  
  const typeName = params.typeId || '';

  // Connection queries
  // #region 
  
  const [abilityQueryVars, handleChangeAbility] = useEntityConnectionChangeHandler<TypeAbilityQueryVars>({
    gen: gen,
    name: typeName,
  });

  const [fieldStateQueryVars, handleChangeFieldState] = useEntityConnectionChangeHandler<TypeFieldStateQueryVars>({
    gen: gen,
    name: typeName,
  });

  const [itemQueryVars, handleChangeItem] = useEntityConnectionChangeHandler<TypeItemQueryVars>({
    gen: gen,
    name: typeName,
  });

  const [moveQueryVars, handleChangeMove] = useEntityConnectionChangeHandler<TypeMoveQueryVars>({
    gen: gen,
    name: typeName,
  });

  // #endregion

  const [executeSearch, { loading, error, data }] = useLazyQuery<TypePageQuery, TypePageQueryVars>(
  TYPE_PAGE_QUERY);
  useEffect(() => {
    executeSearch({
      variables: {
        gen: gen,
        name: typeName,
      }
    })
  }, [gen, typeName, executeSearch]);
      
  // Before actually getting the move data, we need to check that it's present in the given generation
  // #region
  
  const [executeDebutSearch, { loading: loading_introduced, error: error_introduced, data: data_introduced }] = useLazyQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY('typeByName'));

  useEffect(() => {
    console.log('intro queried');
    executeDebutSearch({
      variables: {
        gen: NUMBER_OF_GENS,
        name: typeName,
      }
    });
  }, [])

  if (loading_introduced) {
    console.log('loading debut');
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (error_introduced) {
    console.log('error debut');
    return (
      <div>
        Error for introduction query! {error_introduced.message}
      </div>
    );
  } 

  if (!data_introduced || !data_introduced.typeByName || (data_introduced.typeByName.length === 0)) {
    console.log('debut data not found');
    return (
    <div>
      Data not found for '{typeName}'.
    </div>
    );
  }

  const debutGen = data_introduced.typeByName[0].introduced.edges[0].node.number;

  if (debutGen > gen) return (
    <div>
      {typeName} doesn't exist in Generation {gen}.
    </div>
  );

  // #endregion
  
  // Now that we know the type exists in this gen, we check the actual data
  // # region

  if (loading) {
    console.log('loading');
    return (
      <div>
        Loading...
      </div>
    );
  }
  else if (error) {
    console.log('error');
    console.log()
    return (
      <div>
        Error! {error.message}
      </div>
    )
  }
  else if (!data) {
    console.log('data not found');
    return (
      <div>
        Data not found for '{typeName}'.
      </div>
    );
  }
  else if (!data.typeByName) {
    console.log('invalid query');
    return (
      <div>
        'typeByName' is not a valid query for '{typeName}'.
      </div>
    );
  }
  else if (data.typeByName.length === 0) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  
  // #endregion

  const typeResult = new TypeOnPage(data.typeByName[0]);

  return (
    <div className="planner__page">
      <h1 className="planner__page-header">{typeResult.formattedName}</h1>

      <AuxEntityDescription
        description={typeResult.description}
      />

      <ConnectionAccordion 
        accordionData={[
          {
            title: `Ability interactions with ${typeResult.formattedName}`,
            content: typeResult.abilityCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                gen={gen}
                tierFilter={tierFilter}
                handleChange={handleChangeAbility}
                listRender={listRenderTypeAbility}
                query={TYPE_ABILITY_QUERY}
                queryVars={abilityQueryVars}
              />
            </>,
          },
          {
            title: `Field state interactions with ${typeResult.formattedName}`,
            content: typeResult.fieldStateCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                gen={gen}
                tierFilter={tierFilter}
                handleChange={handleChangeFieldState}
                listRender={listRenderTypeFieldState}
                query={TYPE_FIELDSTATE_QUERY}
                queryVars={fieldStateQueryVars}
              />
            </>,
          },
          {
            title: `Item interactions with ${typeResult.formattedName}`,
            content: typeResult.itemCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                gen={gen}
                tierFilter={tierFilter}
                handleChange={handleChangeItem}
                listRender={listRenderTypeItem}
                query={TYPE_ITEM_QUERY}
                queryVars={itemQueryVars}
              />
            </>,
          },
          {
            title: `Move interactions with ${typeResult.formattedName}`,
            content: typeResult.moveCount > 0 && <>
              <EntityConnectionSearch
                dispatchCart={dispatchCart}
                dispatchTeam={dispatchTeam}
                gen={gen}
                tierFilter={tierFilter}
                handleChange={handleChangeMove}
                listRender={listRenderTypeMove}
                query={TYPE_MOVE_QUERY}
                queryVars={moveQueryVars}
              />
            </>,
          },
        ]}
      />
      <Outlet />
    </div>
  );
}

export default TypePage;