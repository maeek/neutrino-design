import React, { CSSProperties, MouseEvent, DragEvent, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { AddRounded } from '@material-ui/icons';
import classNames from 'classnames';
import Button from '../../buttons/Action';
import { Heading } from '../../typography/heading';
import { Paragraph } from '../../typography/paragraph';
import './file-select.scss';

export interface FileSelectProps {
  name?: string;
  description?: string;
  onChange?: (files: FileList | null) => void;
  dragAndDrop?: boolean;
  accept?: string;
  multiple?: boolean;
  limit?: number;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  buttonText?: string;
}

export interface FileSelectRef {
  clear: () => void;
}

const convertBytesToHumanReadable = (bytes: number) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) {
    return '0 Byte';
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10);
  return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
};

export const FileSelect = forwardRef<FileSelectRef, FileSelectProps>((props, ref) => {
  const { name, description, onChange, accept, multiple, disabled, className, style, buttonText } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  useImperativeHandle(ref, () => ({
    clear: () => {
      setFiles(null);
    }
  }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files: eventFiles } = event.target;
    setFiles(eventFiles);
    onChange?.(eventFiles);
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const { files: eventFiles } = e.dataTransfer || {};

    setIsDragOver(false);

    if (!eventFiles || eventFiles.length === 0) return;

    setFiles(eventFiles);
    onChange?.(eventFiles);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  return (
    <div
      className={classNames('ne-file-select', className, {
        'ne-file-select--on-over': isDragOver
      })}
      style={style}
      onDragOver={onDragOver}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={onFileDrop}
    >
      <Heading
        level={4}
        className='ne-file-select-name'
      >
        {name}
      </Heading>
      <Paragraph className='ne-file-select-description'>{description}</Paragraph>

      <div className='ne-file-select-label'>
        <input
          ref={inputRef}
          name={name}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className='ne-file-select-input'
          type='file'
          onChange={handleChange}
        />

        {files && files.length > 0 ? (
          <ul className='ne-file-select-files'>
            {Array.from(files).map((file, index) => (
              <li
                key={index}
                className='ne-file-select-file'
              >
                {file.name} ({convertBytesToHumanReadable(file.size)})
              </li>
            ))}
          </ul>
        ) : null}

        <ul className='ne-file-select-summary'>
          <li className='ne-file-select-summary-item'>
            {!files || files.length === 0 ? (
              `Click the button below to select ${multiple ? 'files' : 'a file'}.`
            ) : (
              <>
                Files selected: <b>{files.length}</b>
              </>
            )}
          </li>
          {files && (
            <li className='ne-file-select-summary-item'>
              Size:{' '}
              <b>{convertBytesToHumanReadable(Array.from(files).reduce((total, file) => total + file.size, 0))}</b>
            </li>
          )}
        </ul>

        <Button
          className='ne-file-select-btn'
          onClick={handleClick}
        >
          {files && files.length > 0 ? buttonText || 'Add More Files' : buttonText || 'Add Files'}
          {!buttonText && <AddRounded />}
        </Button>
      </div>
    </div>
  );
});

FileSelect.displayName = 'FileSelect';
