/**
 * TODO:
 * - Fix styling
 * - Fix options prop
 * - Implement tooltip
 * - Fix passing blob/array buffer as src
 */

/* eslint-disable no-unused-vars */
import React, { createRef, FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import Style from './avatar.scss';
// eslint-disable-next-line no-unused-vars
import useAvatar, {
  AvatarProperties,
  DEFAULT_AVATAR_OPTIONS
} from '../hooks/avatar';

export const DEFAULT_AVATAR_OPTIONS__LIGHT: AvatarProperties = {
  ...DEFAULT_AVATAR_OPTIONS,
  background: '#D3EAFF',
  color: '#1E2D3D'
};

type AvatarType = 'square' | 'circle' | undefined;
export interface AvatarProps {
  type?: AvatarType;

  renderImage?: boolean;
  preloadImage?: boolean;

  text?: string;
  title?: string;
  alt?: string;
  src?: string | Blob | ArrayBuffer;
  draggable?: boolean;

  /**
   * This will be overwritten by options
   */
  theme?: 'light' | 'dark';
  className?: string;
  style?: any;

  options?: AvatarProperties;
  loader?: React.ReactNode;

  children?: React.ReactNode;

  fallbackToText?: boolean;
  onImageLoad?: Function;
  onError?: Function;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
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
    fallbackToText,
    theme = 'dark',
    className,
    loader,
    style,
    children,
    options,
    onClick,
    onImageLoad,
    onError: onErrorFromProps,
    ...rest
  } = props;
  const imgRef = createRef<HTMLImageElement>();

  const { size, background, color, font } = {
    ...DEFAULT_AVATAR_OPTIONS,
    ...options
  };
  const { width, height } = size;

  const classes = classNames(
    Style.avatarContainer,
    theme === 'light'
      ? Style.avatarContainer__light
      : Style.avatarContainer__light,
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
  const [activeOptions, setActiveOptions] = useState<AvatarProperties>({
    ...DEFAULT_AVATAR_OPTIONS,
    ...(theme === 'light' ? DEFAULT_AVATAR_OPTIONS__LIGHT : {}),
    ...options
  });
  const [imageSource, setImageSource] = useState<string>('');

  const { imageBlob } = useAvatar({
    text,
    options: activeOptions
  });

  useEffect(() => {
    if (theme === 'light') {
      setActiveOptions({
        ...DEFAULT_AVATAR_OPTIONS__LIGHT,
        size: options?.size || DEFAULT_AVATAR_OPTIONS__LIGHT.size,
        maxLength:
          options?.maxLength || DEFAULT_AVATAR_OPTIONS__LIGHT.maxLength,
        font: options?.font || DEFAULT_AVATAR_OPTIONS__LIGHT.font,
        preloadGoogleFonts:
          options?.preloadGoogleFonts ||
          DEFAULT_AVATAR_OPTIONS__LIGHT.preloadGoogleFonts
      });
    } else {
      setActiveOptions({ ...DEFAULT_AVATAR_OPTIONS, ...options });
    }
  }, [theme, options]);

  /**
   *  Add events for load and error to <img />
   */
  useEffect(() => {
    const innerRef = imgRef.current;
    if (!innerRef || !renderImage) return;
    const onLoad = () => {
      setIsLoading(false);
      setLoadingFailed(false);
      if (onImageLoad) {
        onImageLoad();
      }
    };
    const onError = () => {
      setEnforceFallback(true);
      setLoadingFailed(true);
      setIsLoading(false);
      if (onErrorFromProps) {
        onErrorFromProps();
      }
    };

    innerRef.addEventListener('load', onLoad);
    innerRef.addEventListener('error', onError);
    return () => {
      if (!innerRef) return;
      innerRef.removeEventListener('load', onLoad);
      innerRef.removeEventListener('error', onError);
    };
  }, [imgRef, renderImage]);

  /**
   *  Select proper img.src
   */
  useEffect(() => {
    let imgSource: any;

    if (src) {
      imgSource = src;
    } else if (fallbackToText) {
      imgSource = URL.createObjectURL(imageBlob);
    } else {
      imgSource = '';
    }

    if ((loadingFailed || enforceFallback) && fallbackToText) {
      imgSource = imageBlob ? URL.createObjectURL(imageBlob) : '';
    }
    setImageSource(imgSource);
  }, [enforceFallback, imageBlob, src, fallbackToText]);

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
          if (fallbackToText) {
            setEnforceFallback(true);
          }
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
    <div
      className={classes}
      style={styles}
      title={title}
      onClick={onClick}
      {...rest}
    >
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
  preloadImage: true,
  fallbackToText: true
};

export default Avatar;
