import * as React from 'react';
import classNames from 'classnames';
import Style from './style.scss';

export interface LoaderProps {
  isVisible?: boolean;
  className?: string | { [key: string]: boolean };
}

export const Loader: React.FC<LoaderProps> = (props: LoaderProps) => {
  const { isVisible, className } = props;
  const classes = classNames(Style.loader, className);

  if (isVisible)
    return (
      <div className={classes}>
        <div />
        <div />
        <div />
      </div>
    );

  return <div className={Style.loader__hidden} />;
};

Loader.defaultProps = {
  isVisible: true
};

export default Loader;
