require('dotenv').config();

import React from 'react';
import Img, { CloudimageProvider } from 'react-cloudimage-responsive';

import placeholderImage from './placeholder.png';

const cloudimageConfig = {
  token: process.env.CLOUDIMAGE_TOKEN,
};

const Image = ({ src }) => (
  <CloudimageProvider config={cloudimageConfig}>
    {src && src !== 'none' ? (
      <Img src={src} size="320x180" operation="crop" />
    ) : (
      <img style={{ display: 'block', width: '100%' }} src={placeholderImage} />
    )}
  </CloudimageProvider>
);

export default Image;
