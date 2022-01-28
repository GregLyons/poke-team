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
  Pokemon,
} from '../types-queries/Planner/Pokemon';
import {
  EntityClass,
  NUMBER_OF_GENS,
} from '../utils/constants';
import {
  DoublesTier,
  DOUBLES_TIERS,
  SinglesTier,
  SINGLES_TIERS,
  TierFilter,
} from '../utils/smogonLogic';

import NavBar from './NavBar/NavBar';
import GenFilterForm from './ControlPanel/GenFilterForm/GenFilterForm';
import TeamDisplay from './ControlPanel/PokemonTeam/TeamDisplay';

import Analyzer from './Analyzer/Analyzer';
import Builder from './Builder/Builder';
import BuilderHome from './Builder/BuilderHome';
import Planner from './Planner/Planner';
import PlannerHome from './Planner/EntityLists/PlannerHome';

import AbilityMainPage from './Planner/EntityLists/Abilities/AbilityMainPage';
import AbilityPage from './Planner/EntityLists/Abilities/AbilityPage';
import EffectMainPage from './Planner/EntityLists/Effects/EffectMainPage';
import EffectPage from './Planner/EntityLists/Effects/EffectPage';
import FieldStatePage from './Planner/EntityLists/FieldStates/FieldStatePage';
import FieldStateMainPage from './Planner/EntityLists/FieldStates/FieldStateMainPage';
import ItemMainPage from './Planner/EntityLists/Items/ItemMainPage';
import ItemPage from './Planner/EntityLists/Items/ItemPage';
import MoveMainPage from './Planner/EntityLists/Moves/MoveMainPage';
import MovePage from './Planner/EntityLists/Moves/MovePage';
import StatMainPage from './Planner/EntityLists/Stats/StatMainPage';
import StatPage from './Planner/EntityLists/Stats/StatPage';
import StatusMainPage from './Planner/EntityLists/Statuses/StatusMainPage';
import StatusPage from './Planner/EntityLists/Statuses/StatusPage';
import TypeMainPage from './Planner/EntityLists/Types/TypeMainPage';
import TypePage from './Planner/EntityLists/Types/TypePage';
import UsageMethodMainPage from './Planner/EntityLists/UsageMethods/UsageMethodMainPage';
import UsageMethodPage from './Planner/EntityLists/UsageMethods/UsageMethodPage';

import { GenerationNum, ItemIconDatum, PokemonIconDatum, stringToGenNumber } from '../types-queries/helpers';
import { cartReducer, DEFAULT_CART, DEFAULT_GEN_FILTER, DEFAULT_POKEMON_FILTER, DEFAULT_SINGLES_TIER_FILTER, GenFilter, GenFilterAction, genReducer, pokemonReducer, teamReducer, TierFilterAction, tierReducer } from '../hooks/app-hooks';
import ControlPanel from './ControlPanel/ControlPanel';


