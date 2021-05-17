import Button from "components/Button";
import * as React from "react";

import styles from "./addItem.module.scss";

export default function addItem(): JSX.Element {
  return (
    <div className={styles.conteinter}>
      <input className={styles.input} type="text" />
      <Button>Añadir item</Button>
    </div>
  );
}
