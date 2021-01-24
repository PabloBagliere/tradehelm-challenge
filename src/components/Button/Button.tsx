import * as React from "react";

import styles from "./Button.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  colorSelector?: "Primary" | "Secondary";
}

export default function Button({
  children,
  colorSelector = "Primary",
  ...props
}: Props): JSX.Element {
  return (
    <button className={`${styles.conteiner} ${colorSelector}`} {...props}>
      {children}
    </button>
  );
}
