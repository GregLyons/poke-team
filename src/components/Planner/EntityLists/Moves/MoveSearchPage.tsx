
import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { GenContext, TeamContext } from "../../../../contexts";
import EntitySearchPage from "../EntitySearchPage";
import MoveEntry from "./MoveEntry";
import { DocumentNode } from 'graphql';
import {
  MoveSearchQueryResult,
  MoveSearchResult,
  MovePageResult,
} from "../../../../typeDefs/Move";
import {
  MoveSearchQueryVars,
} from "./moveQueries";

const listRender = (data: {
  edges: {
    node: MoveSearchQueryResult
  }[]
}) => {
  return (
    <>
      {data.edges.map((edge: { node: MoveSearchQueryResult }) => {
        const move = edge.node;
        return (
          <>
            <MoveEntry 
              key={'moveEntry_' + move.id}
              move={new MoveSearchResult(move)} 
            />
          </>
        );
      })}
    </>
  )
};

type MoveSearchPageProps = {
  entityName: string
  query: DocumentNode
  queryName: string
  searchKeyName: string
}

const MoveSearchPage = ({
  entityName,
  query,
  searchKeyName,
}: MoveSearchPageProps) => {
  const { gen } = useContext(GenContext);

  const [queryVars, setQueryVars] = useState<MoveSearchQueryVars>({
    gen: gen,
    startsWith: '',
    limit: 5,
  });

  const handleChange: (newQueryVars: MoveSearchQueryVars) => void = (newQueryVars) => {
    setQueryVars({
      ...newQueryVars,
    });
  };
  
  return (
    <>
      <EntitySearchPage
        handleChange={handleChange}
        listRender={listRender}
        query={query}
        queryVars={queryVars}
      />
      <Outlet />
    </>
  );
};

export default MoveSearchPage;