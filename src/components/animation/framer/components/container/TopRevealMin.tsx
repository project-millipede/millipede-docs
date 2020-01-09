import { motion, useAnimation, Variants } from 'framer-motion';
import React, { useEffect } from 'react';

export interface TopRevealMinProps extends React.Props<any> {
  id: string;

  fontColor?: string;

  // input parameters for height calculation
  lineGap?: number;
  fontSize?: number;

  // animation property
  stagger?: number;
  loop?: boolean;
  toggle?: boolean;
}

export const TopRevealMin = (props: TopRevealMinProps) => {
  const {
    // lineGap,
    // fontSize,
    fontColor,
    stagger,
    id,
    loop,
    toggle,
    children
  } = props;

  const itemsLength = 1;

  // Add staggering effect to the children of the container
  const containerVariants = {
    before: {},
    after: { transition: { staggerChildren: stagger } }
  };

  // Variants for animating the text
  const textVariants: Variants = {
    // before: {
    //   // y: -fontSize * 1.5,
    //   y: -24,
    //   opacity: 0.6
    // },

    //   before: {
    //     y: -24
    //   },

    //   after: {
    //     y: 0,
    //     opacity: 1,
    //     transition: loop
    //       ? {
    //           ease: 'easeOut',
    //           yoyo: Infinity,
    //           repeatDelay: 3
    //         }
    //       : {
    //           ease: 'easeOut'
    //         }
    //   }
    // };

    // -24
    before: {
      y: -60
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

  const controls = useAnimation();

  const minimize = () => controls.start('after');
  const maximize = () => controls.start('before');

  useEffect(() => {
    if (toggle) {
      controls.stop();
      minimize();
    } else {
      controls.stop();
      maximize();
    }
  }, [toggle]);

  return (
    <motion.div
      key={id}
      style={{
        size: '100%',
        background: '',
        position: 'relative'
      }}
      animate={controls}
    >
      <motion.div
        style={{
          width: '100%',
          // height: (fontSize * 1.5 + lineGap) * itemsLength * 2 + 30
          height: '60px'
          // overflow: 'hidden'
        }}
        // initial={'before'}
        // animate={'after'}
        variants={containerVariants}
      >
        <motion.div
          key={itemsLength}
          style={{
            width: '100%',
            // height: fontSize * 1.5,
            // y: (fontSize * 1.5 + lineGap) * itemsLength,
            height: '60px',
            // out - test
            // y: '24px',
            overflow: 'hidden'
          }}
        >
          <motion.div
            style={{
              size: '100%',
              color: fontColor
            }}
            variants={textVariants}
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

TopRevealMin.defaultProps = {
  width: 200,
  lineGap: 0,
  fontSize: 30,
  fontColor: '#000000',
  stagger: 0.3,
  loop: false
};
