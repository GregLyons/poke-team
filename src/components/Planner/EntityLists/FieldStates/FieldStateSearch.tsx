import {
  useState,
} from 'react';
import {
  Outlet,
} from 'react-router-dom';

import {
  ListRenderArgs, 
} from '../helpers';
import {
  FieldStateSearchQuery,
  FieldStateSearchResult,
  FieldStateSearchVars,
  FieldStateInSearch,

  FIELDSTATE_SEARCH_QUERY,
} from '../../../../types-queries/Planner/FieldState';
import {
  GenerationNum,
} from '../../../../types-queries/helpers';

import { 
  CartAction,
  TeamAction,
} from '../../../../hooks/app-hooks';

import EntitySearchMain from '../EntitySearchMain';
import EntitySearchEntry from '../EntitySearchEntry';
import { ENUMCASE_TO_TITLECASE } from '../../../../utils/constants';

const listRender = ({ data, }: ListRenderArgs<FieldStateSearchQuery>) => {
  if (!data || !data.fieldStates) return (<div>Data not found for the query 'fieldStates'.</div>);
  
  return (
    <>
      {data.fieldStates.map((fieldStateSearchResult: FieldStateSearchResult) => {
        const fieldState = new FieldStateInSearch(fieldStateSearchResult);
        
        // Build up field state data, leaving out certain default values
        const fieldStateData: { key: string, value: string | number | boolean }[] = [{ key: 'Class', value: ENUMCASE_TO_TITLECASE(fieldState.fieldStateClass), }];
        
        if (fieldState.damagePercent > 0) fieldStateData.push({ key: 'Damage %', value: fieldState.damagePercent, });

        fieldStateData.push({ key: 'Grounded', value: fieldState.grounded ? 'Yes' : 'No', })

        if (fieldState.maxLayers > 1) fieldStateData.push({ key: 'Max layers', value: fieldState.maxLayers, });

        fieldStateData.push({ key: 'Target', value: ENUMCASE_TO_TITLECASE(fieldState.target), });
        
        return (
          <>
            <EntitySearchEntry
              entityClass="Field state"
              key={'fieldStateEntry_' + fieldState.id}
              name={fieldState.formattedName}
              linkName={fieldState.name}
              data={fieldStateData}
              description={fieldState.description}
            />
          </>
        );
      })}
    </>
  );
}

type FieldStateSearchMainProps = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchTeam: React.Dispatch<TeamAction>
  gen: GenerationNum
}

const FieldStateSearch = ({
  dispatchCart,
  dispatchTeam,
  gen,
}: FieldStateSearchMainProps) => {

  const [queryVars, setQueryVars] = useState<FieldStateSearchVars>({
    gen: gen,
    startsWith: '',
    limit: 100,
  })

  const handleSubmit: (newQueryVars: FieldStateSearchVars) => void = (newQueryVars) => {
    setQueryVars({
      ...newQueryVars,
    });
  }

  return (
    <>
      <EntitySearchMain
        gen={gen}
        handleSubmit={handleSubmit}
        listRender={listRender}
        query={FIELDSTATE_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default FieldStateSearch;