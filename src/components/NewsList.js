import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import TimeAgo from 'react-timeago';
import { motion, useAnimation } from 'framer-motion';

import Image from './Image';

const NewsList = ({ data = [] }) => {
  const listItemAnimation = useAnimation();

  const startListItemAnimation = () => {
    listItemAnimation.start(i => ({
      y: 0,
      opacity: 1,
      transition: {
        ease: 'easeOut',
        duration: 0.5,
        delay: i * 0.1 + 1,
      },
    }));  
  };

  const renderListItems = ({
    title,
    url,
    source,
    sourceUrl,
    image,
    time,
  }, i) => (
    <motion.li
      className="list-item"
      key={`list-item.${i}`}
      custom={i}
      initial={{ y: 50, opacity: 0 } }
      animate={listItemAnimation}
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
        {source && time && (
          <small className="list-item-source">
            <TimeAgo date={time} />, {source}
          </small>
        )}
      </div>
    </motion.li>
  );

  useEffect(() => {
    startListItemAnimation();
  }, [data]);

  return (
    <ul className="list">
    {data.map(renderListItems)}
    </ul>
  );
}

export default NewsList;
