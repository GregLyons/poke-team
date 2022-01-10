import {
  Link,
  Outlet,
} from 'react-router-dom';

import NavBar from './NavBar/NavBar';

import './../styles/App.css';
import GenSwitcher from './GenSwitcher';
import Team from './PokemonTeam/PokemonTeam';

function App() {
  return (
    <div>
      <NavBar />
      <GenSwitcher />
      <Team />
      <Outlet />
    </div>
  );
}

export default App;
