import axios, { AxiosResponse } from "axios";

export default async function tokenVerification(): Promise<AxiosResponse | void> {
  try {
    const response = await axios.get(process.env.REACT_APP_CHECK_TOKEN, {
      withCredentials: true,
      validateStatus: (status) => {
        return status >= 200 && status < 500;
      },
    });
    return response;
  } catch (error) {
    console.error("Token is not valid.", error);
  }
}
