import { useState } from 'react';
import { Modal } from '@molecules/Modal';
import { createCustomEvent } from '@events';
import styles from './App.module.scss';

const MODAL_1_EVENT = 'm1Completed';
const MODAL_2_EVENT = 'm2Completed';

function App({ id }: { id?: string }): JSX.Element {
  const [isModalOneOpen, setIsModalOneOpen] = useState(false);
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);

  const [isModalOneProcessing, setIsModalOneProcessing] = useState(false);
  const [isModalTwoProcessing, setIsModalTwoProcessing] = useState(false);

  const toggleModalOne = () => {
    setIsModalOneOpen(prev => !prev);
  };

  const toggleModalTwo = () => {
    setIsModalTwoOpen(prev => !prev);
  };

  const saveModalOne = () => {
    setIsModalOneProcessing(true);

    // Simulate an async process
    setTimeout(() => {
      setIsModalOneProcessing(false);
      document.dispatchEvent(createCustomEvent(MODAL_1_EVENT));
    }, 2000);
  };

  const saveModalTwo = () => {
    setIsModalTwoProcessing(true);

    // Simulate an async process
    setTimeout(() => {
      setIsModalTwoProcessing(false);
      document.dispatchEvent(createCustomEvent(MODAL_2_EVENT));
    }, 2000);
  };

  return (
    <div data-testid={id}>
      {/* Unmount modal when not opened */}
      {isModalOneOpen && (
        <Modal
          title="Attention"
          customEvent={MODAL_1_EVENT}
          saveModal={saveModalOne}
          closeModal={toggleModalOne}
          ctxModalStyle={styles.attnModal}
          ctxBodyStyle={styles.attnModalBody}
          isProcessing={isModalOneProcessing}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, fugit.
        </Modal>
      )}

      {/* Unmount modal when not opened */}
      {isModalTwoOpen && (
        <Modal
          title="Information"
          customEvent={MODAL_2_EVENT}
          saveModal={saveModalTwo}
          closeModal={toggleModalTwo}
          isProcessing={isModalTwoProcessing}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione quasi quibusdam eligendi non? Unde
          reprehenderit quae quo eius minima sed non incidunt commodi perferendis libero aspernatur tenetur iste
          officia, ut reiciendis, voluptatem, necessitatibus deleniti sequi provident rerum! Totam, doloremque dolore
          voluptate ipsum itaque sed exercitationem accusamus, minus molestiae, aliquam iure veritatis illum dignissimos
          esse! Molestias culpa eos quam nesciunt eligendi, mollitia ut modi unde voluptatem enim, earum amet aliquam
          asperiores quod totam! Aut, cum a cumque dolore dolor nostrum velit natus ducimus commodi blanditiis sint
          possimus, ea dolores mollitia debitis doloribus tenetur tempora est iste. Non nobis debitis sequi fugit
          obcaecati, in ipsum dolor neque commodi nostrum! Sed aperiam similique molestias! Rem eveniet quo alias
          numquam neque modi doloremque, deserunt expedita molestias, cumque veritatis voluptates quisquam officiis
          error saepe illum! Iste nulla perspiciatis in soluta et unde repellat eveniet, officiis ducimus reprehenderit,
          vitae aperiam dolorem inventore. Ducimus, modi enim officia quisquam assumenda quis nulla cum, accusantium
          facilis omnis sequi, consectetur cupiditate aspernatur. Soluta minus minima consequuntur veniam optio est
          quaerat odio. Ullam quas deleniti eum dicta doloremque, earum expedita exercitationem mollitia, dolor iusto
          eaque cumque consequuntur error? Sint quasi expedita necessitatibus eligendi cupiditate et optio debitis iure
          repudiandae, explicabo sit mollitia ratione ducimus nulla? Corporis similique cupiditate numquam mollitia
          explicabo placeat nisi! At animi similique eum, sed ratione corrupti vitae quisquam aliquam illum suscipit!
          Aut itaque, possimus tenetur alias quibusdam quis ad, deleniti fuga consectetur illo consequatur quos odit
        </Modal>
      )}

      <div className={styles.pageWrapper}>
        <button className={styles.btnShowModal} onClick={toggleModalOne}>
          Show Attn Modal
        </button>
        <button className={styles.btnShowModal} onClick={toggleModalTwo}>
          Show Info Modal
        </button>
      </div>
    </div>
  );
}

export default App;
