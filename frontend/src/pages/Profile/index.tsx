import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findUserByName } from "../../api";
import { UserDataType } from "../QrCode";

import styles from "./styles.module.scss";

export function Profile() {
  const [userData, setUserData] = useState<UserDataType>();

  const { username } = useParams();
  const navigate = useNavigate();

  const fetchUser = async () => {
    const [firstName, lastName] = username!?.split("-");

    const user = await findUserByName(`${firstName} ${lastName}`);

    if (!user) {
      alert("user does not exists");
      return navigate("/");
    }

    return setUserData(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <p>{`Hello, my name is ${userData?.name}`}</p>

        <h1>My History</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus nihil
          consectetur deleniti deserunt eius quo dolor illum, facilis soluta,
          sed fuga officia repellendus laborum dicta eos nulla voluptatum ullam
          error.
        </p>

        <div className={styles.buttonContainer}>
          <a href={userData?.githubLink}>
            <button>Github</button>
          </a>

          <a href={userData?.linkedinLink}>
            <button>Linkedin</button>
          </a>
        </div>
      </div>
    </div>
  );
}
