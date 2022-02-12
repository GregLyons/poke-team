import { useEffect, useRef } from "react";
import {
  Outlet,
} from "react-router-dom";

import SimpleBar from "simplebar-react";
import 'simplebar/dist/simplebar.min.css';

import { useWindowSize } from "usehooks-ts";
import { BGAction, BGManager, toggleBGPulse } from "../../hooks/App/BGManager";

import BuilderNavBar from './BuilderNavBar';

import './Builder.css';
import { useContainerHeight } from "../../hooks/App/ContainerHeight";

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
  const navBarRef = useRef<HTMLDivElement>(null);
  const [containerHeight, contentHeight] = useContainerHeight(headerRef, navBarRef);

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
        height: containerHeight,
      }}
    > 
      <div
        ref={navBarRef}
        className="nav-bar__ref-container"
      >
        <BuilderNavBar 
          dispatchBGManager={dispatchBGManager}
          bgManager={bgManager}
        />
      </div>
      <div 
        className="content-wrapper"
        style={{
          height: contentHeight,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
export default Builder;