import * as React from "react";
import * as ReactDOM from "react-dom";

import styles from "./Modal.module.scss";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

const Modal: React.FC<Props> = ({setShowModal, children, title}) => {
  const element = document.getElementById("root-modal");
  const modalRef = React.useRef<HTMLDivElement>(null);

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = React.useCallback(
    (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    },
    [setShowModal],
  );

  React.useEffect(() => {
    document.addEventListener("keydown", keyPress);

    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  if (!element) return <div />;

  return ReactDOM.createPortal(
    <div ref={modalRef} className={styles.conteiner} onClick={closeModal}>
      <div className={styles.modal}>
        <div className={styles.head}>
          <h3>{title}</h3>
          <span
            onClick={() => {
              setShowModal(false);
            }}
          >
            X
          </span>
        </div>
        {children}
      </div>
    </div>,
    element,
  );
};

export default Modal;
