import React, { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

const SectionDivider = ({ text }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <Box
      ref={ref}
      className="relative w-full my-12 px-4"
    >
      {/* Static gradient divider line */}
      <Box
  className="absolute top-1/2 left-0 transform -translate-y-1/2 z-0 h-[2px] w-full bg-[linear-gradient(to_right,_#ccc,_#333,_#ccc)] dark:bg-[linear-gradient(to_right,_#1a1a1a,_#555,_#1a1a1a)] transition-colors duration-300"
/>

      {/* Centered and animated text */}
      <Box
        className="relative z-10 flex justify-center"
      >
        <motion.div style={{ x }}>
          <Box
            className="bg-white dark:bg-[#0f172a] px-4 py-1 transition-colors duration-300"
          >
            <Typography
              variant="h4"
              className="font-bold text-gray-900 dark:text-white uppercase tracking-wide whitespace-nowrap"
            >
              {text}
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default SectionDivider;
