require('dotenv').config();

import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import { MainTitle, NewsList } from './components';

import 'milligram';
import './styles.css';

const googleTrackingId = process.env.GOOGLE_TRACKING_ID || '';

ReactGA.initialize(googleTrackingId);

const App = () => {
  return (
    <div className="container">
      <header>
        <div className="row">
          <div className="column"><a href="/">velox.cc</a> / news</div>
        </div>
        <div className="row">
          <div className="column">
            <MainTitle>
              Today&rsquo;s <nobr>Cycling News</nobr>
            </MainTitle>
          </div>
        </div>
      </header>
      <div className="row">
        <div className="column">
          <NewsList />
        </div>
      </div>
    </div>
  );
}

var mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
