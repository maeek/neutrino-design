import * as React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactChildren;
  bodyScroll?: boolean;
  rootElement?: HTMLElement;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  bodyScroll,
  rootElement
}: ModalProps) => {
  const [element] = React.useState(
    rootElement || document.createElement('div')
  );

  React.useEffect(() => {
    let modalRoot = document.getElementById('modal');

    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = 'modal';
      document.appendChild(modalRoot);
    }

    modalRoot.appendChild(element);
    if (bodyScroll) document.body.style.overflow = 'hidden';

    return () => {
      if (bodyScroll) document.body.style.overflow = 'auto';
      element.remove();
    };
  }, [element, bodyScroll]);

  return createPortal(children, element);
};

Modal.defaultProps = {
  bodyScroll: true
};

export default Modal;
