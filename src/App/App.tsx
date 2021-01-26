import * as React from "react";
import Button from "components/Button";

import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Supermaket list</h1>
        <h3> 0 Item(s)</h3>
      </header>
      <Button>Add item</Button>
    </main>
  );
};

export default App;
