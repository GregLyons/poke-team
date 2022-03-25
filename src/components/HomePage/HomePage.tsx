import { useEffect, useState } from "react";
import { BGAction, BGManager, classWithBGShadow, toggleBGPulse } from "../../hooks/App/BGManager";
import LoadIcon from "../Reusables/LoadIcon/LoadIcon";
import './HomePage.css';

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

  const [opacity, setOpacity] = useState<0 | 1>(0);

  useEffect(() => {
    setOpacity(1);
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
          style={{
            opacity,
            background: 'none',
            transition: 'opacity 2s ease',
          }}
        >
          <h1>Welcome to <span>Bill's PC TEST</span></h1>
          <LoadIcon opaque={true} />
        </div>
      </div>
    </>
  )
};  

export default HomePage;