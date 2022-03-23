import { useEffect } from "react";
import { BGAction, BGManager, classWithBGShadow, toggleBGPulse } from "../hooks/App/BGManager";
import LoadIcon from "./Reusables/LoadIcon/LoadIcon";

type HomePageProps = {
  bgManager: BGManager
  dispatchBGManager: React.Dispatch<BGAction>
};

const HomePage = ({
  bgManager,
  dispatchBGManager,
}: HomePageProps) => {
  useEffect(() => {
    dispatchBGManager({
      type: 'change',
      payload: 'none',
    });
    toggleBGPulse(dispatchBGManager);
  }, []);

  return (
    <>
      <div className={classWithBGShadow("nav-bar__wrapper", bgManager)}>
        {/* */}
        <div className="nav-bar" role="presentation">&nbsp;</div>
      </div>
      <div className={classWithBGShadow("main-content__wrapper", bgManager)}>
        <div
          className="section-home__wrapper home"
        >
          <h1>Welcome to Bill's PC</h1>
          <LoadIcon opaque={true} />
        </div>
      </div>
    </>
  )
};  

export default HomePage;