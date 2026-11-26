import { z } from "zod";

export const contactusSchima = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "نام باید حداقل 3 کاراکتر داشته باشد" })
    .max(50, { message: "نام نباید بیشتر از 50 کاراکتر باشد" }),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10,11}$/, {
      message: "شماره موبایل صحیح نمی باشد",
    }),
  subject: z
    .string()
    .trim()
    .min(3, { message: "موضوع پبام باید حداقل 3 کاراکتر داشته باشد" })
    .max(100, {
      message: "موضوع پیام نباید بیشتر از 100 کاراکتر داشته باشد",
    }),
  content: z
    .string()
    .trim()
    .min(10, { message: "محتوای پیام باید حداقل 10 کاراکتر داشته باشد" })
    .max(1000, {
      message: "محتوای پیام نباید بیشتر از 1000 کاراکتر داشته باشد",
    }),
});
