import { useState } from 'react';
import cn from 'classnames';
import { Modal } from '@molecules/Modal';
import { createCustomEvent } from '@events';
import styles from './App.module.scss';

const MODAL_1_EVENT = 'm1Completed';
const MODAL_2_EVENT = 'm2Completed';
const MODAL_3_EVENT = 'm3Completed';

// id for tests only
function App({ id }: { id?: string }): JSX.Element {
  const [isModalAttnOpen, setIsModalAttnOpen] = useState(false);
  const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
  const [isModalNlOpen, setIsModalNlOpen] = useState(false);

  const [isAttnModalProcessing, setIsAttnModalProcessing] = useState(false);
  const [isInfoModalProcessing, setIsInfoModalProcessing] = useState(false);
  const [isNlModalProcessing, setIsNlModalProcessing] = useState(false);

  const toggleAttnModal = () => {
    setIsModalAttnOpen(prev => !prev);
  };

  const toggleInfoModal = () => {
    setIsModalInfoOpen(prev => !prev);
  };

  const toggleNlModal = () => {
    setIsModalNlOpen(prev => !prev);
  };

  const saveAttnModal = () => {
    setIsAttnModalProcessing(true);

    // Simulate an async process
    setTimeout(() => {
      setIsAttnModalProcessing(false);
      document.dispatchEvent(createCustomEvent(MODAL_1_EVENT));
    }, 2000);
  };

  const saveInfoModal = () => {
    setIsInfoModalProcessing(true);

    // Simulate an async process
    setTimeout(() => {
      setIsInfoModalProcessing(false);
      document.dispatchEvent(createCustomEvent(MODAL_2_EVENT));
    }, 2000);
  };

  const saveNlModal = () => {
    setIsNlModalProcessing(true);

    // Simulate an async process
    setTimeout(() => {
      setIsNlModalProcessing(false);
      document.dispatchEvent(createCustomEvent(MODAL_3_EVENT));
    }, 2000);
  };

  return (
    <div data-testid={id}>
      {/* Unmount modal when not opened */}
      {isModalAttnOpen && (
        <Modal
          title="Attention"
          customEvent={MODAL_1_EVENT}
          saveModal={saveAttnModal}
          closeModal={toggleAttnModal}
          ctxModalStyle={styles.attnModal}
          ctxBodyStyle={cn(styles.attnModalBody, 'hideScrollbar')}
          isProcessing={isAttnModalProcessing}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, fugit.
        </Modal>
      )}

      {/* Unmount modal when not opened */}
      {isModalInfoOpen && (
        <Modal
          title="Information"
          customEvent={MODAL_2_EVENT}
          saveModal={saveInfoModal}
          closeModal={toggleInfoModal}
          isProcessing={isInfoModalProcessing}
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

      {/* Unmount modal when not opened */}
      {isModalNlOpen && (
        <Modal
          title="Newsletter Subscription"
          customEvent={MODAL_3_EVENT}
          ctxModalStyle={styles.nlModal}
          ctxBodyStyle={cn(styles.nlModalBody, 'hideScrollbar')}
          saveModal={saveNlModal}
          closeModal={toggleNlModal}
          isProcessing={isNlModalProcessing}
        >
          <input type="text" name="email" className={styles.emailIpnut} placeholder="Email address" />
        </Modal>
      )}

      <div className={styles.pageWrapper}>
        <button onClick={toggleAttnModal} className={styles.btnShowModal} aria-description="show attention modal">
          Show Attn Modal
        </button>
        <button onClick={toggleInfoModal} className={styles.btnShowModal} aria-description="show info modal">
          Show Info Modal
        </button>
        <button onClick={toggleNlModal} className={styles.btnShowModal} aria-description="show newsletter modal">
          Show Newsletter Modal
        </button>
      </div>
    </div>
  );
}

export default App;
