import * as React from 'react';
import classNames from 'classnames';
import baseStyle from './style/base.scss';
import Style from './style/basic.scss';

export type ButtonType = 'link' | 'native' | undefined;

export interface BasicButtonProps {
  type?: ButtonType;

  title?: string;

  icon?: React.ReactNode;
  children?: React.ReactNode;

  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  compact: boolean;
  primary: boolean;
  theme: 'light' | 'dark';
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

export const Basic: React.FC<ButtonProps> = (
  props
  // ref
) => {
  const {
    type,
    title,
    disabled,
    icon,
    children,
    style,
    className,
    href,
    target,
    rel,
    onClick,
    htmlType,
    compact,
    primary,
    theme,
    ...rest
  } = props;

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    if (onClick && !disabled) {
      (onClick as React.MouseEventHandler<
        HTMLButtonElement | HTMLAnchorElement
      >)(e);
    }
  };

  const classes = classNames(
    baseStyle.buttonBase,
    Style.buttonBasic,
    theme === 'light' ? Style.buttonBasic__light : Style.buttonBasic__dark,
    compact ? Style.buttonBasic__compact : null,
    primary ? null : Style.buttonBasic__primary,
    disabled ? Style.buttonBasic__disabled : null,
    icon && !compact ? Style.buttonBasic__icon : null,
    className
  );

  const NativeButton = () => (
    <button
      onClick={handleClick}
      className={Style.buttonBasic__native}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className={Style.icon}>{icon}</span>}
      <span>{children}</span>
    </button>
  );

  const LinkButton = () => (
    <a
      href={href}
      target={target}
      className={Style.buttonBasic__link}
      rel={rel}
      onClick={onClick}
      {...rest}
    >
      {icon && <span className={Style.icon}>{icon}</span>}
      <span>{children}</span>
    </a>
  );

  const ButtonWrapper = (
    <div className={classes}>
      {type === 'link' ? <LinkButton /> : <NativeButton />}
    </div>
  );

  return ButtonWrapper;
};

export default Basic;
