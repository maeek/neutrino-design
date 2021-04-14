import { KeyboardEvent as ReactKeyboardEvent, MouseEvent, MouseEventHandler, ReactNode } from 'react';
import classNames from 'classnames';
import './styles/button.scss';

export type ButtonTypes = 'link' | 'button';
export interface ButtonProps {
  /**
   * Link type creates a tag surrounding the button element, when button is disabled
   * the anchor will be hidden
   */
  type?: ButtonTypes;
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
  [key: string]: any;
}

export const Button = (props: ButtonProps) => {
  const {
    type = 'button',
    onClick,
    title,
    children,
    className,
    disabled = false,
    href,
    target,
    rel = 'noreferrer',
    ...rest
  } = props;

  const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (onClick && !disabled) onClick(e);
  };

  const onKeyUpHandler = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (['Enter', ' '].includes(e.key) && onClick) {
      onClick(e as any);
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

  return (
    <div className={containerClasses}>
      {type === 'link' && !disabled ? (
        <a
          className="ne-button-anchor"
          href={href}
          target={target}
          title={title}
          rel={rel}
        >
          {buttonBody}
        </a>
      ) : (
        buttonBody
      )}
    </div>
  );
};

export default Button;
