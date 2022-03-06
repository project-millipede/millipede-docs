import { StringUtil } from '@app/utils';
import { Typography } from '@mui/material';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import isArray from 'lodash/isArray';
import React from 'react';

interface TopRevealProps {
  id: string;
  text: Array<string> | string;
  // input parameters for height calculation
  lineGap?: number;
  fontSize?: number;
  fontColor?: string;
  // animation property
  stagger?: number;
  loop?: boolean;
}

export const TopReveal = (props: TopRevealProps) => {
  const {
    id,
    text,
    lineGap = 0,
    fontSize = 24,
    fontColor = '#000000',
    stagger = 0.3,
    loop = true
  } = props;

  const items = isArray(text) ? text : StringUtil.stringToArray(text);

  // Add staggering effect to the children of the container
  const containerVariants = {
    before: {},
    after: { transition: { staggerChildren: stagger } }
  };

  // Add staggering effect to the children of the line container
  const lineContainerVariants = {
    before: { transition: { delayChildren: stagger } },
    after: {}
  };

  // Variants for animating the text
  const textVariants: Variants = {
    before: {
      y: -fontSize * 1.5,
      opacity: 0.6
    },
    after: {
      y: 0,
      opacity: 1,
      transition: loop
        ? {
            ease: 'easeOut',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 3
          }
        : {
            ease: 'easeOut'
          }
    }
  };

  // Variants for animating the lines
  const lineVariants: Variants = {
    before: {
      opacity: 0,
      width: 0
    },
    after: {
      opacity: 1,
      width: 50,
      transition: loop
        ? {
            ease: 'easeIn',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 3
          }
        : {
            ease: 'easeIn'
          }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key={id}
        style={{
          position: 'relative'
        }}
      >
        <motion.div
          style={{
            width: '100%',
            height: (fontSize * 1.5 + lineGap) * items.length * 2 + 24
          }}
          initial='before'
          animate='after'
          variants={containerVariants}
        >
          {items.map((item, i) => {
            return (
              <motion.div
                key={i}
                style={{
                  width: '100%',
                  y: (fontSize * 1.5 + lineGap) * i,
                  overflow: 'hidden'
                }}
              >
                <motion.div
                  style={{
                    fontSize,
                    color: fontColor
                  }}
                  variants={textVariants}
                >
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '1.5rem',
                      margin: '0px'
                    }}
                  >
                    {item}
                  </Typography>
                </motion.div>
              </motion.div>
            );
          })}
          <motion.div variants={lineContainerVariants}>
            <motion.div
              style={{
                position: 'absolute',
                height: '10px',
                y: (fontSize * 1.5 + lineGap) * items.length + 10,
                left: '50%',
                backgroundColor: 'grey'
              }}
              variants={lineVariants}
            />
            <motion.div
              style={{
                position: 'absolute',
                height: '10px',
                y: (fontSize * 1.5 + lineGap) * items.length + 10,
                right: '50%',
                backgroundColor: 'grey'
              }}
              variants={lineVariants}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
