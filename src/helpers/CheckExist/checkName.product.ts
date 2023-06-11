import { api } from "../api";

const checkNameProductExist = async (name: string) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    const res = await api.post("/v1/product/check-name", formData);
    return res && res.data && res.data.errCode === 0 && res.data.data === true
      ? true
      : false;
  } catch (error) {
    console.log("Error checkName!");
    return false;
  }
};

export default checkNameProductExist;
