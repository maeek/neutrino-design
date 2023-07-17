import React, { ReactNode, useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import classNames from 'classnames';
import { Blurhash } from 'react-blurhash';
import './image.scss';

type ImageUrl = string;
type ObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

export interface ImageProps {
  src: ImageUrl;
  alt?: string;

  fallback?: ImageUrl | ReactNode;

  lazy?: boolean;
  loader?: ReactNode;
  blurhash?: string;
  animations?: boolean;

  className?: string;
  style?: React.CSSProperties;
  draggable?: boolean;
  objectFit?: ObjectFit;

  onError?: (err: string | Event) => void;
  onLoad?: () => void;
}

export const Image = forwardRef((props: ImageProps, ref) => {
  const {
    src,
    alt,
    fallback,
    lazy,
    loader,
    blurhash,
    className,
    style,
    draggable = false,
    objectFit = 'cover',
    onError,
    onLoad,
    animations = true
  } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState<string | Event | null>(null);
  const [imageSrc, setImageSrc] = useState<string | undefined>('');
  const containerRef = useRef<HTMLImageElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useImperativeHandle(ref, () => ({
    imgRef: imgRef.current,
    src,
    error: hasError,
    loading: isLoading
  }));

  useEffect(() => {
    if (!imgRef.current) return;

    let isCancelled = false;

    imgRef.current.onload = () => {
      if (isCancelled) return;

      setIsLoading(false);
      if (onLoad) onLoad();
    };
    imgRef.current.onerror = error => {
      if (isCancelled) return;

      setHasError(error);
      setIsLoading(false);
    };

    setIsLoading(true);
    setImageSrc(src);

    return () => {
      isCancelled = true;
    };
  }, [src, onLoad]);

  useEffect(() => {
    if (hasError) {
      if (onError) onError(hasError);

      setImageSrc(undefined);
    }
  }, [hasError, onError]);

  const imgStyle = {
    objectFit,
    opacity: isLoading || hasError ? 0 : 1
  };

  const img = (
    <img
      draggable={draggable}
      ref={imgRef}
      loading={lazy ? 'lazy' : 'eager'}
      style={imgStyle}
      src={imageSrc}
      alt={alt}
    />
  );

  const blurhashContainer = blurhash ? (
    <Blurhash
      hash={blurhash}
      width='100%'
      height='100%'
    />
  ) : null;

  const loaderClassNames = classNames(
    'ne-image-loader',
    lazy && isLoading && (loader || blurhash) && 'ne-image-loader--loading',
    hasError && 'ne-image-loader--error'
  );
  const loaderContainer = <div className={loaderClassNames}>{blurhashContainer || loader}</div>;

  const fallbackContainer = <div className='ne-image-fallback'>{fallback}</div>;

  return (
    <div
      ref={containerRef}
      className={classNames('ne-image', animations && 'ne-image--animated', className)}
      style={style}
      data-loading={isLoading}
    >
      {hasError ? fallbackContainer : img}
      {loaderContainer}
    </div>
  );
});

Image.displayName = 'Image';

export default Image;
