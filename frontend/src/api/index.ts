import axios, { AxiosError } from "axios";
import { UserDataType } from "../pages/QrCode";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

interface CreateProfilePayload {
  name: string;
  linkedinUrl: string;
  githubUrl: string;
}

export const createProfile = async ({
  name,
  linkedinUrl,
  githubUrl,
}: CreateProfilePayload) => {
  try {
    await apiClient.post("/user/create", {
      name,
      linkedinUrl,
      githubUrl,
    });
  } catch (error: AxiosError | Error | unknown) {
    return "user Already Exists";
  }
};

export const findUserByName = async (username: string) => {
  const { data } = await apiClient.get(`/user/findByName/${username}`);

  return data.user as UserDataType;
};
