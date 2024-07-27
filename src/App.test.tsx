import { render, fireEvent, act } from '@test/test-utils';
import App from './App';

const eventSpy = new CustomEvent('customEvent');

vi.mock('@events', () => ({
  createCustomEvent: vi.fn(() => eventSpy),
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('-- should render <App />', () => {
    const { getByText } = render(<App />);

    expect(getByText('Show Attn Modal')).toBeInTheDocument();
    expect(getByText('Show Info Modal')).toBeInTheDocument();
    expect(getByText('Show Newsletter Modal')).toBeInTheDocument();
  });

  it('-- should render with custom id', () => {
    const { getByTestId } = render(<App id="test-id" />);
    expect(getByTestId('test-id')).toBeInTheDocument();
  });

  it('-- should open and close Attention modal with header close button', async () => {
    const { getByText, queryByText, getByLabelText } = render(<App />);
    const attnButton = getByText('Show Attn Modal');
    fireEvent.click(attnButton);
    const attnModal = getByText('Attention');
    expect(attnModal).toBeInTheDocument();

    const closeButton = getByLabelText('header close button');
    fireEvent.click(closeButton);

    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });

    const attnModal2 = queryByText('Attention');
    expect(attnModal2).not.toBeInTheDocument();
  });

  it('-- should open and close Attention modal with footer close button', async () => {
    const { getByText, queryByText } = render(<App />);
    const attnButton = getByText('Show Attn Modal');
    fireEvent.click(attnButton);
    const attnModal = getByText('Attention');
    expect(attnModal).toBeInTheDocument();

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });

    const attnModal2 = queryByText('Attention');
    expect(attnModal2).not.toBeInTheDocument();
  });

  it('-- should open and close Information modal with header close button', async () => {
    const { getByText, queryByText, getByLabelText } = render(<App />);
    const infoButton = getByText('Show Info Modal');
    fireEvent.click(infoButton);
    const infoModal = getByText('Information');
    expect(infoModal).toBeInTheDocument();

    const closeButton = getByLabelText('header close button');
    fireEvent.click(closeButton);

    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });

    const infoModal2 = queryByText('Information');
    expect(infoModal2).not.toBeInTheDocument();
  });

  it('-- should open and close Information modal with footer close button', async () => {
    const { getByText, queryByText } = render(<App />);
    const infoButton = getByText('Show Info Modal');
    fireEvent.click(infoButton);
    const infoModal = getByText('Information');
    expect(infoModal).toBeInTheDocument();

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });

    const infoModal2 = queryByText('Information');
    expect(infoModal2).not.toBeInTheDocument();
  });

  it('-- should open and close Newsletter modal with header close button', async () => {
    const { getByText, queryByText, getByLabelText } = render(<App />);
    const nlButton = getByText('Show Newsletter Modal');
    fireEvent.click(nlButton);
    const nlModal = getByText('Newsletter Subscription');
    expect(nlModal).toBeInTheDocument();

    const closeButton = getByLabelText('header close button');
    fireEvent.click(closeButton);

    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });

    const nlModal2 = queryByText('Newsletter Subscription');
    expect(nlModal2).not.toBeInTheDocument();
  });

  it('-- should open and close Newsletter modal with footer close button', async () => {
    const { getByText, queryByText } = render(<App />);
    const nlButton = getByText('Show Newsletter Modal');
    fireEvent.click(nlButton);
    const nlModal = getByText('Newsletter Subscription');
    expect(nlModal).toBeInTheDocument();

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });

    const nlModal2 = queryByText('Newsletter Subscription');
    expect(nlModal2).not.toBeInTheDocument();
  });

  it('-- should handle rapid modal toggling', () => {
    const { getByText } = render(<App />);
    const attnButton = getByText('Show Attn Modal');
    fireEvent.click(attnButton);
    fireEvent.click(attnButton);
    fireEvent.click(attnButton);
    expect(getByText('Attention')).toBeInTheDocument();
  });

  it('-- should handle multiple modal openings and closings', async () => {
    const { getByText, queryByText } = render(<App />);

    fireEvent.click(getByText('Show Attn Modal'));
    expect(getByText('Attention')).toBeInTheDocument();
    fireEvent.click(getByText('Close'));

    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });

    fireEvent.click(getByText('Show Info Modal'));
    expect(getByText('Information')).toBeInTheDocument();
    fireEvent.click(getByText('Close'));

    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });

    fireEvent.click(getByText('Show Newsletter Modal'));
    expect(getByText('Newsletter Subscription')).toBeInTheDocument();
    fireEvent.click(getByText('Close'));

    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });

    expect(queryByText('Attention')).not.toBeInTheDocument();
    expect(queryByText('Information')).not.toBeInTheDocument();
    expect(queryByText('Newsletter Subscription')).not.toBeInTheDocument();
  });

  it('-- should save Attention modal and dispatch custom event', async () => {
    const dispatchEventSpy = vi.spyOn(document, 'dispatchEvent');

    const { getByText } = render(<App />);
    fireEvent.click(getByText('Show Attn Modal'));
    fireEvent.click(getByText('Save'));

    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });

    expect(dispatchEventSpy).toHaveBeenCalled();
  });

  it('-- should save Information modal and dispatch custom event', async () => {
    const dispatchEventSpy = vi.spyOn(document, 'dispatchEvent');

    const { getByText } = render(<App />);
    fireEvent.click(getByText('Show Info Modal'));
    fireEvent.click(getByText('Save'));

    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });

    expect(dispatchEventSpy).toHaveBeenCalled();
  });

  it('-- should save Newsletter modal and dispatch custom event', async () => {
    const dispatchEventSpy = vi.spyOn(document, 'dispatchEvent');
    const { getByText } = render(<App />);
    fireEvent.click(getByText('Show Newsletter Modal'));
    fireEvent.click(getByText('Save'));

    await act(async () => {
      await Promise.resolve(vi.advanceTimersByTime(2000));
    });

    expect(dispatchEventSpy).toHaveBeenCalled();
  });

  it('-- should fill email input in Newsletter modal', () => {
    const { getByText, getByPlaceholderText } = render(<App />);

    fireEvent.click(getByText('Show Newsletter Modal'));
    const emailInput = getByPlaceholderText('Email address');
    expect(emailInput).toBeInTheDocument();

    fireEvent.change(emailInput, {
      target: { value: 'test@example.com' },
    });
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('-- should activate processing states', () => {
    const { getByText } = render(<App />);

    fireEvent.click(getByText('Show Attn Modal'));
    fireEvent.click(getByText('Save'));

    expect(getByText('Close')).toBeDisabled();
  });
});
