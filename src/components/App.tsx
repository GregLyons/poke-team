import {
  useReducer,
} from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import './App.css';

import NavBar from './NavBar/NavBar';

import Analyzer from './Analyzer/Analyzer';
import Builder from './Builder/Builder';
import BuilderHome from './Builder/BuilderHome';
import Planner from './Planner/Planner';
import PlannerHome from './Planner/PlannerHome';

import AbilityMainPage from './Planner/Abilities/AbilityMainPage';
import AbilityPage from './Planner/Abilities/AbilityPage';
import EffectMainPage from './Planner/Effects/EffectMainPage';
import EffectPage from './Planner/Effects/EffectPage';
import FieldStatePage from './Planner/FieldStates/FieldStatePage';
import FieldStateMainPage from './Planner/FieldStates/FieldStateMainPage';
import ItemMainPage from './Planner/Items/ItemMainPage';
import ItemPage from './Planner/Items/ItemPage';
import MoveMainPage from './Planner/Moves/MoveMainPage';
import MovePage from './Planner/Moves/MovePage';
import StatMainPage from './Planner/Stats/StatMainPage';
import StatPage from './Planner/Stats/StatPage';
import StatusMainPage from './Planner/Statuses/StatusMainPage';
import StatusPage from './Planner/Statuses/StatusPage';
import TypeMainPage from './Planner/Types/TypeMainPage';
import TypePage from './Planner/Types/TypePage';
import UsageMethodMainPage from './Planner/UsageMethods/UsageMethodMainPage';
import UsageMethodPage from './Planner/UsageMethods/UsageMethodPage';

import ControlPanel from './ControlPanel/ControlPanel';
import { DEFAULT_GEN_FILTER, genReducer } from '../hooks/App/GenFilter';
import { DEFAULT_TIER_FILTER, tierReducer } from '../hooks/App/TierFilter';
import { DEFAULT_POKEMON_FILTER, pokemonReducer } from '../hooks/App/PokemonFilter';
import { cartReducer, DEFAULT_CART } from '../hooks/App/Cart';
import { teamReducer } from '../hooks/App/Team';


function App() {
  const [genFilter, dispatchGenFilter] = useReducer(genReducer, DEFAULT_GEN_FILTER);
  const [tierFilter, dispatchTierFilter] = useReducer(tierReducer, DEFAULT_TIER_FILTER);
  const [pokemonFilter, dispatchPokemonFilter] = useReducer(pokemonReducer, DEFAULT_POKEMON_FILTER);
  const [cart, dispatchCart] = useReducer(cartReducer, DEFAULT_CART);
  const [team, dispatchTeam] = useReducer(teamReducer, []);
  
  return (
    <div className="app__wrapper">
      <div className="left-bg-panel" />
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
          />} />

          {/* Routing for Builder */}
          <Route path="/builder" element={<Builder
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
          />} >
            {/* */}
            <Route
              index
              element={<PlannerHome
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
              tierFilter={tierFilter}
              pokemonFilter={pokemonFilter}
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
              tierFilter={tierFilter}
              pokemonFilter={pokemonFilter}
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
      <div className="right-bg-panel" />
    </div>
  );
}

export default App;
