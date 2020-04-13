import { Typography } from '@material-ui/core';
import { motion, Variants } from 'framer-motion';
import _ from 'lodash';
import React from 'react';

import { StringUtil } from '../../../../../../docs/src/modules/utils';

interface TopRevealProps {
  id: string;
  text: Array<string> | string;

  fontColor?: string;

  // input parameters for height calculation
  lineGap?: number;
  fontSize?: number;

  // animation property
  stagger?: number;
  loop?: boolean;
  outerIndex: number;
}

export const TopReveal = (props: TopRevealProps) => {
  const { lineGap, fontSize, fontColor, stagger, text, id, loop } = props;

  const items = _.isArray(text) ? text : StringUtil.stringToArray(text);

  // Add staggering effect to the children of the container
  const containerVariants = {
    before: {},
    after: { transition: { staggerChildren: stagger } }
  };

  // Add staggering effect to the children of the line container
  const lineContainerVariants = {
    before: {},
    after: { transition: { delayChildren: stagger * items.length } }
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
            yoyo: Infinity,
            repeatDelay: 3
          }
        : {
            ease: 'easeOut'
          }
    }
  };

  // Variants for animating the lines
  const lineVariants = {
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
            yoyo: Infinity,
            repeatDelay: 3
          }
        : {
            ease: 'easeIn'
          }
    }
  };

  return (
    <motion.div
      key={id}
      style={{
        size: '100%',
        background: '',
        position: 'relative'
      }}
    >
      <motion.div
        style={{
          width: '100%',
          height: (fontSize * 1.5 + lineGap) * items.length * 2 + 24
        }}
        initial={'before'}
        animate={'after'}
        variants={containerVariants}
      >
        {items.map((item, i) => {
          return (
            <motion.div
              key={i}
              style={{
                width: '100%',
                height: fontSize * 1.5,
                y: (fontSize * 1.5 + lineGap) * i,
                overflow: 'hidden'
              }}
            >
              <motion.div
                style={{
                  size: '100%',
                  fontSize,
                  color: fontColor
                }}
                variants={textVariants}
              >
                <Typography variant='h3' style={{ fontSize: '24px' }}>
                  {item}
                </Typography>
              </motion.div>
            </motion.div>
          );
        })}
        <motion.div
          style={{
            size: '100%'
          }}
          variants={lineContainerVariants}
        >
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
  );
};

TopReveal.defaultProps = {
  width: 200,
  lineGap: 0,
  fontSize: 24,
  fontColor: '#000000',
  stagger: 0.3,
  loop: true
};
