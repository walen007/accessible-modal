import { render } from '@test/test-utils';
import App from './App';

describe('<App />', () => {
  it('-- should render <App /> component', () => {
    const id = 'app001';

    const { getByTestId } = render(<App id={id} />);

    const modal = getByTestId(id);
    expect(modal).toBeInTheDocument();
  });
});
