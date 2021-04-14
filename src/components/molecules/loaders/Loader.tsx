import classNames from 'classnames';
import './loader.scss';

export interface LoaderProps {
  isVisible?: boolean;
  className?: string | { [key: string]: boolean };
  [key: string]: any;
}

export const Loader = (props: LoaderProps) => {
  const { isVisible, className, ...rest } = props;
  const classes = classNames('ne-loader', className);

  if (isVisible)
    return (
      <div className={classes} {...rest}>
        <div />
        <div />
        <div />
      </div>
    );

  return <div className="ne-loader--hidden" />;
};

Loader.defaultProps = {
  isVisible: true
};

export default Loader;
