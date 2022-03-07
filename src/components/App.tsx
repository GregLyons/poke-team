import {
  useMemo,
  useReducer,
  useRef,
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

import AbilityPage from './Planner/Abilities/AbilityPage';
import EffectPage from './Planner/Effects/EffectPage';
import FieldStatePage from './Planner/FieldStates/FieldStatePage';
import ItemPage from './Planner/Items/ItemPage';
import MovePage from './Planner/Moves/MovePage';
import StatPage from './Planner/Stats/StatPage';
import StatusPage from './Planner/Statuses/StatusPage';
import TypePage from './Planner/Types/TypePage';
import UsageMethodPage from './Planner/UsageMethods/UsageMethodPage';

import ControlPanel from './ControlPanel/ControlPanel';
import { DEFAULT_GEN_FILTER, GenFilter, GenFilterAction, genReducer } from '../hooks/App/GenFilter';
import { DEFAULT_TIER_FILTER, TierFilter, TierFilterAction, tierReducer } from '../hooks/App/TierFilter';
import { DEFAULT_POKEMON_FILTER, PokemonFilter, PokemonFilterAction, pokemonReducer } from '../hooks/App/PokemonFilter';
import { CartAction, cartReducer, DEFAULT_CART } from '../hooks/App/Cart';
import { DEFAULT_TEAM, TeamAction, teamReducer } from '../hooks/App/Team';
import { BGAction, bgReducer, classWithBG, classWithBGShadow, DEFAULT_BACKGROUND } from '../hooks/App/BGManager';
import CartView from './Builder/CartView/CartView';
import TeamView from './Builder/TeamView/TeamView';
import QuickSearch from './Builder/QuickSearch/QuickSearch';
import AnalyzerHome from './Analyzer/AnalyzerHome';
import CoverageView from './Analyzer/CoverageView/CoverageView';
import AbilitySearch from './Planner/Abilities/AbilitySearch';
import ItemSearch from './Planner/Items/ItemSearch';
import MoveSearch from './Planner/Moves/MoveSearch';
import EffectSearch from './Planner/Effects/EffectSearch';
import FieldStateSearch from './Planner/FieldStates/FieldStateSearch';
import StatSearch from './Planner/Stats/StatSearch';
import StatusSearch from './Planner/Statuses/StatusSearch';
import TypeSearch from './Planner/Types/TypeSearch';
import UsageMethodSearch from './Planner/UsageMethods/UsageMethodSearch';

export type Dispatches = {
  dispatchCart: React.Dispatch<CartAction>
  dispatchGenFilter: React.Dispatch<GenFilterAction>
  dispatchPokemonFilter: React.Dispatch<PokemonFilterAction>
  dispatchTeam: React.Dispatch<TeamAction>
  dispatchTierFilter: React.Dispatch<TierFilterAction>
  dispatchBGManager: React.Dispatch<BGAction>
}

export type Filters = {
  genFilter: GenFilter
  tierFilter: TierFilter
  pokemonFilter: PokemonFilter
}

function App() {
  const [genFilter, dispatchGenFilter] = useReducer(genReducer, DEFAULT_GEN_FILTER);
  const [tierFilter, dispatchTierFilter] = useReducer(tierReducer, DEFAULT_TIER_FILTER);
  const [pokemonFilter, dispatchPokemonFilter] = useReducer(pokemonReducer, DEFAULT_POKEMON_FILTER);
  const [cart, dispatchCart] = useReducer(cartReducer, DEFAULT_CART);
  const [team, dispatchTeam] = useReducer(teamReducer, DEFAULT_TEAM);
  const [bgManager, dispatchBGManager] = useReducer(bgReducer, DEFAULT_BACKGROUND);

  const controlPanelRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  
  const dispatches: Dispatches = useMemo(() => {
    return {
      dispatchCart,
      dispatchGenFilter,
      dispatchPokemonFilter,
      dispatchTeam,
      dispatchTierFilter,
      dispatchBGManager,
    }
  }, [dispatchCart, dispatchGenFilter, dispatchPokemonFilter, dispatchTeam, dispatchTierFilter, dispatchBGManager]);

  const filters: Filters = useMemo(() => {
    return {
      genFilter,
      tierFilter,
      pokemonFilter,
    }
  }, [genFilter, tierFilter, pokemonFilter]);
  
  return (
    <div className={classWithBG("app__wrapper", bgManager)}>
      <div className={classWithBG("left-bg-panel", bgManager)} />
      <div className={classWithBG(classWithBGShadow("app", bgManager), bgManager)}>
        <header>
          <NavBar
            headerRef={controlPanelRef}
            navBarRef={navBarRef}
            bgManager={bgManager}
          />
          <ControlPanel
            dispatches={dispatches}
            filters={filters}
            headerRef={controlPanelRef}
            bgManager={bgManager}
            team={team}
          />
        </header>
        <Routes>
          {/* Routing for Home */}
          <Route path="/" element={<div>Yo</div>} />

          {/* Routing for Analyzer */}
          <Route path="/analyzer" element={<Analyzer
            headerRef={controlPanelRef}
            navBarRef={navBarRef}
            bgManager={bgManager}
            dispatchBGManager={dispatchBGManager}
          />}>
            <Route
              index
              element={<AnalyzerHome
              />}
            />
            <Route
              path='coverage'
              element={<CoverageView
                dispatches={dispatches}
                filters={filters}
                team={team}
              />}
            />
          </Route>

          {/* Routing for Builder */}
          <Route path="/builder" element={<Builder
            headerRef={controlPanelRef}
            navBarRef={navBarRef}
            bgManager={bgManager}
            dispatchBGManager={dispatchBGManager}
          />} >
          {/* */}
            <Route
              index
              element={<BuilderHome
              />}
            />
            <Route
              path='cart'
              element={<CartView
                cart={cart}
                team={team}
                dispatches={dispatches}
                filters={filters}
              />}
            />
            <Route
              path='team'
              element={<TeamView
                bgManager={bgManager}
                dispatches={dispatches}
                filters={filters}
                team={team}
              />}
            />
            <Route
              path='quickSearch'
              element={<QuickSearch
                dispatches={dispatches}
                filters={filters}
                team={team}
              />}
            />
          </Route>

          {/* Routing for Planner */}
          <Route path="/planner" element={<Planner
            headerRef={controlPanelRef}
            navBarRef={navBarRef}
            bgManager={bgManager}
            dispatchBGManager={dispatchBGManager}
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
              element={<AbilitySearch
                dispatches={dispatches}
                filters={filters}
              />}
            />
            <Route path="abilities/:abilityId" element={<AbilityPage 
              dispatches={dispatches}
              filters={filters}
            />} />

            <Route 
              path='items' 
              element={<ItemSearch
                dispatches={dispatches}
                filters={filters}
              />}
            />
            <Route path="items/:itemId" element={<ItemPage 
              dispatches={dispatches}
              filters={filters}
            />} />

            <Route 
              path='moves' 
              element={<MoveSearch
                dispatches={dispatches}
                filters={filters}
              />} 
            >
            </Route>
            <Route path="moves/:moveId" element={<MovePage 
              dispatches={dispatches}
              filters={filters}
            />} />

            {/* */}
            <Route 
              path='effects' 
              element={<EffectSearch
                genFilter={genFilter}
              />}
            />
            <Route path="effects/:effectId" element={<EffectPage
              dispatches={dispatches}
              filters={filters}
            />} />

            <Route 
              path='fieldStates' 
              element={<FieldStateSearch
                genFilter={genFilter}
              />}
            />
            <Route path="fieldStates/:fieldStateId" element={<FieldStatePage
              dispatches={dispatches}
              filters={filters}
            />} />

            <Route 
              path='stats' 
              element={<StatSearch
                genFilter={genFilter}
              />}
            />
            <Route path="stats/:statId" element={<StatPage
              dispatches={dispatches}
              filters={filters}
            />} />

            <Route 
              path='statuses' 
              element={<StatusSearch
                genFilter={genFilter}
              />}
            />
            <Route path="statuses/:statusId" element={<StatusPage
              dispatches={dispatches}
              filters={filters}
            />} />

            <Route 
              path='types' 
              element={<TypeSearch
                dispatches={dispatches}
                filters={filters}
              />}
            />
            <Route path="types/:typeId" element={<TypePage
              dispatches={dispatches}
              filters={filters}
            />} />

            <Route 
              path='usageMethods' 
              element={<UsageMethodSearch
                genFilter={genFilter}
              />}
            />
            <Route path="usageMethods/:usageMethodId" element={<UsageMethodPage
              dispatches={dispatches}
              filters={filters}
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
      <div className={classWithBG("right-bg-panel", bgManager)} />
    </div>
  );
}

export default App;
