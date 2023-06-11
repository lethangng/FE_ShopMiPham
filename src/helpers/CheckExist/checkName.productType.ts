import { api } from "../api";

const checkNameExist = async (name: string | undefined) => {
  try {
    const res = await api.post("/v1/product-type/check-name", { name });
    return res && res.data && res.data.errCode === 0 && res.data.data === true
      ? true
      : false;
  } catch (error) {
    console.log("Error checkName!");
    return false;
  }
};

export default checkNameExist;
