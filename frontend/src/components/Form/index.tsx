import { useState, ChangeEvent } from "react";
import { Input } from "../Input";

import styles from "./styles.module.scss";

export function Form() {
  const [name, setName] = useState<string>("");
  const [linkedinUrl, setLinkedinUrl] = useState<string>("");
  const [githubUrl, setGithubUrl] = useState<string>("");

  const handleInputNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value.trim());
  };

  const handleInputLinkedinUrl = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLinkedinUrl(value.trim());
  };

  const handleInputGithubUrl = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setGithubUrl(value.trim());
  };

  return (
    <main className={styles.main}>
      <form className={styles.formContainer}>
        <h1>QR code generator</h1>

        <div className={styles.inputsContainers}>
          <Input
            label="Name"
            value={name}
            handleChange={handleInputNameChange}
          />

          <Input
            label="Linkedin URL"
            value={linkedinUrl}
            handleChange={handleInputLinkedinUrl}
          />

          <Input
            label="Github URL"
            value={githubUrl}
            handleChange={handleInputGithubUrl}
          />
        </div>

        <button>Enviar</button>
      </form>
    </main>
  );
}
