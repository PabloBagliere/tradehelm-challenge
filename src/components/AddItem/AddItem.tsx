import * as React from "react";
import Button from "components/Button";

import styles from "./addItem.module.scss";

interface Props {
  setShowModal: React.Dispatch<boolean>;
}

const AddItem: React.FC<Props> = ({setShowModal}) => {
  const [value, setValue] = React.useState<string>("");
  const [status, setStatus] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);

  const updateValue = (event: {target: {value: string}}) => {
    setValue(event.target.value);
  };

  const createItem = () => {
    setStatus(false);
    if (value.length <= 0) {
      setError(true);
      setStatus(true);

      return;
    }
    setShowModal(false);
  };

  return (
    <div className={styles.conteinter}>
      <input className={styles.input} type="text" value={value} onChange={updateValue} />
      {error ? <span>Error</span> : null}
      <Button disabled={status} onClick={createItem}>
        Añadir item
      </Button>
    </div>
  );
};

export default AddItem;
