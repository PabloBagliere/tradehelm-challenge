import * as React from "react";

import styles from "./Button.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colorSelector?: "Primary" | "Secondary";
}

const Button: React.FC<Props> = ({children, colorSelector = "Primary", ...props}) => {
  return (
    <button className={`${styles.conteiner} ${colorSelector}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
