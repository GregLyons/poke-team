import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';

import NavBar from './NavBar/NavBar';

import './../styles/App.css';
import GenSlider from './GenSlider';
import Team from './PokemonTeam/PokemonTeam';
import { useContext } from 'react';
import { GenContext } from '../contexts';
import { stringToGenNumber } from '../types-queries/Generation';
import Analyzer from './Analyzer/Analyzer';
import Planner from './Planner/Planner';
import Builder from './Builder/Builder';
import PlannerHome from './Planner/EntityLists/PlannerHome';
import MoveMainPage from './Planner/EntityLists/Moves/MoveMainPage';
import EffectMainPage from './Planner/EntityLists/Effects/EffectMainPage';
import MovePage from './Planner/EntityLists/Moves/MovePage';
import EffectPage from './Planner/EntityLists/Effects/EffectPage';


function App() {
  const { gen, setGen } = useContext(GenContext);

  const handleGenSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGen(stringToGenNumber(e.target.value));
  }

  return (
    <>
      <NavBar />
      <GenSlider 
        value={gen}
        handleGenSliderChange={handleGenSliderChange}
      />
      <Team />
      <Routes>
        {/* Routing for Home */}
        <Route path="/" element={<div>Yo</div>} />

        {/* Routing for Analyzer */}
        <Route path="/analyzer" element={<Analyzer />} />

        {/* Routing for Builder */}
        <Route path="/builder" element={<Builder />} />

        {/* Routing for Planner */}
        <Route path="/planner" element={<Planner />}>
          {/* */}
          <Route
            index
            element={<PlannerHome />}
          />

          {/* */}
          <Route 
            path='abilities' 
            element={<PlannerHome />}
          />
          <Route 
            path='items' 
            element={<PlannerHome />}
          />
          <Route 
            path='moves' 
            element={<MoveMainPage />} 
          >
          </Route>
          <Route path="moves/:moveId" element={<MovePage />} />

          {/* */}
          <Route 
            path='effects' 
            element={<EffectMainPage />}
          />
          <Route path="effects/:effectId" element={<EffectPage />} />

          <Route 
            path='field-states' 
            element={<PlannerHome />}
          />
          <Route 
            path='stats' 
            element={<PlannerHome />}
          />
          <Route 
            path='statuses' 
            element={<PlannerHome />}
          />
          <Route 
            path='types' 
            element={<PlannerHome />}
          />
          <Route 
            path='usage-methods' 
            element={<PlannerHome />}
          />

          {/* */}
          <Route
            path='*'
            element={
              <main>
                Bad Planner link
              </main>
            }
          />

        {/* Bad link */}
        <Route path="*" element={
            <main>
              Bad link
            </main>
        } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
