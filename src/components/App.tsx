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
  DEFAULT_TIER_FILTER,
  EntityClass,
  NUMBER_OF_GENS,
  SinglesTier,
  TierFilter,
} from '../utils/constants';

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

export type Team = Pokemon[];
export type TeamAction = 
| { type: 'add', payload: Pokemon, }
| { type: 'remove', payload: number, }

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

export type Cart = {
  pokemon: {
    [parentEntityClass in EntityClass]?: {
      [targetEntityClass in EntityClass | 'Has']?: {
        // Key: Describes relationship between parent and target entity.
        // Value: Pokemon from selection.
        [note: string]: PokemonIconDatum[]
      }
    } 
  }
  items: {
    [parentEntityClass in EntityClass]?: {
      [targetEntityClass in EntityClass | 'From search']?: {
        // Key: Describes relationship between parent and target entity.
        // Value: Pokemon required for item, or [].
        [note: string]: PokemonIconDatum[]
      }
    } 
  }
};


export type CartAction =
| { 
    type: 'add_pokemon',
    payload: {
      pokemon: PokemonIconDatum[],
      parentEntityClass: EntityClass,
      targetEntityClass: EntityClass | 'Has',
      note: string,
    },
  }
| {
    type: 'add_item'
    payload: {
      item: ItemIconDatum,
      requiredPokemon: PokemonIconDatum[],
      parentEntityClass: EntityClass,
      targetEntityClass: EntityClass | 'From search'
      note: string
    }
  }
| { type: 'remove', };

function cartReducer(state: Cart, action: CartAction) {
  switch(action.type) {
    case 'add_pokemon':
      return {
        ...state,
        // Overwriting Pokemon
        pokemon: {
          // Overwriting parentEntityClass
          ...state.pokemon,
          [action.payload.parentEntityClass]: {
            // Overwriting targetEntityClass within parentEntityClass
            ...state.pokemon?.[action.payload.parentEntityClass],
            [action.payload.targetEntityClass]: {
              // Overwriting note within targetEntityClass
              ...state.pokemon?.[action.payload.parentEntityClass]?.[action.payload.targetEntityClass],
              [action.payload.note]: action.payload.pokemon,
            }
          }
        }
      }
    case 'add_item':
      return {
        ...state,
        // Overwriting items
        items: {
          // Overwriting parentEntityClass
          ...state.items,
          [action.payload.parentEntityClass]: {
            // Overwriting targetEntityClass within parentEntityClass
            ...state.items?.[action.payload.parentEntityClass],
            [action.payload.targetEntityClass]: {
              // Overwriting note within targetEntityClass
              ...state.items?.[action.payload.parentEntityClass]?.[action.payload.targetEntityClass],
              [action.payload.note]: action.payload.requiredPokemon,
            }
          }
        }
      }
    case 'remove':
      return state;
    default:
      throw new Error();
  }
}

function App() {
  const [gen, setGen] = useState<GenerationNum>(NUMBER_OF_GENS);
  const [tierFilter, setTierFilter] = useState<TierFilter>(DEFAULT_TIER_FILTER);
  const [cart, dispatchCart] = useReducer(cartReducer, { pokemon: {}, items: {}});
  const [team, dispatchTeam] = useReducer(teamReducer, []);

  // Change gen when slider is changed
  const handleGenSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGen(stringToGenNumber(e.target.value));
  }

  const handleTierFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = (e.target.name as SinglesTier);
    if (!name) return;
    setTierFilter({
      ...tierFilter,
      [name]: !tierFilter[name],
    });
  }
  console.log('app');
  console.log(cart);

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
          handleTierFilterChange={handleTierFilterChange}
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
