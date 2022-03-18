import { useQuery } from "@apollo/client";
import { DocumentNode } from "graphql";
import LoadIcon from "../../components/Reusables/LoadIcon/LoadIcon";
import { EntityPageQueryName, IntroductionQuery, IntroductionQueryVars, INTRODUCTION_QUERY } from "../../types-queries/Planner/helpers";
import { EntityClass, NUMBER_OF_GENS } from "../../utils/constants";
import { GenFilter } from "../App/GenFilter";

export function useDebutQuery(entityName: string, entityClass: EntityClass, genFilter: GenFilter): JSX.Element | null {
  let queryName: EntityPageQueryName;
  switch(entityClass) {
    case 'Ability':
      queryName = 'abilityByName';
      break;
    case 'Effect':
      queryName = 'effectByName';
      break;
    case 'Field state':
      queryName = 'fieldStateByName';
      break;
    case 'Item':
      queryName = 'itemByName';
      break;
    case 'Move':
      queryName = 'moveByName';
      break;
    case 'Stat':
      queryName = 'statByName';
      break;
    case 'Status':
      queryName = 'statusByName';
      break;
    case 'Type':
      queryName = 'typeByName';
      break;
    case 'Usage method':
      queryName = 'usageMethodByName';
      break;
  }

  const { loading, error, data } = useQuery<IntroductionQuery, IntroductionQueryVars>(INTRODUCTION_QUERY(queryName), {
    variables: {
      gen: NUMBER_OF_GENS,
      name: entityName,
    },
  });

  if (loading) {
    return (
      <LoadIcon />
    );
  }

  if (error) {
    return (
      <div>
        Error for introduction query. {error.message}
      </div>
    );
  }

  if (!data || !data[queryName] || data[queryName]?.length === 0) {
    return (
      <div>
        Data not found for '{entityName}.'
      </div>
    );
  }

  const debutGen = data[queryName]?.[0].introduced.edges[0].node.number;

  if (!debutGen) {
    return (
      <div>
        Data not found for '{entityName}.'
      </div>
    );
  }

  if (debutGen > genFilter.gen) return (
    <div>
      {entityName} doesn't exist in Generation {genFilter.gen}.
    </div>
  );

  return null;
}

export function usePageQuery<PageQuery, PageQueryVars>(
  query: DocumentNode,
  queryVars: PageQueryVars,
  entityName: string,
): { data: PageQuery | undefined, pageComponent: JSX.Element | null } {
  const { loading, error, data } = useQuery<PageQuery, PageQueryVars>(query, {
    variables: queryVars,
  });

  let pageComponent: JSX.Element | null;
  if (loading) {
    pageComponent = (
      <LoadIcon />
    );
  }
  else if (error) {
    pageComponent = (
      <div>
        Error! {error.message}
      </div>
    )
  }
  else if (!data) {
    pageComponent = (
      <div>
        Data not found for '{entityName}'.
      </div>
    );
  }
  else {
    pageComponent = null;
  }

  return { data, pageComponent };
}