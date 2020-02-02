import { Typography } from '@material-ui/core';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import _ from 'lodash';
import React, { useEffect } from 'react';

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
  const {
    lineGap,
    fontSize,
    fontColor,
    // stagger,
    text,
    id,
    loop,
    outerIndex
  } = props;

  const items = _.isArray(text) ? text : StringUtil.stringToArray(text);

  // const controls = useAnimation();

  // const variants: Variants = {
  //   min: { width: '50%' },
  //   max: {
  //     width: '100%'
  //   }
  // };

  // const minimize = () => controls.start('min');
  // const maximize = () => controls.start('max');

  useEffect(() => {
    // controls.stop();
  }, [outerIndex]);

  const rootVariants: Variants = {
    closing: { transition: { staggerChildren: 0.5 } }
  };

  // Add staggering effect to the children of the container
  const containerVariants: Variants = {
    before: {},
    after: { transition: { staggerChildren: 0.6 } }
  };

  // Add staggering effect to the children of the line container
  // const lineContainerVariants = {
  //   before: {},
  //   after: { transition: { delayChildren: 0.6 * items.length } }
  // };

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
  // const lineVariants = {
  //   before: {
  //     opacity: 0,
  //     width: 0
  //   },
  //   after: {
  //     opacity: 1,
  //     width: 50,
  //     transition: loop
  //       ? {
  //           ease: 'easeIn',
  //           yoyo: Infinity,
  //           repeatDelay: 3
  //         }
  //       : {
  //           ease: 'easeIn'
  //         }
  //   }
  // };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={id}
        // style={{
        //   size: '100%',
        //   background: '',
        //   position: 'relative'
        // }}
        variants={rootVariants}
        // animate={controls}
        initial={'before'}
        animate={'after'}
        exit={'closing'}
      >
        <motion.div
          // style={{
          //   width: '100%',
          //   height: (fontSize * 1.5 + lineGap) * items.length * 2 + 30
          // }}
          initial={'before'}
          animate={'after'}
          variants={containerVariants}
        >
          {items.map((item, i) => {
            return (
              <motion.div
                key={i}
                style={{
                  // width: '100%',
                  // height: fontSize * 1.5,
                  y: (fontSize * 1.5 + lineGap) * i
                  // overflow: 'hidden'
                }}
              >
                <motion.div
                  style={{
                    // size: '100%',
                    fontSize,
                    color: fontColor
                  }}
                  variants={textVariants}
                >
                  <Typography variant='h2' style={{ fontSize: '30px' }}>
                    {item}
                  </Typography>
                </motion.div>
              </motion.div>
            );
          })}
          {/* <motion.div
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
          </motion.div> */}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

TopReveal.defaultProps = {
  width: 200,
  lineGap: 0,
  fontSize: 30,
  fontColor: '#000000',
  stagger: 0.3,
  loop: true
};
