import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { validate } from "../../Validators/index";
import { sendOtpSchima, verifyOtpSchima } from "../../Validators/auth";
import * as authService from "../../services/auth.service";
import { toast } from "sonner";
import { useCountdown } from "./useCountDown";
import authContext from "../../context/authContext";

export const useAuth = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isSendOtp, setIsSendOtp] = useState(false);
  const { restart, getFormatedTime, isExpired } = useCountdown(120);
  const navigate = useNavigate();
  const { refreshUser } = useContext(authContext)

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const sendOtp = async () => {
    if (!validate(sendOtpSchima, { phone })) return;

    const data = await authService.sendOtp(phone);
    setIsSendOtp(true);
    restart();
  };

  const resendOtp = async () => {
    const data = await authService.sendOtp(phone);
    restart();

    toast.success("کد جدید ارسال شد.");
  };

  const verifyOtp = async () => {
    if (!validate(verifyOtpSchima, { phone, otp })) return;

    const data = await authService.verifyOtp(phone, otp);

    return data;
  };

  const login = async () => {
    const data = await verifyOtp();

    if (!data) return;

    toast.success("با موفقیت وارد شدید.");
    navigate("/");

    await refreshUser()
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSendOtp) {
        await login();
      } else {
        await sendOtp();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "کد تایید اشتباه است");
    }
  };

  return {
    phone,
    otp,
    isSendOtp,
    isExpired,
    getFormatedTime,
    resendOtp,
    handlePhoneChange,
    handleOtpChange,
    handleSubmit,
  };
};
