require('dotenv').config();

import React from 'react';
import Img, { CloudimageProvider } from 'react-cloudimage-responsive';

const cloudimageConfig = {
  token: process.env.CLOUDIMAGE_TOKEN,
};

const Image = ({ src }) => (
  <CloudimageProvider config={cloudimageConfig}>
    {src && src !== 'none' ? (
      <Img src={src} size="320x180" operation="crop" />
    ) : (
      <div className="placeholder-image">
        <div className="placeholder-image-container">
          <svg width="36" height="36">
            <path transform="scale(1.5)" d="M16.142 2l5.858 5.858v8.284l-5.858 5.858h-8.284l-5.858-5.858v-8.284l5.858-5.858h8.284zm.829-2h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-8.482 16.992l3.518-3.568 3.554 3.521 1.431-1.43-3.566-3.523 3.535-3.568-1.431-1.432-3.539 3.583-3.581-3.457-1.418 1.418 3.585 3.473-3.507 3.566 1.419 1.417z"/>
          </svg>
        </div>
      </div>
    )}
  </CloudimageProvider>
);

export default Image;
