import React from 'react';
import './App.css';
import Weather from './components/weather';
import {ThemeProvider} from 'styled-components';
import { BrowserRouter } from "react-router-dom";
import {theme} from './appStyle'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from "react-redux";
import {requestAPIReducer, trackingDayReducer} from './context/reducers'
import TrackingChart from './components/tracking-chart';

const store = createStore(combineReducers({
    requestAPIReducer,
    trackingDayReducer
}), applyMiddleware(thunk));

function App() {
  return (
    <div className="App" style={{padding: '5rem 0 0 2rem'}}>
      <ThemeProvider theme={theme}>
          <Provider store={store}>
              <BrowserRouter>
                <Weather/>
                <hr/>
                <TrackingChart />
              </BrowserRouter>
          </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
