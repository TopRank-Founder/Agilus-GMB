import React from "react";
import { optimizeGmbImage } from "../utils/image";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  ...props
}) => {
  const optimizedSrc = optimizeGmbImage(src, { width, height });

  return (
    <img
      src={optimizedSrc}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "low"}
      decoding={priority ? "sync" : "async"}
      referrerPolicy="no-referrer"
      className={className}
      {...props}
    />
  );
};
