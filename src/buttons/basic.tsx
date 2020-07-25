import * as React from 'react';
import classNames from 'classnames';
import './style/base.scss';
import './style/basic.scss';

export type ButtonType = 'link' | 'native' | undefined;

export interface BasicButtonProps {
  type?: ButtonType;

  title?: string;

  icon?: React.ReactNode;
  children?: React.ReactNode;

  prefixCls?: string;
  style?: React.CSSProperties;
  className?: string;
}

export type LinkButton = {
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BasicButtonProps;

export type NativeButton = {
  htmlType?: 'submit' | 'button' | 'reset';
  onClick?: React.MouseEventHandler<HTMLElement>;
} & BasicButtonProps;

export type ButtonProps = Partial<LinkButton & NativeButton>;

const Basic: React.ForwardRefRenderFunction<unknown, ButtonProps> = (
  props,
  ref
) => {
  const {
    type,
    title,
    icon,
    children,
    prefixCls,
    style,
    className,
    href,
    target,
    rel,
    onClick,
    htmlType,
    ...rest
  } = props;

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    if (onClick) {
      (onClick as React.MouseEventHandler<
        HTMLButtonElement | HTMLAnchorElement
      >)(e);
    }
  };

  const classes = classNames('button-base button-basic', className);

  const NativeButton = (
    <button onClick={handleClick} className={classes} {...rest}>
      {icon && <span className='icon'>{icon}</span>}
      {children}
    </button>
  );

  // const LinkButton = (

  // );

  // const ButtonWrapper = (
  //   <div>
  //     {type === 'link' ? (
  //       <a href={href} target={target} rel={rel} onClick={onClick} {...rest}>
  //         {InnerButton}
  //       </a>
  //     ) : (
  //       { InnerButton }
  //     )}
  //   </div>
  // );

  return ButtonWrapper;
};

export default Basic;
