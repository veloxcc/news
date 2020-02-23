require('dotenv').config();

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import axios from 'axios';

import { MainTitle, NewsList, Message } from './components';

import 'milligram';
import './styles.css';

const googleTrackingId = process.env.GOOGLE_TRACKING_ID || '';
const feedBaseUrl = process.env.FEED_BASE_URL || '';
const feedUrl = `${feedBaseUrl}/api/news/feed.js`;

ReactGA.initialize(googleTrackingId);

const NoNewsMessage = (
  <Message>
    <p>No news at the moment.</p>
  </Message>
);

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = () => {
    const onData = data => {
      setLoading(false);
      setData(data);
    };

    axios.get(feedUrl)
      .then(response => response.status === 200 ? response.data : [])
      .then(onData)
      .catch(error => {
        console.error(error);
        setLoading(false);
        setData([]);
      });
  };

  useEffect(() => {
    if (loading === true) fetchNews();
  }, [loading]);

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
          {!loading && data.length === 0 && NoNewsMessage}
          {data.length > 0 && <NewsList data={data} />}
        </div>
      </div>
    </div>
  );
}

var mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
