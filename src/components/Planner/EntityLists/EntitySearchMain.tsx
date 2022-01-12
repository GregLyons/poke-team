import {
  DocumentNode,
} from 'graphql';

import {
  useLazyQuery,
} from '@apollo/client';

import {
  GenerationNum,
} from '../../../typeDefs/Generation';

function EntitySearchMain<
  SearchQuery, 
  SearchQueryVars extends { gen: GenerationNum, startsWith: string, },
>({
  controls,
  query,
  listRender,
}: {
  controls: JSX.Element,
  query: DocumentNode,
  listRender: (data: SearchQuery) => JSX.Element,
}): JSX.Element {

  const [executeSearch, { data, loading, error }] = useLazyQuery<SearchQuery, SearchQueryVars>(query);

  // When search button is clicked, execute search based on searchParams and gen.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(controls.submitHandler(e));
    e.preventDefault();
    executeSearch({
      variables: {
        ...controls.submitHandler(e)
      }
    })
  };

  if (error) { return (<div>{error.message}</div>)}

  return (
    <>
      <controls.component />
      {data && listRender(data)}
    </>
  );
};


export default EntitySearchMain;