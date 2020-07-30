require('dotenv').config();

import React, { useState } from 'react';
import ReactGA from 'react-ga';
import TimeAgo from 'react-timeago';
import { motion } from 'framer-motion';
import axios from 'axios';
import useSWR, { useSWRPages } from 'swr';
import { ErrorBoundary } from 'react-error-boundary';

import Image from './Image';
import Message from './Message';

const feedBaseUrl = process.env.FEED_BASE_URL || '';
const feedUrl = `${feedBaseUrl}/api/news/feed`;
const pageSize = 24;

const NoNewsMessage = () => (
  <Message>
    <p>No news at the moment, check back later!</p>
  </Message>
);

const ErrorMessage = () => (
  <Message>
    <p>There was an error loading the news, <a href="/news">please try again</a>.</p>
  </Message>
);

const NewsList = () => {
  const [initialLoad, setInitialLoad ] = useState(true);

  const renderListItems = ({
    article_id,
    title,
    url,
    source,
    image,
    published,
  }, i) => (
    <motion.li
      key={article_id}
      className="list-item"
      custom={i}
      initial={{ y: 50, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          ease: 'easeOut',
          duration: 0.5,
          delay: i * 0.1 + 1,
        },
      }}
      exit={{ y: 50, opacity: 0 }}
    >
      <div className="list-item-image">
        <ReactGA.OutboundLink
          eventLabel={url}
          to={url}
          target="_blank"
          rel="noreferrer noopener"
          style={{display: 'block'}}
        >
          <Image src={image} />           
        </ReactGA.OutboundLink>
      </div>
      <div className="list-item-title">
        <ReactGA.OutboundLink
          className="list-item-link"
          eventLabel={url}
          to={url}
          target="_blank"
          rel="noreferrer noopener"
        >
          {title}
        </ReactGA.OutboundLink>
        {source && published && (
          <small className="list-item-source">
            <TimeAgo date={published} />, {source.title}
          </small>
        )}
      </div>
    </motion.li>
  );

  const {
    pages,
    isLoadingMore,
    isReachingEnd,
    loadMore,
    isEmpty,
  } = useSWRPages(
    'news-list',

    ({ offset, withSWR }) => {
      const fetcher = url => axios.get(url).then(response => 
        response.status === 200 ? response.data : []
      );

      const options = {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        onSuccess: () => {
          setInitialLoad(false);
        }
      };

      const { data, error } = withSWR(
        useSWR(`${feedUrl}?offset=${offset || 0}&pageSize=${pageSize}`, fetcher, options),
      );
      
      if (error) throw new Error(error);
      if (!data) return null;

      return data.map(renderListItems);
    },

    (SWR, index) => {
      if (SWR.data && SWR.data.length < pageSize) return null;
      return index + 1;
    },
  );

  return (
    <div>
      {isEmpty && <NoNewsMessage />}

      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <ul className="list">
        {pages}
        </ul>
      </ErrorBoundary>

      {pages && !initialLoad && !isEmpty && (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <button
            className="button button-outline"
            onClick={loadMore}
            disabled={isReachingEnd || isLoadingMore}
            style={{
              minWidth: '175px',
              marginTop: '20px',
            }}
          >
            {isLoadingMore ? 'loading' : isReachingEnd ? 'end' : 'load more'}
          </button>
        </div>
      )}
    </div>
  );
}

export default NewsList;