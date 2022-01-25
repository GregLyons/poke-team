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
  DEFAULT_SINGLES_TIER_FILTER,
  DoublesTier,
  DOUBLES_TIERS,
  SinglesTier,
  SINGLES_TIERS,
  TierFilter,
} from '../utils/smogonLogic';

import NavBar from './NavBar/NavBar';
import GenSlider from './GenSlider';
import TeamDisplay from './PokemonTeam/TeamDisplay';

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

import TierFilterForm from './TierFilter';
import { GenerationNum, ItemIconDatum, PokemonIconDatum, stringToGenNumber } from '../types-queries/helpers';
import { cartReducer, DEFAULT_CART, teamReducer } from '../hooks/app-hooks';


function App() {
  const [gen, setGen] = useState<GenerationNum>(NUMBER_OF_GENS);
  const [tierFilter, setTierFilter] = useState<TierFilter>(DEFAULT_SINGLES_TIER_FILTER);
  const [cart, dispatchCart] = useReducer(cartReducer, DEFAULT_CART);
  const [team, dispatchTeam] = useReducer(teamReducer, []);

  // Change gen when slider is changed
  const handleGenSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGen(stringToGenNumber(e.target.value));
  }

  // Tier filtering
  // #region

  const handleTierModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = (e.target.name as 'singles' | 'doubles');
    if (!name) return;
    setTierFilter({
      ...tierFilter,
      format: name,
    })
  }

  const handleTierFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = (e.target.name as SinglesTier | DoublesTier);
    if (!name) return;
    if (tierFilter.selectionMode === 'exact') {
      setTierFilter({
        ...tierFilter,
        tiers: {
          ...tierFilter.tiers,
          [name]: !tierFilter.tiers[name],
        }
      });
      return;
    }
    else {
      const idx = tierFilter.format === 'singles'
        ? SINGLES_TIERS.findIndex((s: SinglesTier) => s === name)
        : DOUBLES_TIERS.findIndex((s: DoublesTier) => s === name);
      const lowerTierNames = tierFilter.format === 'singles'
        ? SINGLES_TIERS.slice(idx)
        : DOUBLES_TIERS.slice(idx);

      const newFilters: {
        [tierName in SinglesTier | DoublesTier]? : boolean 
      } = {};
      for (let lowerTierName of lowerTierNames) {
        newFilters[lowerTierName] = !tierFilter.tiers[name];
      }

      setTierFilter({
        ...tierFilter,
        tiers: {
          ...tierFilter.tiers,
          ...newFilters,
        }
      });
    }
  }

  const toggleSelectionMode = () => {
    setTierFilter({
      ...tierFilter,
      selectionMode: tierFilter.selectionMode === 'exact' ? 'range' : 'exact',
    })
  }

  // #endregion
  
  return (
    <div className="app">
      <header>
        <NavBar />
        <GenSlider 
          gen={gen}
          handleGenSliderChange={handleGenSliderChange}
        />
        <TierFilterForm
          tierFilter={tierFilter}
          handleTierModeChange={handleTierModeChange}
          handleTierFilterChange={handleTierFilterChange}
          toggleSelectionMode={toggleSelectionMode}
        />
        <TeamDisplay
          dispatchCart={dispatchCart}
          dispatchTeam={dispatchTeam}
          gen={gen}
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
          gen={gen}
          tierFilter={tierFilter}
        />} />

        {/* Routing for Builder */}
        <Route path="/builder" element={<Builder
          cart={cart}
          dispatchCart={dispatchCart}
          dispatchTeam={dispatchTeam}
          gen={gen}
          tierFilter={tierFilter}
        />} >
        {/* */}
          <Route
            index
            element={<BuilderHome
              cart={cart}
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              gen={gen}
              tierFilter={tierFilter}
            />}
          />
        </Route>

        {/* Routing for Planner */}
        <Route path="/planner" element={<Planner 
          dispatchCart={dispatchCart}
          dispatchTeam={dispatchTeam}
          gen={gen}
          tierFilter={tierFilter}
        />} >
          {/* */}
          <Route
            index
            element={<PlannerHome
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              gen={gen}
              tierFilter={tierFilter}
            />}
          />

          {/* */}
          <Route 
            path='abilities' 
            element={<AbilityMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              gen={gen}
              tierFilter={tierFilter}
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
              tierFilter={tierFilter}
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
              tierFilter={tierFilter}
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
            tierFilter={tierFilter}
          />} />

          <Route 
            path='fieldStates' 
            element={<FieldStateMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              gen={gen}
              tierFilter={tierFilter}
            />}
          />
          <Route path="fieldStates/:fieldStateId" element={<FieldStatePage
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            gen={gen}
            tierFilter={tierFilter}
          />} />

          <Route 
            path='stats' 
            element={<StatMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              gen={gen}
              tierFilter={tierFilter}
            />}
          />
          <Route path="stats/:statId" element={<StatPage
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            gen={gen}
            tierFilter={tierFilter}
          />} />

          <Route 
            path='statuses' 
            element={<StatusMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              gen={gen}
              tierFilter={tierFilter}
            />}
          />
          <Route path="statuses/:statusId" element={<StatusPage
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            gen={gen}
            tierFilter={tierFilter}
          />} />

          <Route 
            path='types' 
            element={<TypeMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              gen={gen}
              tierFilter={tierFilter}
            />}
          />
          <Route path="types/:typeId" element={<TypePage
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            gen={gen}
            tierFilter={tierFilter}
          />} />

          <Route 
            path='usageMethods' 
            element={<UsageMethodMainPage
              dispatchCart={dispatchCart}
              dispatchTeam={dispatchTeam}
              gen={gen}
              tierFilter={tierFilter}
            />}
          />
          <Route path="usageMethods/:usageMethodId" element={<UsageMethodPage
            dispatchCart={dispatchCart}
            dispatchTeam={dispatchTeam}
            gen={gen}
            tierFilter={tierFilter}
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
