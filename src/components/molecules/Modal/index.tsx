import React, { PropsWithChildren } from 'react';
import cn from 'classnames';
import { CloseSvg, IsProcessingSvg } from '@atoms';
import { useModal } from './useModal';
import styles from './Modal.module.scss';

interface IModal {
  id?: string;
  title: string;
  isProcessing?: boolean;
  customEvent: string;
  closeModal: () => void;
  saveModal: () => void;

  // Optional context styles
  ctxHeaderStyle?: string;
  ctxBodyStyle?: string;
  ctxFooterStyle?: string;
  ctxModalStyle?: string;
}

export const Modal: React.FC<IModal & PropsWithChildren> = ({
  id,
  title,
  ctxHeaderStyle,
  ctxBodyStyle,
  ctxFooterStyle,
  ctxModalStyle,
  isProcessing,
  customEvent,
  closeModal,
  saveModal,
  children,
}): JSX.Element => {
  const { overlayRef, fadeOut, handleClose, handleSave, handleModalClick } = useModal(
    closeModal,
    saveModal,
    customEvent,
    styles.overlayFadeOut
  );

  return (
    <>
      <div ref={overlayRef} data-testid={id} onClick={fadeOut} className={cn(styles.overlay, styles.show)}>
        <div onClick={handleModalClick} className={cn(styles.modal, ctxModalStyle)}>
          <div className={cn(styles.header, ctxHeaderStyle)}>
            <h3>{title}</h3>
            <button onClick={fadeOut} className={styles.closeButton}>
              <CloseSvg />
            </button>
          </div>
          <div className={cn(styles.modalBody, ctxBodyStyle)}>{children}</div>
          <div className={cn(styles.footer, ctxFooterStyle)}>
            <button className={styles.closeButton} onClick={handleClose} disabled={isProcessing}>
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
