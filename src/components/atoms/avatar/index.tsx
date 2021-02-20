import React, {
  createRef,
  FC,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useState
} from 'react';

export interface AvatarProps {
  className?: string;

  type?: 'round' | 'square';
  options: {};

  alt?: string;
  src?: string | Blob | ArrayBuffer;
  title?: string;
  draggable?: boolean;

  loader?: ReactNode;

  rasterize?: boolean;
  fallbackToText?: boolean;
  onImageLoad?: () => void;
  onError?: (error: any) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Avatar: FC<AvatarProps> = (props) => {
  const {
    className,
    type,
    alt,
    src,
    title,
    draggable,
    loader,
    rasterize,
    fallbackToText,
    onImageLoad,
    onError,
    onClick
  } = props;

  const imgRef = createRef<HTMLImageElement>();

  const fallbackText = alt
    ?.split(new RegExp('[\\s_-]'))
    .map((word) => word.substr(0, 1).toUpperCase());

  const [enforceFallback, setEnforceFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [imageSource, setImageSource] = useState<string>();

  useEffect(() => {
    const loadImage = (source: string, cb: (source: string) => void) => {
      const img = new Image();
      img.onload = () => {
        setIsLoading(false);
        setIsError(false);
        cb(img.src);
      };
      img.onerror = () => {
        setIsLoading(false);
        setIsError(true);
        if (fallbackText) {
          setEnforceFallback(true);
        }
      };
      img.src = source;
    };

    if (!imgRef.current) return;
    if (!imageSource) return;

    if (!!loader && imageSource) {
      loadImage(imageSource, (uri) => {
        if (!imgRef.current) return;
        imgRef.current.src = uri;
      });
    } else if (imageSource && typeof imageSource === 'string') {
      imgRef.current.src = imageSource;
    } else {
      setEnforceFallback(true);
    }

    return () => {};
  }, []);

  const loading = isLoading && !isError;
  const loaderComponent = loading && loader ? loader : null;
  const imageComponent = (
    <img
      alt={alt}
      ref={imgRef}
      draggable={draggable}
      className="ne-avatar--source"
    />
  );
  const errorComponent = (
    <span className="ne-avatar--invalid">Failed to load</span>
  );

  return (
    <div className="ne-avatar--container" onClick={onClick} title={title}>
      {loaderComponent}
      {!loading && imageComponent}
      {isError && errorComponent}
    </div>
  );
};

export default {};
