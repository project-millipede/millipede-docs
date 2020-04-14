import { motion, useAnimation, Variants } from 'framer-motion';
import React, { FC, ReactNode, useEffect } from 'react';

export interface BottomRevealMinProps {
  id: string;

  fontColor?: string;

  // input parameters for height calculation
  lineGap?: number;
  fontSize?: number;

  // animation property
  stagger?: number;
  loop?: boolean;
  toggle?: boolean;
  children: ReactNode;
}

export const BottomRevealMin: FC<BottomRevealMinProps> = props => {
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
    //   y: -56,
    //   opacity: 0.6
    // },

    //   before: {
    //     y: -56
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

    before: {
      y: -56
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
          height: '56px'
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
            height: '56px',
            // out - test
            // y: '56px',
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

BottomRevealMin.defaultProps = {
  lineGap: 0,
  fontSize: 30,
  fontColor: '#000000',
  stagger: 0.3,
  loop: false
};
