import {
  Outlet
} from "react-router-dom";
import 'simplebar/dist/simplebar.min.css';
import { BGManager } from "../../hooks/App/BGManager";
import './Builder.css';
import BuilderNavBar from './BuilderNavBar';

type BuilderProps = {
  bgManager: BGManager
}

const Builder = ({
  bgManager,
}: BuilderProps) => {
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