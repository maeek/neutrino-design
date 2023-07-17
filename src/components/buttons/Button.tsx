import React, {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent,
  MouseEventHandler,
  ReactNode,
  HTMLAttributes
} from 'react';
import classNames from 'classnames';
import './styles/button.scss';

interface ButtonTypeBase extends HTMLAttributes<HTMLDivElement> {
  type?: 'button';

  onClick?: MouseEventHandler<HTMLDivElement>;
  /**
   * Title that will be displayed on hover, standard browser behaviour
   */
  title?: string;
  children: ReactNode;
  className?: string;

  /**
   * Disable buttons onClick and href action
   */
  disabled?: boolean;
  style?: CSSProperties;
}

export interface ButtonTypeLinkProps extends Omit<ButtonTypeBase, 'type'> {
  /**
   * Link type creates a tag surrounding the button element, when button is disabled
   * the anchor will be hidden
   */
  type?: 'link';
  /**
   * Disable buttons onClick and href action
   */
  disabled?: boolean;
  /**
   * Only with type = 'link'
   */
  href?: string;
  /**
   * Only with type = 'link'
   */
  target?: string;
  /**
   * Only with type = 'link'
   */
  rel?: string;
  style?: CSSProperties;
}

export type ButtonProps = ButtonTypeLinkProps | ButtonTypeBase;

export const Button = (props: ButtonProps) => {
  const { type, onClick, title, children, className, disabled = false, ...rest } = props;

  const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (onClick && !disabled) onClick(e);
  };

  const onKeyUpHandler = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (['Enter', ' '].includes(e.key) && onClick) {
      onClick(e as unknown as MouseEvent<HTMLDivElement>);
    }
  };

  const classes = classNames({
    'ne-button-item': true,
    'ne-button-item--disabled': disabled
  });

  const buttonBody = (
    <div
      className={classes}
      onClick={onClickHandler}
      onKeyUp={onKeyUpHandler}
      title={title}
      data-type={type}
      role='button'
      data-disabled={!!disabled}
      tabIndex={type === 'link' ? -1 : 0}
      {...rest}
    >
      {children}
    </div>
  );

  const containerClasses = classNames({
    'ne-button': true,
    ...(className && { [className]: true })
  });

  let btnNode = buttonBody;

  if (type === 'link' && !disabled) {
    const { href, target, rel } = rest as ButtonTypeLinkProps;
    btnNode = (
      <a
        className='ne-button-anchor'
        href={href}
        target={target}
        title={title}
        rel={rel}
      >
        {buttonBody}
      </a>
    );
  }

  return <div className={containerClasses}>{btnNode}</div>;
};

export default Button;
