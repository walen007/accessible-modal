import { useEffect, useCallback, useRef, PointerEvent, RefObject } from 'react';

interface IUseModal {
  modalRef: RefObject<HTMLDivElement>;
  overlayRef: RefObject<HTMLDivElement>;
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
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const fadeOut = useCallback(() => {
    if (overlayRef.current) overlayRef.current.classList.add(fadeOutStyle);

    // Delays component unmount to make a smoother fade-out
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

  const getFocusableElements = (element: HTMLDivElement) => {
    return element.querySelectorAll<HTMLElement>(
      'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
  };

  const firstFocusable = useCallback((element: HTMLDivElement) => {
    const focusableElements = getFocusableElements(element);
    return focusableElements.length > 0 ? focusableElements[0] : null;
  }, []);

  const lastFocusable = useCallback((element: HTMLDivElement) => {
    const focusableElements = getFocusableElements(element);
    return focusableElements.length > 0 ? focusableElements[focusableElements.length - 1] : null;
  }, []);

  const isChildElement = (el: Element, modal: Element) => {
    return modal.contains(el);
  };

  const trapFocus = useCallback((): void => {
    if (!modalRef.current) return;

    if (document.activeElement && !isChildElement(document.activeElement, modalRef.current)) {
      return firstFocusable(modalRef.current)?.focus();
    }
  }, [firstFocusable]);

  const handleModalClick = useCallback((evt: PointerEvent<HTMLDivElement>): void => {
    evt.stopPropagation();
  }, []);

  useEffect(() => {
    if (!modalRef.current) return;
    modalRef.current.focus();

    const firstElement = firstFocusable(modalRef.current);
    const lastElement = lastFocusable(modalRef.current);

    const handleKeypress = (evt: KeyboardEvent): void => {
      if (evt.key === 'Escape') return fadeOut();

      // Prevent focus escape when using Tab+Shift
      if (evt.key === 'Tab' && evt.shiftKey && document.activeElement === firstElement) {
        evt.preventDefault();
        lastElement?.focus();
      }
    };

    // Add event listeners after mount
    document.body.classList.add('lockScroll');
    document.addEventListener('keydown', handleKeypress);
    document.addEventListener(customEvent, fadeOut);
    document.addEventListener('focusin', trapFocus, true);

    // Remove event listeners before unmount
    return () => {
      document.body.classList.remove('lockScroll');
      document.removeEventListener('keydown', handleKeypress);
      document.removeEventListener(customEvent, fadeOut);
      document.removeEventListener('focusin', trapFocus, true);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { overlayRef, modalRef, fadeOut, handleClose, handleSave, handleModalClick };
};