function App() {
  const [genFilter, dispatchGenFilter] = useReducer(genReducer, DEFAULT_GEN_FILTER);
  const [tierFilter, dispatchTierFilter] = useReducer(tierReducer, DEFAULT_SINGLES_TIER_FILTER);
  const [pokemonFilter, dispatchPokemonFilter] = useReducer(pokemonReducer, DEFAULT_POKEMON_FILTER);
  const [cart, dispatchCart] = useReducer(cartReducer, DEFAULT_CART);
  const [team, dispatchTeam] = useReducer(teamReducer, []);
  
  return (
    <div className="app">
      <header>
        <NavBar />
        <ControlPanel 
          dispatchCart={dispatchCart}
          dispatchTeam={dispatchTeam}
          dispatchGenFilter={dispatchGenFilter}
          genFilter={genFilter}
          dispatchTierFilter={dispatchTierFilter}
          tierFilter={tierFilter}
          dispatchPokemonFilter={dispatchPokemonFilter}
          pokemonFilter={pokemonFilter}
          team={team}
        />
      </header>
      <Routes>
        {/* Routing for Home */}
        <Route path="/" element={<div>Yo</div>} />

        {/* Routing for Analyzer */}
        <Route path="/analyzer" element={<Analyzer
          dispatchCart={dispatchCart}
          dispatchTeam={dispatchTeam}
          genFilter={genFilter}
          tierFilter={tierFilter}
        />} />

        {/* Routing for Builder */}
        <Route path="/builder" element={<Builder
          cart={cart}
          dispatchCart={dispatchCart}
          dispatchTeam={dispatchTeam}
          genFilter={genFilter}
          tierFilter={tierFilter}
          pokemonFilter={pokemonFilter}
        />} >
        {/* */}
          <Route
            index
            element={<BuilderHome
              cart={cart}
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              genFilter={genFilter}
              tierFilter={tierFilter}
              pokemonFilter={pokemonFilter}
            />}
          />
        </Route>

        {/* Routing for Planner */}
        <Route path="/planner" element={<Planner 
          dispatchCart={dispatchCart}
          dispatchTeam={dispatchTeam}
          genFilter={genFilter}
          tierFilter={tierFilter}
          pokemonFilter={pokemonFilter}
        />} >
          {/* */}
          <Route
            index
            element={<PlannerHome
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              genFilter={genFilter}
              tierFilter={tierFilter}
              pokemonFilter={pokemonFilter}
            />}
          />

          {/* */}
          <Route 
            path='abilities' 
            element={<AbilityMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              genFilter={genFilter}
              tierFilter={tierFilter}
              pokemonFilter={pokemonFilter}
            />}
          />
          <Route path="abilities/:abilityId" element={<AbilityPage 
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            genFilter={genFilter}
          />} />

          <Route 
            path='items' 
            element={<ItemMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              genFilter={genFilter}
              tierFilter={tierFilter}
              pokemonFilter={pokemonFilter}
            />}
          />
          <Route path="items/:itemId" element={<ItemPage 
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            genFilter={genFilter}
          />} />

          <Route 
            path='moves' 
            element={<MoveMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              genFilter={genFilter}
              tierFilter={tierFilter}
              pokemonFilter={pokemonFilter}
            />} 
          >
          </Route>
          <Route path="moves/:moveId" element={<MovePage 
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            genFilter={genFilter}
            tierFilter={tierFilter}
          />} />

          {/* */}
          <Route 
            path='effects' 
            element={<EffectMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              genFilter={genFilter}
            />}
          />
          <Route path="effects/:effectId" element={<EffectPage
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            genFilter={genFilter}
            tierFilter={tierFilter}
            pokemonFilter={pokemonFilter}
          />} />

          <Route 
            path='fieldStates' 
            element={<FieldStateMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              genFilter={genFilter}
              tierFilter={tierFilter}
              pokemonFilter={pokemonFilter}
            />}
          />
          <Route path="fieldStates/:fieldStateId" element={<FieldStatePage
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            genFilter={genFilter}
            tierFilter={tierFilter}
            pokemonFilter={pokemonFilter}
          />} />

          <Route 
            path='stats' 
            element={<StatMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              genFilter={genFilter}
              tierFilter={tierFilter}
              pokemonFilter={pokemonFilter}
            />}
          />
          <Route path="stats/:statId" element={<StatPage
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            genFilter={genFilter}
            tierFilter={tierFilter}
            pokemonFilter={pokemonFilter}
          />} />

          <Route 
            path='statuses' 
            element={<StatusMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              genFilter={genFilter}
              tierFilter={tierFilter}
              pokemonFilter={pokemonFilter}
            />}
          />
          <Route path="statuses/:statusId" element={<StatusPage
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            genFilter={genFilter}
            tierFilter={tierFilter}
            pokemonFilter={pokemonFilter}
          />} />

          <Route 
            path='types' 
            element={<TypeMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              genFilter={genFilter}
              tierFilter={tierFilter}
              pokemonFilter={pokemonFilter}
            />}
          />
          <Route path="types/:typeId" element={<TypePage
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            genFilter={genFilter}
            tierFilter={tierFilter}
            pokemonFilter={pokemonFilter}
          />} />

          <Route 
            path='usageMethods' 
            element={<UsageMethodMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              genFilter={genFilter}
              tierFilter={tierFilter}
              pokemonFilter={pokemonFilter}
            />}
          />
          <Route path="usageMethods/:usageMethodId" element={<UsageMethodPage
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            genFilter={genFilter}
            tierFilter={tierFilter}
            pokemonFilter={pokemonFilter}
          />} />

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
    </div>
  );
}

export default App;
