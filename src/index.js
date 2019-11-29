require('dotenv').config();

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import TimeAgo from 'react-timeago'
import axios from 'axios';
import Img, { CloudimageProvider } from 'react-cloudimage-responsive';

import placeholderImage from './placeholder.png';
import 'milligram';
import './styles.css';

const googleTrackingId = process.env.GOOGLE_TRACKING_ID || '';
const feedBaseUrl = process.env.FEED_BASE_URL || '';
const feedUrl = `${feedBaseUrl}/api/news/feed.js`;

const cloudimageConfig = {
  token: process.env.CLOUDIMAGE_TOKEN,
};

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
            <h1 className="main-title" style={{ fontSize: '200%' }}>Today's Cycling News</h1>
          </div>
        </div>
      </header>
      <div className="row">
        <div className="column">

          {loading && (
            <div>
              <p>Fetching news...</p>
            </div>
          )}

          {!loading && data.length === 0 && (
            <div>
              <p>No news at the moment.</p>
            </div>
          )}
    
          <CloudimageProvider config={cloudimageConfig}>
            <ul className="list">
              {data.length > 0 && data.map(
                ({
                  title,
                  url,
                  source,
                  sourceUrl,
                  image,
                  time,
                }) => (
                  <li className="list-item" key={url}>

                    <div className="list-item-image">
                      <ReactGA.OutboundLink
                        eventLabel={url}
                        to={url}
                        target="_blank"
                        rel="noreferrer noopener"
                        style={{display: 'block'}}
                      >
                        {image && image !== 'none' ? (
                          <Img src={image} size="320x180" operation="crop" />
                        ) : (
                          <img style={{ display: 'block', width: '100%' }} src={placeholderImage} />
                        )}
                        
                      </ReactGA.OutboundLink>
                    </div>

                    <ReactGA.OutboundLink
                      className="list-item-title"
                      eventLabel={url}
                      to={url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {title}
                    </ReactGA.OutboundLink>
                    {source && time && (
                      <small className="list-item-source">
                        <TimeAgo date={time} />, {source}
                      </small>
                    )}
                  </li>
                )
              )}
            </ul>

          </CloudimageProvider>
        </div>
      </div>
    </div>
  );
}

var mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
