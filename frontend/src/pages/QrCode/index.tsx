import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { findUserByName } from "../../api";
import { QRCodeCanva } from "../../components/QRCodeCanva";

import styles from "./styles.module.scss";

export interface UserDataType {
  id: string;
  name: string;
  githubLink: string;
  linkedinLink: string;
}

export function QrCode() {
  const { username } = useParams();
  const [userData, setUserData] = useState<UserDataType>();

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
      <h1>{userData?.name}</h1>
      <h2>Scan me</h2>

      <QRCodeCanva username={username!} />
    </div>
  );
}
