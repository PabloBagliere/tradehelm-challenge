import * as React from "react";
import Button from "components/Button";
import Modal from "components/Modal";
import AddItem from "components/AddItem";

import styles from "./App.module.scss";

const App: React.FC = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Supermaket list</h1>
        <h3> 0 Item(s)</h3>
      </header>
      <Button onClick={openModal}>Add item</Button>
      {showModal ? (
        <Modal setShowModal={setShowModal} title="Add item">
          <AddItem setShowModal={setShowModal} />
        </Modal>
      ) : null}
    </main>
  );
};

export default App;
