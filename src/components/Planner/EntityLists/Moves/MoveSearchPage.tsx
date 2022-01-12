
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { TeamContext } from "../../../../contexts";
import EntitySearchPage from "../EntitySearchPage";
import MoveEntry from "./MoveEntry";
import { DocumentNode } from 'graphql';
import { MovePageQueryResult, MovePageResult } from "../../../../typeDefs/Move";


type MoveSearchPageProps = {
  entityName: string
  query: DocumentNode
  queryName: string
  searchKeyName: string
}

const MoveSearchPage = ({
  entityName,
  queryName,
  query,
  searchKeyName,
}: MoveSearchPageProps) => {
  const { addToTeam } = useContext(TeamContext);
  
  return (
    <>
      <EntitySearchPage
        pageEntityName={entityName}
        query={query}
        queryName={queryName}
        searchKeyName={searchKeyName}
        listRender={(move: MovePageQueryResult) => (
          <>
            <MoveEntry 
              key={'moveEntry_' + move.id}
              move={new MovePageResult(move)} 
            />
          </>
        )}
      />
      <Outlet />
    </>
  );
};

export default MoveSearchPage;