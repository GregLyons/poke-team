import { useEffect } from "react";
import {
  Outlet,
} from "react-router-dom";
import { BGAction, BGManager } from "../../hooks/App/BGManager";

import BuilderNavBar from './BuilderNavBar';

type BuilderProps = {
  dispatchBGManager: React.Dispatch<BGAction>
  bgManager: BGManager
}

const Builder = ({
  bgManager,
  dispatchBGManager,
}: BuilderProps) => {
  // Change background to green
  useEffect(() => {
    dispatchBGManager({
      type: 'change',
      payload: 'green',
    });
  }, []);
  return (
    <div className="builder-container">
      <BuilderNavBar />
      <Outlet />
    </div>
  );
}
export default Builder;