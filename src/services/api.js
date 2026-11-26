import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: "https://shopino.pachim.run/v1",
  withCredentials: true,
  timeout: 5000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.code) {
      case "ECONNABORTED": {
        toast.error("درخواست بیش از حد طول کشید");
        break;
      }

      case "ERR_NETWORK": {
        toast.error("مشکلی در ارتباط وجود دارد");
        break;
      }

      default:
        break;
    }

    return Promise.reject(error);
  },
);

export default api;
