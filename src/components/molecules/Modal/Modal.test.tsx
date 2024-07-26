import { render } from '@test/test-utils';
import { Modal } from '.';

describe('<Modal />', () => {
  it('-- should render <Modal /> component', () => {
    const id = 'id001';
    const body = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, fugit.';

    const { getByTestId } = render(
      <Modal id={id} saveModal={() => null} closeModal={() => null} title="Info Modal" customEvent="eventeee">
        {body}
      </Modal>
    );

    const modal = getByTestId(id);
    expect(modal.childNodes[0]).toHaveTextContent(body);
  });
});
