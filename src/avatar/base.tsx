/* eslint-disable no-unused-vars */
import React, { createRef, FC, ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import Style from './avatar.scss';
// eslint-disable-next-line no-unused-vars
import AvatarHook, {
  AvatarProperties,
  DEFAULT_AVATAR_OPTIONS
} from '../hooks/avatar';

type AvatarType = 'square' | 'circle' | undefined;
export interface AvatarProps {
  type?: AvatarType;
  renderImage?: boolean;
  preloadImage?: boolean;

  alt?: string;
  text?: string;
  title?: string;
  src?: string | Blob | ArrayBuffer;
  options?: AvatarProperties;
  loader: React.ReactNode;

  draggable?: boolean;
  className?: string;

  style?: any;
  children: ReactNode;

  fallbackToText?: boolean;
  onImageLoad?: Function;
  onError?: Function;
}

export const Avatar: FC<AvatarProps> = (props) => {
  const {
    type,
    text = 'user',
    title,
    src,
    alt,
    draggable,
    renderImage,
    preloadImage,
    className,
    loader,
    style,
    children,
    options = DEFAULT_AVATAR_OPTIONS
  } = props;
  const imgRef = createRef<HTMLImageElement>();

  const { size, background, color, font } = options;
  const { width, height } = size;

  const classes = classNames(
    Style.avatarContainer,
    type === 'circle'
      ? Style.avatarContainer__circle
      : Style.avatarContainer__square,
    className
  );

  const styles = {
    ...style,
    backgroundColor: background,
    color,
    font,
    width,
    height
  };

  const [enforceFallback, setEnforceFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [imageSource, setImageSource] = useState<string>('');

  const imageBlob = AvatarHook({ text, options });

  /**
   *  Add events for load and error to <img />
   */
  useEffect(() => {
    if (!imgRef.current || !renderImage) return;
    const onLoad = () => {
      setIsLoading(false);
      setLoadingFailed(false);
    };
    const onError = () => {
      setIsLoading(false);
      setLoadingFailed(true);
      setEnforceFallback(true);
    };

    imgRef.current.addEventListener('load', onLoad);
    imgRef.current.addEventListener('error', onError);
  }, [imgRef, renderImage, setIsLoading, setLoadingFailed, setEnforceFallback]);

  /**
   *  Select proper img.src
   */
  useEffect(() => {
    let imgSource: any = src || URL.createObjectURL(imageBlob);
    if (loadingFailed || enforceFallback) {
      imgSource = imageBlob ? URL.createObjectURL(imageBlob) : '';
    }
    setImageSource(imgSource);
  }, [enforceFallback, imageBlob, src]);

  /**
   * Load image and set src on <img /> ref
   */
  useEffect(() => {
    const loadImage = (src: string | null, cb: Function): void => {
      const img = new Image();
      if (src) {
        img.onload = () => {
          setIsLoading(false);
          setLoadingFailed(false);
          cb(img.src);
        };
        img.onerror = () => {
          setIsLoading(false);
          setLoadingFailed(true);
          setEnforceFallback(true);
        };
        img.src = typeof src === 'string' ? src : URL.createObjectURL(src);
      }
    };

    if (!imgRef.current) return;
    if (!renderImage) return;
    if (!imageSource) return;

    if (preloadImage) {
      loadImage(imageSource, (url: string) => {
        if (!imgRef.current) return;
        imgRef.current.src = url;
      });
    } else {
      imgRef.current.src = imageSource;
    }
  }, [imageSource, imgRef, renderImage]);

  return (
    <div className={classes} style={styles} title={title}>
      {renderImage && (
        <img
          alt={alt}
          className={(isLoading && Style.avatarContainer__img_isLoading) || ''}
          ref={imgRef}
          draggable={draggable}
        />
      )}
      {isLoading && !loadingFailed && (
        <span className={Style.avatarContainer__loading}>
          {loader || 'Loading...'}
        </span>
      )}
      {children}
    </div>
  );
};

Avatar.defaultProps = {
  type: 'square',
  draggable: true,
  renderImage: true,
  preloadImage: true
};

export default Avatar;
