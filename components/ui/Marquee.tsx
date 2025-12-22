'use client';

import React from 'react';
import styles from './Marquee.module.css';

type MarqueeProps = {
  children: React.ReactNode;
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
};

const speedMap = {
  slow: '35s',
  normal: '20s',
  fast: '10s',
};

export default function Marquee({
  children,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
}: MarqueeProps) {
  const animationName = direction === 'right' ? styles.marqueeReverse : styles.marquee;
  const animationDuration = speedMap[speed];
  const style = {
    animation: `${animationName} ${animationDuration} linear infinite`,
  };

  return (
    <div className="overflow-hidden w-full">
      <div
        style={style}
        className={`flex w-max ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
      >
        {/* duplicate content for seamless loop */}
        <div className="flex shrink-0 mr-4">{children}</div>
        <div className="flex shrink-0 mr-4">{children}</div>
      </div>
    </div>
  );
}
