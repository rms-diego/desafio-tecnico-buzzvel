import { ChangeEvent } from "react";
import styles from "./styles.module.scss";

interface InputProps {
  label: string;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ label, value, handleChange }: InputProps) {
  return (
    <label className={styles.container}>
      {label}
      <input type="text" value={value} onChange={handleChange} />
    </label>
  );
}
