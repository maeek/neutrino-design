import { FC, memo, ReactNode, useEffect, useState } from 'react';
import classnames from 'classnames';
import './image.scss';

export interface ImageContainerProps {
  alt?: string;
  src: string;
  innerSrc?: string;
  className?: string;
  onImageLoaded?: (error?: boolean) => void;
  withFallback?: boolean;
  loader?: ReactNode;
  [key: string]: any;
}

export const ImageContainer: FC<ImageContainerProps> = (props) => {
  const {
    alt,
    src,
    className,
    innerSrc = null,
    withFallback = true,
    onImageLoaded,
    loader = 'Loading'
  } = props;

  const [imageSrc, setImageSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const errorImg = '';

  useEffect(() => {
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

    const loadInnerSrc = () => withFallback ? innerSrc || errorImg : innerSrc;

    const failLoad = () => {
      const url = loadInnerSrc();
      if (url) {
        if (onImageLoaded) onImageLoaded();
        setImageSrc(url || errorImg);
      }
      else {
        if (onImageLoaded) onImageLoaded(true);
        setImageSrc(errorImg);
      }

      setLoading(false);
    };

    if (!innerSrc) {
      onImageLoad(src)
        .then(() => {
          if (onImageLoaded) onImageLoaded();
          setLoading(false);
        })
        .catch(() => {
          failLoad();
        });
    } else {
      failLoad();
    }

    return () => {
      isCancelled = true;
    };
  }, [innerSrc, onImageLoaded, withFallback, src]);

  const classes = classnames(
    'ne-image',
    className
  );

  return (
    <div className={classes}>
      <div className="ne-image-content">
        {loading ? loader : <img src={imageSrc} alt={alt} />}
      </div>
    </div>
  );
};

export default memo(ImageContainer);
