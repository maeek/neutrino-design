import { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  mountPointId?: string;
  className?: string;
  children?: ReactNode;
  [key: string]: any;
}

export const Modal = (props: ModalProps) => {
  const { mountPointId = 'ne-portal', children, className } = props;
  const mountPointRef = useRef<HTMLDivElement>(null);
  const [ portal, setPortal ] = useState<HTMLDivElement>(null as unknown as HTMLDivElement);

  useEffect(() => {
    const existingMountPoint = document.getElementById(mountPointId);

    if (!existingMountPoint) {
      const mountPoint = document.createElement('div');
      mountPoint.id = mountPointId;
      document.body.appendChild(mountPoint);
      (mountPointRef as MutableRefObject<HTMLDivElement>).current = mountPoint;
    } else {
      (mountPointRef as MutableRefObject<HTMLDivElement>).current = existingMountPoint as HTMLDivElement;
    }

    const portalNode = document.createElement('div');
    portalNode.classList.add('ne-modal');
    portalNode.classList.add(className as string);
    (mountPointRef as MutableRefObject<HTMLDivElement>).current.appendChild(portalNode);;
    setPortal(portalNode);

    return () => {
      (mountPointRef as MutableRefObject<HTMLDivElement>).current.removeChild(portalNode);
      setPortal(null as unknown as HTMLDivElement);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ mountPointId, className ]);

  if (!portal) return null;
  return createPortal(children, portal);
};

export default Modal;
