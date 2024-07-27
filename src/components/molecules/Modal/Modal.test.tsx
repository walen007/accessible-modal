import { render, fireEvent, act } from '@test/test-utils';
import userEvent from '@testing-library/user-event';
import { Modal } from '.';

describe('<Modal />', () => {
  const mockCloseModal = vi.fn();
  const mockSaveModal = vi.fn();
  const customEvent = 'testCustomEvent';
  const body = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, fugit.';

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
  });

  it('-- should render <Modal /> component', () => {
    const id = 'id001';

    const { getByTestId } = render(
      <Modal id={id} saveModal={() => null} closeModal={() => null} title="Info Modal" customEvent={customEvent}>
        {body}
      </Modal>
    );

    const modal = getByTestId(id);
    expect(modal).toHaveTextContent(body);
  });

  it('-- should add fade-out class', async () => {
    const id = 'id002';

    const { getByText, getByTestId } = render(
      <Modal
        id={id}
        saveModal={mockSaveModal}
        closeModal={mockCloseModal}
        title="Fade Out Test Modal"
        customEvent={customEvent}
      >
        {body}
      </Modal>
    );

    const overlay = getByTestId(id);
    expect(overlay.childElementCount).toBe(1);
    expect(overlay.classList.length).toBe(2);

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });

    expect(mockCloseModal).toHaveBeenCalled();
    expect(overlay.classList.length).toBe(3);
    expect(overlay.classList[2].includes('overlayFadeOut')).toBe(true);
  });

  it('-- should add and remove event listeners and classes', () => {
    const id = 'id003';
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const { unmount } = render(
      <Modal id={id} saveModal={() => null} closeModal={() => null} title="Info Modal" customEvent={customEvent}>
        {body}
      </Modal>
    );

    expect(document.body.classList.contains('lockScroll')).toBe(true);
    expect(addEventListenerSpy).toHaveBeenCalledTimes(3);

    unmount();

    expect(document.body.classList.contains('lockScroll')).toBe(false);
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(3);
  });

  it('-- should handle overlay click', async () => {
    const id = 'id004';

    const { getByTestId } = render(
      <Modal
        id={id}
        saveModal={mockSaveModal}
        closeModal={mockCloseModal}
        title="Overlay Click Modal"
        customEvent={customEvent}
      >
        {body}
      </Modal>
    );

    const overlay = getByTestId(id);
    expect(overlay.classList[2]).toBeUndefined();
    expect(document.body.classList.contains('lockScroll')).toBe(true);

    fireEvent.click(overlay);

    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });

    expect(mockCloseModal).toHaveBeenCalled();
    expect(overlay.classList.length).toBe(3);
    expect(overlay.classList[2]).toBeDefined();
    expect(overlay.classList[2].includes('overlayFadeOut')).toBe(true);
  });

  it('-- should handle Escape key press', async () => {
    const id = 'id005';

    const { getByTestId } = render(
      <Modal
        id={id}
        saveModal={mockSaveModal}
        closeModal={mockCloseModal}
        title="Overlay Click Modal"
        customEvent={customEvent}
      >
        {body}
      </Modal>
    );

    const overlay = getByTestId(id);
    expect(overlay.classList[2]).toBeUndefined();
    expect(document.body.classList.contains('lockScroll')).toBe(true);

    fireEvent.keyDown(overlay, { key: 'Escape', code: 'Escape' });

    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });

    expect(mockCloseModal).toHaveBeenCalled();
    expect(overlay.classList.length).toBe(3);
    expect(overlay.classList[2]).toBeDefined();
    expect(overlay.classList[2].includes('overlayFadeOut')).toBe(true);
  });

  it('-- should focus elements with keyboard Tab & Tab+Shift', async () => {
    const id = 'id006';

    render(
      <Modal id={id} saveModal={mockSaveModal} closeModal={mockCloseModal} title="Test Modal" customEvent={customEvent}>
        {body}
      </Modal>
    );

    void userEvent.tab();
    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });
    expect(document.activeElement?.className.includes('closeButton')).toBe(true);

    void userEvent.tab();
    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });
    expect(document.activeElement?.className.includes('modalBody')).toBe(true);

    void userEvent.tab({ shift: true });
    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });

    void userEvent.tab({ shift: true });
    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });
    expect(document.activeElement?.className.includes('closeButton')).toBe(true);

    void userEvent.tab({ shift: true });
    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });
    expect(document.activeElement?.className.includes('saveButton')).toBe(true);
  });

  it('-- should close modal with header close button', () => {
    const id = 'id007';

    const { getByTestId, getByLabelText } = render(
      <Modal id={id} saveModal={mockSaveModal} closeModal={mockCloseModal} title="Test Modal" customEvent={customEvent}>
        {body}
      </Modal>
    );

    const overlay = getByTestId(id);
    expect(overlay.classList[2]).toBeUndefined();

    const closeButton = getByLabelText('header close button');
    fireEvent.click(closeButton);

    expect(overlay.classList[2].includes('overlayFadeOut')).toBe(true);
  });

  it('-- should close modal with footer close button', () => {
    const id = 'id008';

    const { getByTestId, getByText } = render(
      <Modal id={id} saveModal={mockSaveModal} closeModal={mockCloseModal} title="Test Modal" customEvent={customEvent}>
        {body}
      </Modal>
    );

    const overlay = getByTestId(id);
    expect(overlay.classList[2]).toBeUndefined();

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    expect(overlay.classList[2].includes('overlayFadeOut')).toBe(true);
  });

  it('-- should save modal with footer save button', () => {
    const id = 'id009';

    const { getByTestId, getByText, rerender } = render(
      <Modal id={id} saveModal={mockSaveModal} closeModal={mockCloseModal} title="Test Modal" customEvent={customEvent}>
        {body}
      </Modal>
    );

    const overlay = getByTestId(id);
    expect(overlay.classList[2]).toBeUndefined();

    const saveButton = getByText('Save');
    fireEvent.click(saveButton);

    rerender(
      <Modal
        id={id}
        saveModal={mockSaveModal}
        closeModal={mockCloseModal}
        title="Test Modal"
        customEvent={customEvent}
        isProcessing
      >
        {body}
      </Modal>
    );

    expect(getByText('Close')).toBeDisabled();
    expect(mockSaveModal).toHaveBeenCalled();
  });

  it('-- should trap focus in the modal', async () => {
    const id = 'id010';

    render(
      <div>
        <button className="noFocus" aria-label="footer save button">
          No Focus
        </button>
        <Modal
          id={id}
          saveModal={mockSaveModal}
          closeModal={mockCloseModal}
          title="Test Modal"
          customEvent={customEvent}
        >
          {body}
        </Modal>
      </div>
    );

    void userEvent.tab();
    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });
    expect(document.activeElement?.className.includes('closeButton')).toBe(true);

    void userEvent.tab();
    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });
    expect(document.activeElement?.className.includes('modalBody')).toBe(true);

    void userEvent.tab();
    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });
    expect(document.activeElement?.getAttribute('aria-label')).toBe('footer close button');

    void userEvent.tab();
    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });
    expect(document.activeElement?.getAttribute('aria-label')).toBe('footer save button');

    void userEvent.tab();
    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });

    void userEvent.tab();
    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });
    expect(document.activeElement?.getAttribute('aria-label')).toBe('header close button');
  });
});
