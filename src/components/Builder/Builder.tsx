import { useEffect, useRef } from "react";
import {
  Outlet,
} from "react-router-dom";

import SimpleBar from "simplebar-react";
import 'simplebar/dist/simplebar.min.css';

import { useWindowSize } from "usehooks-ts";
import { BGAction, BGManager, classWithBGShadow, toggleBGPulse } from "../../hooks/App/BGManager";

import BuilderNavBar from './BuilderNavBar';

import './Builder.css';
import { useContainerSize } from "../../hooks/App/ContainerSize";

type BuilderProps = {
  dispatchBGManager: React.Dispatch<BGAction>
  bgManager: BGManager
  headerRef: React.RefObject<HTMLElement>
  navBarRef: React.RefObject<HTMLDivElement>
}

const Builder = ({
  dispatchBGManager,
  bgManager,
  headerRef,
  navBarRef,
}: BuilderProps) => {
  const [containerWidth, containerHeight, contentHeight] = useContainerSize(headerRef, navBarRef);

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
        width: containerWidth,
      }}
    > 
      <div
        className="nav-bar__ref-container"
      >
        <BuilderNavBar 
          dispatchBGManager={dispatchBGManager}
          bgManager={bgManager}
        />
      </div>
      <div 
        className={classWithBGShadow("content-wrapper", bgManager)}
        style={{
          height: contentHeight,
          width: 'auto',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
export default Builder;