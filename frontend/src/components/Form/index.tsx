import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Input } from "../Input";
import { createProfile } from "../../api";

import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

export function Form() {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [linkedinUrl, setLinkedinUrl] = useState<string>("");
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [isDisableButton, setIsDisableButton] = useState<boolean>(true);

  const navigate = useNavigate();

  const handleInputNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value.trim());
  };

  const handleInputLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLastName(value.trim());
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
      name: `${name} ${lastName}`,
      linkedinUrl,
      githubUrl,
    };

    const userAlreadyExists = await createProfile(bodyPayload);

    if (userAlreadyExists) {
      alert(userAlreadyExists);
      return navigate(`/${name}-${lastName}`);
    }

    return navigate(`/${name}-${lastName}`);
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
            placeholder="John"
          />

          <Input
            label="Last Name"
            value={lastName}
            handleChange={handleInputLastNameChange}
            placeholder="Doe"
          />

          <Input
            label="Linkedin URL"
            value={linkedinUrl}
            handleChange={handleInputLinkedinUrl}
            placeholder="ex: https://linkedin.com/in/john-doe"
          />

          <Input
            label="Github URL"
            value={githubUrl}
            handleChange={handleInputGithubUrl}
            placeholder="ex: https://github.com/john-doe"
          />
        </div>

        <button disabled={isDisableButton}>Enviar</button>
      </form>
    </main>
  );
}
