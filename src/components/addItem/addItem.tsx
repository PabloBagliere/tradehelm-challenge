import Button from "components/Button";
import * as React from "react";

import styles from "./addItem.module.scss";

const addItem: React.FC = () => {
  return (
    <div className={styles.conteinter}>
      <input className={styles.input} type="text" />
      <Button>Añadir item</Button>
    </div>
  );
};

export default addItem;
