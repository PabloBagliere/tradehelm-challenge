import * as React from "react";
import Button from "components/Button";
import Modal from "components/Modal";
import AddItem from "components/addItem";

import styles from "./App.module.scss";

const App: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);

  const openModal = () => {
    setShowModal(!showModal);
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
          <AddItem />
        </Modal>
      ) : null}
    </main>
  );
};

export default App;
