import React from 'react';

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
  style = { border: '0' },
  allowFullScreen = true,
  loading = 'lazy',
  referrerPolicy = 'no-referrer-when-downgrade',
}) => {
  return (
    <iframe
      className="absolute w-full h-full top-0 left-0"
      src={src}
      style={style}
      allowFullScreen={allowFullScreen}
      loading={loading}
      referrerPolicy={referrerPolicy}
    />
  );
};

export default IframeComponent;
