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
import PlannerPage from './components/Planner/EntityLists/PlannerPage';

import MoveList from './components/Planner/EntityLists/Moves/MoveList';

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
    <Routes>
      <Route path="/" element={<App />}>
        {/* Routing for Analyzer */}
        <Route path="/analyzer" element={<Analyzer />} />

        {/* Routing for Builder */}
        <Route path="/builder" element={<Builder />} />

        {/* Routing for Planner */}
        <Route path="/planner" element={<Planner />}>
          {/* */}
          <Route 
            path='abilities' 
            element={<PlannerPage />}
          />
          <Route 
            path='items' 
            element={<PlannerPage />}
          />
          <Route 
            path='moves' 
            element={<PlannerPage />} 
          />

          {/* */}
          <Route 
            path='effects' 
            element={<PlannerPage />}
          />
          <Route 
            path='field-states' 
            element={<PlannerPage />}
          />
          <Route 
            path='stats' 
            element={<PlannerPage />}
          />
          <Route 
            path='statuses' 
            element={<PlannerPage />}
          />
          <Route 
            path='types' 
            element={<PlannerPage />}
          />
          <Route 
            path='usage-methods' 
            element={<PlannerPage />}
          />
        </Route>

        {/* Bad link */}
        <Route path="*" element={
          <main>
            Bad link
          </main>
        } />
      </Route>
    </Routes> 
  </BrowserRouter>
  </ContextProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
