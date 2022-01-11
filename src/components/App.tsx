import {
  Link,
  Outlet,
} from 'react-router-dom';

import NavBar from './NavBar/NavBar';

import './../styles/App.css';
import GenSlider from './GenSlider';
import Team from './PokemonTeam/PokemonTeam';
import { useContext } from 'react';
import { GenContext } from '../contexts';
import { stringToGenNumber } from '../typeDefs/Generation';

function App() {
  const { gen, setGen } = useContext(GenContext);

  const handleGenSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGen(stringToGenNumber(e.target.value));
  }

  return (
    <div>
      <NavBar />
      <GenSlider 
        value={gen}
        handleGenSliderChange={handleGenSliderChange}
      />
      <Team />
      <Outlet />
    </div>
  );
}

export default App;
