import { FC, ReactNode, memo } from 'react';
import classnames from 'classnames';
import './avatar.scss';
import { ImageContainer } from '../image/image';

export type AvatarTypes = 'round' | 'rounded' | 'square';
export type AvatarSizes = 'small' | 'medium' | 'large' | 'larger' | 'extra-large';

export interface AvatarProps {
  className?: string;
  src?: string;
  name?: string;
  children?: ReactNode | ((url: string) => ReactNode);
  type?: 'round' | 'rounded' | 'square';
  size?: 'small' | 'medium' | 'large' | 'larger' | 'extra-large';
  selectable?: boolean;
  tabIndex?: number;
  [key: string]: any;
}

export const Avatar: FC<AvatarProps> = (props) => {
  const {
    children,
    src,
    name,
    type = 'round',
    size = 'medium',
    className,
    selectable,
    tabIndex,
    ...rest
  } = props;

  const classes = classnames(
    'ne-avatar-content',
    selectable && 'ne-avatar-content--selectable',
    getTypeClass(type),
    getSizeClass(size)
  );

  return (
    <div className={classnames('ne-avatar', className)} {...rest}>
      <div className={classes} tabIndex={tabIndex}>
        <ImageContainer src={src || ''} alt={name} />
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
