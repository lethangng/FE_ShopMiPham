import { api } from "../api";

const checkLogin = async (email: string, password: string) => {
  try {
    const body = {
      email,
      password,
    };
    const res = await api.post("/v1/user/login", body);
    return res && res.data && res.data.errCode === 0 ? true : false;
  } catch (error) {
    console.log("Error check login!");
    return false;
  }
};

export default checkLogin;
