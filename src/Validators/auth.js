import { z } from "zod";

export const sendOtpSchima = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, { message: "شماره تماس معتبر نمی باشد" }),
});

export const verifyOtpSchima = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, { message: "شماره تماس معتبر نمی باشد" }),

  otp: z.string().trim().length(4, { message: "کد تایید باید 4 رقمی باشد" }),
});
