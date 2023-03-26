import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Input } from "../Input";
import { createProfile } from "../../api";

import styles from "./styles.module.scss";

export function Form() {
  const [name, setName] = useState<string>("");
  const [linkedinUrl, setLinkedinUrl] = useState<string>("");
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [isDisableButton, setIsDisableButton] = useState<boolean>(true);

  const handleInputNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value);
  };

  const handleInputLinkedinUrl = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLinkedinUrl(value.trim());
  };

  const handleInputGithubUrl = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setGithubUrl(value.trim());
  };

  const handleSubmitForm = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    const bodyPayload = {
      name,
      linkedinUrl,
      githubUrl,
    };

    const userAlreadyExists = await createProfile(bodyPayload);

    if (userAlreadyExists) {
      setName("");
      setGithubUrl("");
      setLinkedinUrl("");

      alert(userAlreadyExists);
    }

    setName("");
    setGithubUrl("");
    setLinkedinUrl("");
  };

  useEffect(() => {
    if (name && linkedinUrl && githubUrl) {
      setIsDisableButton((prevState) => !prevState);
    }
  }, [name, linkedinUrl, githubUrl]);

  return (
    <main className={styles.main} onSubmit={handleSubmitForm}>
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

        <button disabled={isDisableButton}>Enviar</button>
      </form>
    </main>
  );
}
