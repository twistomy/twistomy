import React, { useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

const SectionDivider = ({ text }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Animate text movement left <-> right
  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
        my: 12,
        px: 4,
      }}
    >
      {/* Static gradient divider line */}
      <Box
        sx={{
          height: '2px',
          width: '100%',
          background: 'linear-gradient(to right, #ccc, #333, #ccc)',
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          zIndex: 0,
        }}
      />

      {/* Centered and animated text */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div style={{ x }}>
          <Box
            sx={{
              backgroundColor: 'background.paper',
              px: 4,
              py: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                textTransform: 'uppercase',
                letterSpacing: 1,
                whiteSpace: 'nowrap',
              }}
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
