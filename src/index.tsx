import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

// Routing
// #region

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

// Analyzer components
// #region 

import Analyzer from './components/Analyzer/Analyzer';

// #endregion

// Builder components
// #region 

import Builder from './components/Builder/Builder';

// #endregion

// Planner components
// #region 

import Planner from './components/Planner/Planner';
import PlannerHome from './components/Planner/EntityLists/PlannerHome';

import EffectSearch from './components/Planner/EntityLists/Effects/EffectSearchMain';
import EffectPage from './components/Planner/EntityLists/Effects/EffectPage';
import MoveMainSearch from './components/Planner/EntityLists/Moves/MoveSearchMain';
import MovePage from './components/Planner/EntityLists/Moves/MovePage';

// #endregion

// #endregion

import { 
  ContextProvider
} from "./contexts";

// Set up ApolloClient
//#region

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import MoveMainPage from './components/Planner/EntityLists/Moves/MoveMainPage';
import EffectMainPage from './components/Planner/EntityLists/Effects/EffectMainPage';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

//#endregion

ReactDOM.render(
  <ApolloProvider client={client}>
  <ContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ContextProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
