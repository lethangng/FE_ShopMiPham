import { api } from "../api";

// Trả về true nếu đã tồn tại email
const checkEmailExist = async (email: string | undefined) => {
  try {
    const res = await api.post("/v1/user/check-email", { email });
    return res && res.data && res.data.errCode === 0 && res.data.data === true
      ? true
      : false;
  } catch (error) {
    console.log("Error checkEmail!");
    return false;
  }
};

export default checkEmailExist;
