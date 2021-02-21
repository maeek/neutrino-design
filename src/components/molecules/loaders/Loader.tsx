import classNames from 'classnames';
import './loader.scss';

export interface LoaderProps {
  isVisible?: boolean;
  className?: string | { [key: string]: boolean };
}

export const Loader: React.FC<LoaderProps> = (props: LoaderProps) => {
  const { isVisible, className } = props;
  const classes = classNames('ne-loader', className);

  if (isVisible)
    return (
      <div className={classes}>
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
