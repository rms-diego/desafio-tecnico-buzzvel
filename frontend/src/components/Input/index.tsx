import { ChangeEvent } from "react";
import styles from "./styles.module.scss";

interface InputProps {
  label: string;
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export function Input({ label, value, handleChange, placeholder }: InputProps) {
  return (
    <label className={styles.container}>
      {label}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </label>
  );
}
