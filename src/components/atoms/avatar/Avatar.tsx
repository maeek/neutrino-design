import { ReactNode, memo } from 'react';
import classnames from 'classnames';
import ImageContainer from '../image/Image';
import './styles/avatar.scss';

export type AvatarTypes = 'round' | 'rounded' | 'square';
export type AvatarSizes = 'small' | 'medium' | 'large' | 'larger' | 'extra-large';

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
  children?: ReactNode | ((url: string) => ReactNode);
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
  size?: 'small' | 'medium' | 'large' | 'larger' | 'extra-large';
  /**
   * Should the avatar be selectable by keyboard navigation
   */
  selectable?: boolean;
  /**
   * tabIndex of the avatar element
   */
  tabIndex?: number;
  /**
   * Loader that will be passed to ImageContainer and displayed when image is Loading
   * No loader will be displayed if omitted
   */
  loader?: ReactNode;
  [key: string]: any;
}

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
        <ImageContainer src={src || ''} alt={name} loader={loader} draggable={false} />
      </div>
      {children}
    </div>
  );
};

const getTypeClass = (type: AvatarTypes) => {
  switch(type) {
  case 'round':
    return 'ne-avatar-content--round';
  case 'rounded':
    return 'ne-avatar-content--rounded';
  case 'square':
    return 'ne-avatar-content--square';
  default:
    return 'ne-avatar-content--round';
  }
};

const getSizeClass = (size: AvatarSizes) => {
  switch(size) {
  case 'small':
    return 'ne-avatar-content--small';
  case 'medium':
    return 'ne-avatar-content--medium';
  case 'large':
    return 'ne-avatar-content--large';
  case 'larger':
    return 'ne-avatar-content--larger';
  case 'extra-large':
    return 'ne-avatar-content--extra-large';
  default:
    return 'ne-avatar-content--small';
  }
};

export default memo(Avatar);
