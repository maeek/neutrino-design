import * as React from 'react';
import classNames from 'classnames';
import Style from './style.scss';

declare global {
  interface FileList {
    forEach(callback: (f: File) => void): void;
  }
  interface DataTransferItemList {
    forEach(callback: (f: DataTransferItem) => void): void;
  }
}

interface droppedItems {
  items: DataTransferItemList | null;
  files: FileList | null;
}

export interface BaseTypoProps {
  showOverlay?: boolean;
  renderOverlay?: (dropzoneRef: any, items: droppedItems) => React.ReactNode;
  showDropped?: boolean;

  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  theme?: 'light' | 'dark';
  ref?: any;
  dropEffect?: 'none' | 'copy' | 'link' | 'move';
  effectAllowed?:
    | 'none'
    | 'copy'
    | 'copyLink'
    | 'copyMove'
    | 'link'
    | 'linkMove'
    | 'move'
    | 'all'
    | 'uninitialized';

  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragStop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const DragAndDrop: React.FC<BaseTypoProps> = (props) => {
  const {
    theme,
    children,
    style,
    className,
    showOverlay,
    renderOverlay,
    ref = null,
    // dropEffect = 'copy',
    // effectAllowed = 'all',
    onDragStart,
    onDragStop,
    onDrop,
    ...rest
  } = props;

  const dropzoneRef = React.useRef(ref);
  const [isHighlighted, setIsHighlighted] = React.useState(false);
  const [droppedItems, setDroppedItems] = React.useState<droppedItems>({
    items: null,
    files: null
  });

  const dragEnableHighlight = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    clearItems();
    setIsHighlighted(true);
    if (onDragStart) onDragStart(e);
    // e.dataTransfer?.dropEffect = dropEffect;
    // e.dataTransfer?.effectAllowed = effectAllowed;
  };
  const dragDisableHighlight = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHighlighted(false);
    if (onDragStop) onDragStop(e);
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    getDroppedData(e);

    if (onDrop) onDrop(e);
  };

  const clearItems = () => {
    setDroppedItems({ items: null, files: null });
  };

  const getDroppedData: any = (e: React.DragEvent<HTMLDivElement>) => {
    const { dataTransfer } = e;
    const { items, files } = dataTransfer;

    // console.log(e.dataTransfer);
    // console.log(items);
    // console.log(files);

    setDroppedItems({ items, files });

    return {
      items,
      files
    };
  };

  const classes = classNames(
    Style.dropzone,
    theme === 'light' ? Style.dropzone__light : Style.dropzone__dark,
    showOverlay ? null : Style.dropzone__no_overlay,
    isHighlighted ? Style.dropzone__highlighted : null,
    className
  );

  React.useEffect(() => {
    const hookRef = dropzoneRef.current;
    if (!hookRef) return;

    ['dragenter', 'dragover'].forEach((evtName) => {
      hookRef.addEventListener(evtName, dragEnableHighlight, false);
    });
    ['dragleave', 'drop'].forEach((evtName) => {
      hookRef.addEventListener(evtName, dragDisableHighlight, false);
    });
    hookRef.addEventListener('drop', dropHandler, false);

    return () => {
      ['dragenter', 'dragover'].forEach((evtName) => {
        hookRef.removeEventListener(evtName, dragEnableHighlight);
      });
      ['dragleave', 'drop'].forEach((evtName) => {
        hookRef.removeEventListener(evtName, dragDisableHighlight);
      });
      hookRef.removeEventListener('drop', dropHandler);
    };
  }, [dropzoneRef]);

  return (
    <div style={style} className={classes} ref={dropzoneRef} {...rest}>
      {children}
      {showOverlay && renderOverlay && renderOverlay(dropzoneRef, droppedItems)}
    </div>
  );
};

export default DragAndDrop;
