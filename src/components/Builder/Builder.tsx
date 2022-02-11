import { useEffect } from "react";
import {
  Outlet,
} from "react-router-dom";

import SimpleBar from "simplebar-react";
import 'simplebar/dist/simplebar.min.css';

import { useWindowSize } from "usehooks-ts";
import { BGAction, BGManager, toggleBGPulse } from "../../hooks/App/BGManager";

import BuilderNavBar from './BuilderNavBar';

import './Builder.css';

type BuilderProps = {
  dispatchBGManager: React.Dispatch<BGAction>
  bgManager: BGManager
  headerRef: React.RefObject<HTMLElement>
}

const Builder = ({
  headerRef,
  bgManager,
  dispatchBGManager,
}: BuilderProps) => {
  const windowSize = useWindowSize();

  // Change background to green
  useEffect(() => {
    dispatchBGManager({
      type: 'change',
      payload: 'green',
    });
    toggleBGPulse(dispatchBGManager);
  }, []);

  return (
    <div 
      className="builder-container"
      style={{
        height: headerRef.current 
          ? `calc(${windowSize.height}px - ${headerRef.current.scrollHeight}px)`
          : '',
      }}
    >
      <BuilderNavBar 
        dispatchBGManager={dispatchBGManager}
        bgManager={bgManager}
      />
      <Outlet />
    </div>
  );
}
export default Builder;