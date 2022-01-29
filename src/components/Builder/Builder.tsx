import {
  Outlet,
} from "react-router-dom";

import BuilderNavBar from './BuilderNavBar';

type BuilderProps = {
}

const Builder = ({
}: BuilderProps) => {
  return (
    <div className="builder-container">
      <BuilderNavBar />
      <Outlet />
    </div>
  );
}
export default Builder;