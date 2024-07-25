import React, { useEffect, useCallback, useRef, PropsWithChildren, PointerEvent } from 'react';
import cn from 'classnames';
import styles from './Modal.module.scss';
import { CloseSvg, IsProcessingSvg } from '@atoms';

interface IModal {
  id?: string;
  title: string;
  ctxHeaderStyle?: string;
  ctxBodyStyle?: string;
  ctxFooterStyle?: string;
  ctxModalStyle?: string;
  isProcessing?: boolean;
  closeModal: () => void;
  saveModal: () => void;
}

export const Modal: React.FC<IModal & PropsWithChildren> = ({
  id,
  title,
  ctxHeaderStyle,
  ctxBodyStyle,
  ctxFooterStyle,
  ctxModalStyle,
  isProcessing,
  closeModal,
  saveModal,
  children,
}): JSX.Element => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(
    (evt: PointerEvent<HTMLButtonElement>): void => {
      evt.stopPropagation();
      closeModal();
    },
    [closeModal]
  );

  const handleSave = useCallback(
    (evt: PointerEvent<HTMLButtonElement>): void => {
      evt.stopPropagation();
      saveModal();
    },
    [saveModal]
  );

  const handleKeypress = useCallback(
    (evt: KeyboardEvent): void => {
      if (evt.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  const handleModalClick = useCallback((evt: PointerEvent<HTMLDivElement>): void => {
    evt.stopPropagation();
  }, []);

  useEffect(() => {
    if (isProcessing === false) closeModal();
  }, [closeModal, isProcessing]);

  useEffect(() => {
    document.body.classList.add('lockScroll');
    document.addEventListener('keydown', handleKeypress);

    return () => {
      document.body.classList.remove('lockScroll');
      document.removeEventListener('keydown', handleKeypress);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div ref={overlayRef} data-testid={id} onClick={closeModal} className={styles.overlay}>
        <div onClick={handleModalClick} className={cn(styles.modal, ctxModalStyle)}>
          <div className={cn(styles.header, ctxHeaderStyle)}>
            <h3>{title}</h3>
            <button onClick={closeModal} className={styles.closeButton}>
              <CloseSvg />
            </button>
          </div>
          <div className={cn(styles.body, ctxBodyStyle)}>{children}</div>
          <div className={cn(styles.footer, ctxFooterStyle)}>
            <button className={styles.closeButton} onClick={handleClose}>
              Close
            </button>
            <button className={styles.saveButton} onClick={handleSave}>
              {isProcessing === true ? <IsProcessingSvg style={styles.loadingSvg} /> : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
