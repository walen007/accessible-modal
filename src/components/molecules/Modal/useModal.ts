import { useEffect, useCallback, useRef, PointerEvent } from 'react';

interface IUseModal {
  overlayRef: React.RefObject<HTMLDivElement>;
  fadeOut: () => void;
  handleClose: (evt: PointerEvent<HTMLButtonElement>) => void;
  handleSave: (evt: PointerEvent<HTMLButtonElement>) => void;
  handleModalClick: (evt: PointerEvent<HTMLDivElement>) => void;
}

export const useModal = (
  closeModal: () => void,
  saveModal: () => void,
  customEvent: string,
  fadeOutStyle: string
): IUseModal => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const fadeOut = useCallback(() => {
    if (overlayRef.current) overlayRef.current.classList.add(fadeOutStyle);

    setTimeout(() => {
      closeModal();
    }, 1000);
  }, [closeModal, fadeOutStyle]);

  const handleClose = useCallback(
    (evt: PointerEvent<HTMLButtonElement>): void => {
      evt.stopPropagation();
      fadeOut();
    },
    [fadeOut]
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
        fadeOut();
      }
    },
    [fadeOut]
  );

  const handleModalClick = useCallback((evt: PointerEvent<HTMLDivElement>): void => {
    evt.stopPropagation();
  }, []);

  useEffect(() => {
    document.body.classList.add('lockScroll');
    document.addEventListener('keydown', handleKeypress);
    document.addEventListener(customEvent, fadeOut);

    return () => {
      document.body.classList.remove('lockScroll');
      document.removeEventListener('keydown', handleKeypress);
      document.removeEventListener(customEvent, fadeOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { overlayRef, fadeOut, handleClose, handleSave, handleModalClick };
};
