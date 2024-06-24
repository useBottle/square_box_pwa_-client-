import axios, { AxiosResponse } from "axios";

export default async function reissueToken(): Promise<AxiosResponse> {
  const response = await axios.get(process.env.REACT_APP_REFRESH_TOKEN, {
    withCredentials: true,
    validateStatus: (status) => {
      return status >= 200 && status < 500;
    },
  });
  return response;
}
