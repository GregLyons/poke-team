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
import { useContext, useState } from 'react';
import { stringToGenNumber, GenerationNum } from '../types-queries/Generation';
import Analyzer from './Analyzer/Analyzer';
import Planner from './Planner/Planner';
import Builder from './Builder/Builder';
import PlannerHome from './Planner/EntityLists/PlannerHome';
import MoveMainPage from './Planner/EntityLists/Moves/MoveMainPage';
import EffectMainPage from './Planner/EntityLists/Effects/EffectMainPage';
import MovePage from './Planner/EntityLists/Moves/MovePage';
import EffectPage from './Planner/EntityLists/Effects/EffectPage';
import { NUMBER_OF_GENS } from '../utils/constants';

function App() {
  const [gen, setGen] = useState<GenerationNum>(NUMBER_OF_GENS);

  // Change gen when slider is changed
  const handleGenSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGen(stringToGenNumber(e.target.value));
  }

  return (
    <>
      <NavBar />
      <GenSlider 
        gen={gen}
        handleGenSliderChange={handleGenSliderChange}
      />
      <Team 
        gen={gen}
      />
      <Routes>
        {/* Routing for Home */}
        <Route path="/" element={<div>Yo</div>} />

        {/* Routing for Analyzer */}
        <Route path="/analyzer" element={<Analyzer
          gen={gen}
        />} />

        {/* Routing for Builder */}
        <Route path="/builder" element={<Builder
          gen={gen}
        />} />

        {/* Routing for Planner */}
        <Route path="/planner" element={<Planner 
          gen={gen}
        />} >
          {/* */}
          <Route
            index
            element={<PlannerHome
              gen={gen}
            />}
          />

          {/* */}
          <Route 
            path='abilities' 
            element={<PlannerHome
              gen={gen}
            />}
          />
          <Route 
            path='items' 
            element={<PlannerHome
              gen={gen}
            />}
          />
          <Route 
            path='moves' 
            element={<MoveMainPage
              gen={gen}
            />} 
          >
          </Route>
          <Route path="moves/:moveId" element={<MovePage 
            gen={gen}
          />} />

          {/* */}
          <Route 
            path='effects' 
            element={<EffectMainPage
              gen={gen}
            />}
          />
          <Route path="effects/:effectId" element={<EffectPage
            gen={gen}
          />} />

          <Route 
            path='field-states' 
            element={<PlannerHome
              gen={gen}
            />}
          />
          <Route 
            path='stats' 
            element={<PlannerHome
              gen={gen}
            />}
          />
          <Route 
            path='statuses' 
            element={<PlannerHome
              gen={gen}
            />}
          />
          <Route 
            path='types' 
            element={<PlannerHome
              gen={gen}
            />}
          />
          <Route 
            path='usage-methods' 
            element={<PlannerHome
              gen={gen}
            />}
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
