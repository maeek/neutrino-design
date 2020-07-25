import * as React from 'react';
import avatar, {
  // eslint-disable-next-line no-unused-vars
  AvatarDimensions,
  DEFAULT_AVATAR_OPTIONS
} from '../hooks/avatar';

export interface PropsTypes {
  /** Text from which an avatar will be generated,
   *  only first letters of first 2 words will be used */
  text: string;
  /** Text shown after hover */
  title?: string;
  /** Image that will be used instead of text */
  src?: string | Blob;
  alt?: string;
  draggable?: boolean;

  shape?: 'circle' | 'square';

  /**
   * Size of avatar
   * {
   *    width: number
   *    height: number
   * }
   */
  size?: AvatarDimensions;

  prefixCls?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;

  fallbackToText?: boolean;
  onError?: () => boolean;
}

export interface RefType<T> {
  readonly current: T | null;
}

const Avatar: React.FC<PropsTypes> = (
  props: PropsTypes,
  ref: RefType<HTMLElement>
) => {
  const {
    text,
    title,
    src,
    alt,
    shape,
    size = { width: 300, height: 300 },
    prefixCls,
    style,
    children,
    onError,
    draggable,
    ...rest
  } = props;

  const [mounted, setMounted] = React.useState(false);
  const [canvasOptions, setCanvasOptions] = React.useState({ size });
  const [imageExist, setImageExist] = React.useState(true);
  const [imageSrc, setImageSrc] = React.useState<string | undefined>();

  const { imageBlob } = avatar({
    text,
    options: {
      ...DEFAULT_AVATAR_OPTIONS,
      ...canvasOptions
    }
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    setImageExist(true);
    if (typeof src === 'string') {
      setImageSrc(src);
    } else if (src !== undefined) {
      setImageSrc(URL.createObjectURL(src));
    }
  }, [src]);


  return (
    <div {...rest} ref={ref}>
      <img src={imageSrc} />
    </div>
  );
};

export default Avatar;
