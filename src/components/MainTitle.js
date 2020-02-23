import React from 'react';
import { motion } from 'framer-motion';

const MainTitle = ({ children }) => (
  <motion.h1
    className="main-title"
    transition={{ duration: 1 }}
    initial={{ opacity: 0 } }
    animate={{ opacity: 1, transition: { delay: 0.5 } }}
  >
    {children}
  </motion.h1>
);

export default MainTitle;
