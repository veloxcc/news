require('dotenv').config();

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import TimeAgo from 'react-timeago'
import axios from 'axios';

import 'milligram';
import './styles.css';

const googleTrackingId = process.env.GOOGLE_TRACKING_ID || '';
const feedBaseUrl = process.env.FEED_BASE_URL || '';
const feedUrl = `${feedBaseUrl}/api/news/feed.js`;

ReactGA.initialize(googleTrackingId);

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(feedUrl)
      .then(response => response.status === 200 ? response.data : [])
      .then(newData => {
        setLoading(false);
        setData(newData);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
        setData([]);
      });
  }, []);

  return (
    <div className="container">
      <header>
        <div className="row">
          <div className="column"><a href="/">velox.cc</a> / news</div>
        </div>
        <div className="row">
          <div className="column">
            <h1 className="main-title" style={{ fontSize: '200%' }}>Today's cycling news</h1>
          </div>
        </div>
      </header>
      <div className="row">
        <div className="column">

          {loading && (
            <div>
              <p>fetching news...</p>
            </div>
          )}

          {!loading && data.length === 0 && (
            <div>
              <p>No news at the moment.</p>
            </div>
          )}
    
          <div>
            <ul
              style={{
                listStylePosition: 'outside',
                marginLeft: '16px',
              }}
            >
              {data.length > 0 && data.map(
                ({
                  title,
                  url,
                  source,
                  sourceUrl,
                  time,
                }) => (
                  <li key={url}>

                    <div>
                      <ReactGA.OutboundLink
                        eventLabel={url}
                        to={url}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {title}
                      </ReactGA.OutboundLink>
                      {' '}
                      {time && (
                        <small>
                          <TimeAgo date={time} />
                        </small>
                      )}
                    </div>
                  </li>
                )
              )}
            </ul>

          </div>
        </div>
      </div>
    </div>
  );
}

var mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
