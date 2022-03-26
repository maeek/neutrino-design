import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import classNames from 'classnames';
import './styles/bubble-timestamp.scss';

dayjs.extend(relativeTime);

export interface BubbleTimestampProps {
  timestamp: string | number | Date | null;
  className?: string;
  inBulk?: boolean;
  isLastInBulk?: boolean;
}

export const BubbleTimestamp = (props: BubbleTimestampProps) => {
  const {
    className,
    timestamp = new Date().getTime(),
    inBulk,
    isLastInBulk
  } = props;

  const [ realTimestamp, setRealTimestamp ] = useState(null);

  useEffect(() => {
    if (!timestamp) return;

    const interval = setInterval(() => {
      setRealTimestamp(dayjs().to(timestamp));
    }, 1000 * 60);

    setRealTimestamp(dayjs().to(timestamp));

    return () => {
      clearInterval(interval);
    };
  }, [ timestamp ]);

  const timestampNodeClasses = classNames(
    'ne-bubble-timestamp',
    inBulk && !isLastInBulk && 'ne-bubble-timestamp--not-last-in-bulked',
    !inBulk
      ? 'ne-bubble-timestamp--single'
      : 'ne-bubble-timestamp--bulked',
    className
  );

  return (
    <div className={timestampNodeClasses} title={dayjs(timestamp).format('D MMMM YYYY, HH:mm')}>
      {realTimestamp}
    </div>
  );
};
