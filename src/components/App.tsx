import {
  useReducer,
  useState,
} from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import './../styles/App.css';

import {
  stringToGenNumber,
  GenerationNum,
} from '../types-queries/Generation';
import {
  Pokemon,
} from '../types-queries/Pokemon';
import {
  NUMBER_OF_GENS,
} from '../utils/constants';

import NavBar from './NavBar/NavBar';
import GenSlider from './GenSlider';
import TeamDisplay from './PokemonTeam/TeamDisplay';

import Analyzer from './Analyzer/Analyzer';
import Builder from './Builder/Builder';
import Planner from './Planner/Planner';
import PlannerHome from './Planner/EntityLists/PlannerHome';

import AbilityMainPage from './Planner/EntityLists/Abilities/AbilityMainPage';
import AbilityPage from './Planner/EntityLists/Abilities/AbilityPage';
import EffectMainPage from './Planner/EntityLists/Effects/EffectMainPage';
import EffectPage from './Planner/EntityLists/Effects/EffectPage';
import ItemMainPage from './Planner/EntityLists/Items/ItemMainPage';
import ItemPage from './Planner/EntityLists/Items/ItemPage';
import MoveMainPage from './Planner/EntityLists/Moves/MoveMainPage';
import MovePage from './Planner/EntityLists/Moves/MovePage';
import FieldStatePage from './Planner/EntityLists/FieldStates/FieldStatePage';
import FieldStateMainPage from './Planner/EntityLists/FieldStates/FieldStateMainPage';


export type Team = Pokemon[];
export type TeamAction = 
| { type: 'add', payload: Pokemon }
| { type: 'remove', payload: number }

function teamReducer(state: Team, action: TeamAction) {
  switch(action.type) {
    case 'add':
      return [
        ...state,
        action.payload,
      ];
    case 'remove':
      return state.filter((d, i) => i !== action.payload);
    default:
      throw new Error();
  }
}

export type Cart = Pokemon[];
export type CartAction =
| { type: 'add' }
| { type: 'remove' }

function cartReducer(state: Cart, action: CartAction) {
  switch(action.type) {
    case 'add':
      return state;
    case 'remove':
      return state;
    default:
      throw new Error();
  }
}

function App() {
  const [gen, setGen] = useState<GenerationNum>(NUMBER_OF_GENS);
  const [cart, dispatchCart] = useReducer(cartReducer, []);
  const [team, dispatchTeam] = useReducer(teamReducer, []);

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
      <TeamDisplay
        dispatchCart={dispatchCart}
        dispatchTeam={dispatchTeam}
        gen={gen}
        team={team}
      />
      <Routes>
        {/* Routing for Home */}
        <Route path="/" element={<div>Yo</div>} />

        {/* Routing for Analyzer */}
        <Route path="/analyzer" element={<Analyzer
          dispatchCart={dispatchCart}
          dispatchTeam={dispatchTeam}
          gen={gen}
        />} />

        {/* Routing for Builder */}
        <Route path="/builder" element={<Builder
          dispatchCart={dispatchCart}
          dispatchTeam={dispatchTeam}
          gen={gen}
        />} />

        {/* Routing for Planner */}
        <Route path="/planner" element={<Planner 
          dispatchCart={dispatchCart}
          dispatchTeam={dispatchTeam}
          gen={gen}
        />} >
          {/* */}
          <Route
            index
            element={<PlannerHome
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              gen={gen}
            />}
          />

          {/* */}
          <Route 
            path='abilities' 
            element={<AbilityMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              gen={gen}
            />}
          />
          <Route path="abilities/:abilityId" element={<AbilityPage 
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            gen={gen}
          />} />

          <Route 
            path='items' 
            element={<ItemMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              gen={gen}
            />}
          />
          <Route path="items/:itemId" element={<ItemPage 
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            gen={gen}
          />} />

          <Route 
            path='moves' 
            element={<MoveMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              gen={gen}
            />} 
          >
          </Route>
          <Route path="moves/:moveId" element={<MovePage 
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            gen={gen}
          />} />

          {/* */}
          <Route 
            path='effects' 
            element={<EffectMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              gen={gen}
            />}
          />
          <Route path="effects/:effectId" element={<EffectPage
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            gen={gen}
          />} />

          <Route 
            path='fieldStates' 
            element={<FieldStateMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              gen={gen}
            />}
          />
          <Route path="fieldStates/:fieldStateId" element={<FieldStatePage
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            gen={gen}
          />} />

          <Route 
            path='stats' 
            element={<PlannerHome
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              gen={gen}
            />}
          />
          <Route 
            path='statuses' 
            element={<PlannerHome
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              gen={gen}
            />}
          />
          <Route 
            path='types' 
            element={<PlannerHome
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              gen={gen}
            />}
          />
          <Route 
            path='usage-methods' 
            element={<PlannerHome
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
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
