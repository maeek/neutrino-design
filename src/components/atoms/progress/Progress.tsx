import classnames from 'classnames';

export interface ProgressMilestone {
  label: string;
  range?: number | [number, number];
}

export enum ProgressType {
  BAR = 'bar',
  ROUND = 'round',
}

export interface ProgressProps {
  type?: ProgressType;
  min?: number;
  max?: number;
  value: number;
  step?: number;
  milestones: ProgressMilestone[];
}

export const Progress = (props: ProgressProps) => {

  const classes = classnames('ne-progress');

  return (
    <div className={classes}>
      <div className="ne-progress-bar" />
      <div className="ne-progress-thumb" />
    </div>
  );
};

export default Progress;
