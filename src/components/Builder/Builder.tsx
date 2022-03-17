import { useEffect } from "react";
import {
  Outlet
} from "react-router-dom";
import 'simplebar/dist/simplebar.min.css';
import { BGAction, BGManager, toggleBGPulse } from "../../hooks/App/BGManager";
import './Builder.css';
import BuilderNavBar from './BuilderNavBar';

type BuilderProps = {
  bgManager: BGManager
  dispatchBGManager: React.Dispatch<BGAction>
}

const Builder = ({
  bgManager,
  dispatchBGManager,
}: BuilderProps) => {
  useEffect(() => {
    dispatchBGManager({
      type: 'change',
      payload: 'green',
    });
    toggleBGPulse(dispatchBGManager);
  }, []);

  return (
    <>
      <BuilderNavBar
        bgManager={bgManager}
      />
      <div className="main-content__wrapper">
        <Outlet />
      </div>
    </>
  );
}
export default Builder;