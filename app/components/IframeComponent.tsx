'use client';

import React, { useRef, useEffect, useState } from 'react';

interface IframeComponentProps {
  src: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  allowFullScreen?: boolean;
  loading?: 'eager' | 'lazy';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

const IframeComponent: React.FC<IframeComponentProps> = ({
  src,
  style,
  allowFullScreen,
  loading,
  referrerPolicy,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      },
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => {
      if (iframeRef.current) {
        observer.unobserve(iframeRef.current);
      }
    };
  }, []);

  return (
    <iframe
      className="absolute w-full h-full top-0 left-0"
      ref={iframeRef}
      src={isIntersecting ? src : undefined}
      style={style}
      allowFullScreen={allowFullScreen}
      loading={loading}
      referrerPolicy={referrerPolicy}
    ></iframe>
  );
};

export default IframeComponent;
