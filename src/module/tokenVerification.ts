import axios from "axios";
import Cookies from "js-cookie";

export default async function tokenVerification() {
  const accessToken = Cookies.get("accessToken");

  try {
    const response = await axios.get(process.env.REACT_APP_CHECK_TOKEN, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
