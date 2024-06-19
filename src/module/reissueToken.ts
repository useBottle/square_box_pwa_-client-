import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

export default async function reissueToken(): Promise<AxiosResponse> {
  const refreshToken = Cookies.get("refreshToken");

  const response = await axios.get(process.env.REACT_APP_REFRESH_TOKEN, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
    withCredentials: true,
    validateStatus: (status) => {
      return status >= 200 && status < 500;
    },
  });
  return response;
}
