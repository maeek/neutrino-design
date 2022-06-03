import { ReactNode, CSSProperties } from 'react';
import classnames from 'classnames';
import { Image } from '../image/Image';
import './styles/avatar.scss';

export type AvatarTypes = 'round' | 'rounded' | 'square';
export type AvatarSizes = 'extra-small' | 'small' | 'medium' | 'large' | 'larger' | 'extra-large';

export interface AvatarProps {
  /**
   * Additional classname for the wrapper div
   */
  className?: string;
  /**
   * Image source url that will be displayed
   */
  src?: string;
  /**
   * Alt parameter that will be showed when image will fail to load
   */
  name?: string;
  /**
   * Children that will be rendered below the avatar
   */
  children?: ReactNode | ((url?: string) => ReactNode);
  /**
   * Type of avatar appereance, defaults to 'round'
   */
  type?: 'round' | 'rounded' | 'square';
  /**
   * Size of the avatar
   *  - small 25x25
   *  - medium 35x35
   *  - large 50x50
   *  - larger 100x100
   *  - extra-large 200x200
   *
   * Defaults to 'medium'
   */
  size?: 'extra-small' | 'small' | 'medium' | 'large' | 'larger' | 'extra-large';
  /**
   * Should the avatar be selectable by keyboard navigation
   */
  selectable?: boolean;
  /**
   * tabIndex of the avatar element
   */
  tabIndex?: number;
  /**
   * Loader that will be passed to Image and displayed when image is Loading
   * No loader will be displayed if omitted
   */
  loader?: ReactNode;
  style?: CSSProperties;
  [key: string]: any;
}

const getTypeClass = (type: AvatarTypes, baseClass = 'ne-avatar-content') => {
  switch(type) {
  case 'round':
    return`${baseClass}--round`;
  case 'rounded':
    return`${baseClass}--rounded`;
  case 'square':
    return`${baseClass}--square`;
  default:
    return`${baseClass}--round`;
  }
};

const getSizeClass = (size: AvatarSizes, baseClass = 'ne-avatar-content') => {
  switch(size) {
  case 'extra-small':
    return `${baseClass}--extra-small`;
  case 'small':
    return `${baseClass}--small`;
  case 'medium':
    return `${baseClass}--medium`;
  case 'large':
    return `${baseClass}--large`;
  case 'larger':
    return `${baseClass}--larger`;
  case 'extra-large':
    return `${baseClass}--extra-large`;
  default:
    return `${baseClass}--small`;
  }
};

export const Avatar = (props: AvatarProps) => {
  const {
    children,
    src,
    name,
    type = 'round',
    size = 'medium',
    className,
    selectable,
    tabIndex,
    loader,
    ...rest
  } = props;

  const classes = classnames(
    'ne-avatar-content',
    selectable && 'ne-avatar-content--selectable',
    getTypeClass(type),
    getSizeClass(size)
  );

  return (
    <div className={classnames('ne-avatar', className)} draggable={false} {...rest}>
      <div className={classes} tabIndex={tabIndex}>
        <Image src={src || ''} alt={name} loader={loader} draggable={false} />
      </div>
      {
        typeof children === 'function'
          ? children(src)
          : children
      }
    </div>
  );
};

Avatar.displayName = 'Avatar';

export default Avatar;
