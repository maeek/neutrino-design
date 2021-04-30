import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
  mountPointId?: string;
  className?: string;
  children?: ReactNode;
}

export const Modal = (props: ModalProps) => {
  const { mountPointId = 'ne-portal', children, className } = props;
  const mountPointRef = useRef(null);
  const [ portal, setPortal ] = useState(null);

  useEffect(() => {
    const existingMountPoint = document.getElementById(mountPointId);

    if (!existingMountPoint) {
      const mountPoint = document.createElement('div');
      mountPoint.id = mountPointId;
      document.body.appendChild(mountPoint);
      mountPointRef.current = mountPoint;
    } else {
      mountPointRef.current = existingMountPoint;
    }

    const portalNode = document.createElement('div');
    portalNode.classList.add('ne-modal');
    portalNode.classList.add(className);
    mountPointRef.current.appendChild(portalNode);;
    setPortal(portalNode);

    return () => {
      mountPointRef.current.removeChild(portalNode);
      setPortal(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ mountPointId, className ]);

  if (!portal) return null;
  return createPortal(children, portal);
};

export default Modal;
