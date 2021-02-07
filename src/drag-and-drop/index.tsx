import * as React from 'react';
import classNames from 'classnames';
import Style from './style.scss';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import { debug } from 'console';

declare global {
  interface FileList {
    forEach(callback: (f: File) => void): void;
  }
  interface DataTransferItemList {
    forEach(callback: (f: DataTransferItem) => void): void;
  }
}

export interface droppedItems {
  items: DataTransferItemList | null;
  files: FileList | null;
}

enum dropTypes {
  'file' = 'file',
  'text' = 'text',
  'any' = 'any'
}

export interface BaseTypoProps {
  /**
   * Render overlay, this also affects renderDropped
   */
  showOverlay?: boolean;

  /**
   * Clear state of dropped elements on dragging over dropzone
   */
  clearOnDrag?: boolean;

  /**
   * Function to render dropped items
   *
   * @param any dropzoneRef
   * @param droppedItems items
   */
  renderDropped?: (dropzoneRef: any, items: droppedItems) => React.ReactNode;

  /**
   * Allow dropping multiple files/elements
   */
  multiple?: boolean;

  /**
   * Type of dropzone
   * @type file - accepts only files
   * @type text - accepts only text and link based elements
   * @type any - accepts any type of dropped item
   */
  type?: keyof typeof dropTypes;

  children?: React.ReactNode;

  style?: React.CSSProperties;
  className?: string;
  theme?: 'light' | 'dark';

  ref?: any;

  /**
   * Native dropEffect and effectAllowed properties
   */
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
    multiple,
    showOverlay,
    renderDropped,
    clearOnDrag,
    ref = null,
    dropEffect = 'copy',
    effectAllowed = 'all',
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
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = dropEffect;
      e.dataTransfer.effectAllowed = effectAllowed;
    }

    clearItems();
    setIsHighlighted(true);
    if (onDragStart) onDragStart(e);
  };

  const dragDisableHighlight = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHighlighted(false);
    if (onDragStop) onDragStop(e);
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = dropEffect;
      e.dataTransfer.effectAllowed = effectAllowed;
    }

    getDroppedData(e);

    if (onDrop) onDrop(e);
  };

  const clearItems = () => {
    if (clearOnDrag) setDroppedItems({ items: null, files: null });
  };

  const getDroppedData: any = (e: React.DragEvent<HTMLDivElement>) => {
    const { dataTransfer } = e;
    const { items, files } = dataTransfer;

    setDroppedItems({ items, files });

    return {
      items: dropTypes.any || dropTypes.file ? items : null,
      files: dropTypes.any || dropTypes.text ? files : null
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
      {showOverlay && renderDropped && renderDropped(dropzoneRef, droppedItems)}
      {showOverlay && (
        <div className={Style.dropzone_overlay}>
          <MoveToInboxIcon />
        </div>
      )}
    </div>
  );
};

DragAndDrop.defaultProps = {
  theme: 'dark',
  showOverlay: true,
  clearOnDrag: true,
  type: 'any',
  multiple: false,
  dropEffect: 'copy',
  effectAllowed: 'all'
};

export default DragAndDrop;
