import {
  ApolloClient, ApolloProvider, createHttpLink,
  InMemoryCache
} from '@apollo/client';
import ReactDOM from 'react-dom';
import {
  BrowserRouter
} from 'react-router-dom';
import App from './components/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
// Set up ApolloClient
//#region

const httpLink = createHttpLink({
  // URL for API
  uri: process.env.REACT_APP_BASE_URL,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

//#endregion

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
