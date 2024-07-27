import React, { PropsWithChildren } from 'react';
import cn from 'classnames';
import { CloseSvg, IsProcessingSvg } from '@atoms';
import { useModal } from './useModal';
import styles from './Modal.module.scss';

export interface IModal {
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
  isProcessing,
  customEvent,
  closeModal,
  saveModal,
  ctxHeaderStyle,
  ctxBodyStyle,
  ctxFooterStyle,
  ctxModalStyle,
  children,
}): JSX.Element => {
  const { overlayRef, modalRef, fadeOut, handleClose, handleSave, handleModalClick } = useModal(
    closeModal,
    saveModal,
    customEvent,
    styles.overlayFadeOut
  );

  return (
    <>
      <div ref={overlayRef} data-testid={id} onClick={fadeOut} className={cn(styles.overlay, styles.show)}>
        <div
          ref={modalRef}
          tabIndex={-1}
          onClick={handleModalClick}
          className={cn(styles.modal, ctxModalStyle)}
          aria-live="assertive"
          aria-description={`${title} modal`}
        >
          <div className={cn(styles.header, ctxHeaderStyle)}>
            <h3>{title}</h3>
            <button
              aria-label="header close button"
              aria-description="header close button"
              onClick={fadeOut}
              className={styles.closeButton}
            >
              <CloseSvg />
            </button>
          </div>
          <div className={cn(styles.modalBody, ctxBodyStyle)} tabIndex={0} aria-description="modal body">
            {children}
          </div>
          <div className={cn(styles.footer, ctxFooterStyle)}>
            <button
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="footer close button"
              aria-description="footer close button"
              disabled={isProcessing}
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className={styles.saveButton}
              aria-label="footer save button"
              aria-description="save button"
              aria-busy={isProcessing}
              disabled={isProcessing}
            >
              {isProcessing === true ? <IsProcessingSvg style={styles.loadingSvg} /> : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
