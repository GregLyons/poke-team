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
} from '../../../types-queries/Planner/FieldState';

import { CartAction } from "../../../hooks/App/Cart";
import { GenFilter } from "../../../hooks/App/GenFilter";
import { TeamAction } from "../../../hooks/App/Team";

import EntitySearchMain from '../Searches/EntitySearchMain';
import EntitySearchEntry from '../Entries/SearchEntry/SearchEntry';
import { ENUMCASE_TO_TITLECASE } from '../../../utils/constants';
import { useGenConnectedSearchVars } from '../../../hooks/Planner/MainSearches';

const listRender = ({ data, }: ListRenderArgs<FieldStateSearchQuery>) => {
  if (!data || !data.fieldStates) return (<div>Data not found for the query 'fieldStates'.</div>);
  
  return (
    <>
      {data.fieldStates.map((fieldStateSearchResult: FieldStateSearchResult) => {
        const fieldState = new FieldStateInSearch(fieldStateSearchResult);
        
        // Build up field state data, leaving out certain default values
        const fieldStateData: {
          key: string, 
          title: string,
          value: string | number | boolean,
        }[] = [{ key: 'CLASS', title: 'Field state class', value: ENUMCASE_TO_TITLECASE(fieldState.fieldStateClass), }];
        
        if (fieldState.damagePercent > 0) fieldStateData.push({ key: '%HP', title: 'Percent of max HP in damage', value: fieldState.damagePercent + '%', });

        fieldStateData.push({ key: 'GRND', title: 'Only affects grounded targets', value: fieldState.grounded ? 'Yes' : 'No', })

        if (fieldState.maxLayers > 1) fieldStateData.push({ key: 'MAX', title: 'Max number of layers', value: fieldState.maxLayers, });

        fieldStateData.push({ key: 'TAR', title: 'Target', value: ENUMCASE_TO_TITLECASE(fieldState.target), });
        
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
  dispatchBGManager: React.Dispatch<BGAction>
  genFilter: GenFilter
}

const FieldStateSearch = ({
  dispatchCart,
  dispatchTeam,
  dispatchBGManager,
  genFilter,
}: FieldStateSearchMainProps) => {
  const [queryVars, setQueryVars] = useGenConnectedSearchVars<FieldStateSearchVars>(
    {
      gen: genFilter.gen,
      startsWith: '',
      limit: 5,
    },
    genFilter,
  );

  const handleSearchBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryVars({
      ...queryVars,
      startsWith: e.target.value,
    });
  }


  return (
    <>
      <EntitySearchMain
        genFilter={genFilter}
        handleSearchBoxChange={handleSearchBoxChange}
        listRender={listRender}
        query={FIELDSTATE_SEARCH_QUERY}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default FieldStateSearch;