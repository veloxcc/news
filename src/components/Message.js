import React from 'react';
import { motion } from 'framer-motion';

const Message = ({ children }) => (
  <motion.div
    transition={{ duration: .5 }}
    initial={{ y: 50, opacity: 0 } }
    animate={{ y: 0, opacity: 1 }}
  >
    {children}
  </motion.div>
);

export default Message;
