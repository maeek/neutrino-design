import { CSSProperties, memo, ReactNode, useEffect, useState } from 'react';
import classnames from 'classnames';
import './image.scss';

export interface ImageContainerProps {
  /**
   * Alt text that will be displayed when image fail to laod
   */
  alt?: string;
  /**
   * Source url of the image
   */
  src: string;
  /**
   * Skip loading the image and display it directly
   */
  innerSrc?: string;
  /**
   * Additional classname for the wrapper div
   */
  className?: string;
  /**
   * Image loader callback, if the argument is true then the image failed to load
   */
  onImageLoaded?: (error?: boolean) => void;
  /**
   * Fallback to error image when failed to load,
   * only when loader is present
   */
  withFallback?: boolean;
  /**
   * Url of fallback image
   */
  fallbackSrc?: string;
  /**
   * Loader that will be displayed when src is provided
   */
  loader?: ReactNode;
  draggable?: boolean;
  style?: CSSProperties;
  [key: string]: any;
}

export const ImageContainer = (props: ImageContainerProps) => {
  const {
    alt,
    src,
    className,
    innerSrc = null,
    withFallback = true,
    fallbackSrc,
    onImageLoaded,
    loader = null,
    draggable = false,
    ...rest
  } = props;

  const [ imageSrc, setImageSrc ] = useState(src);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => { // TODO: Refactor
    let isCancelled = false;

    const onImageLoad = (source: string) => new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        if (!isCancelled) {
          resolve(source);
        }
      };
      image.onerror = () => {
        if (!isCancelled) {
          reject(new Error('Failed to load the image'));
        }
      };
      image.src = source;
    });

    const loadInnerSrc = () => withFallback ? innerSrc || fallbackSrc : innerSrc;

    const failLoad = () => {
      const url = loadInnerSrc();
      if (url) {
        if (onImageLoaded) onImageLoaded();
        setImageSrc(url || fallbackSrc || '');
      }
      else {
        if (onImageLoaded) onImageLoaded(true);
        setImageSrc(fallbackSrc || '');
      }

      setLoading(false);
    };

    if (!innerSrc) {
      if (loader) {
        onImageLoad(src)
          .then(() => {
            setImageSrc(src);
            if (onImageLoaded) onImageLoaded();
            setLoading(false);
          })
          .catch(() => {
            failLoad();
          });
      } else {
        setImageSrc(src);
        setLoading(false);
      }
    } else {
      failLoad();
    }

    return () => {
      isCancelled = true;
    };
  }, [ innerSrc, onImageLoaded, withFallback, src, fallbackSrc, loader ]);

  const classes = classnames(
    'ne-image',
    className
  );

  return (
    <div className={classes} {...rest} draggable={draggable}>
      <div className="ne-image-content">
        {loading && loader ? loader : <img src={imageSrc} draggable={draggable} alt={alt} />}
      </div>
    </div>
  );
};

const ImageContainerCached = memo(ImageContainer);
export default ImageContainerCached;
