import { useState } from "react";
import { validate } from "../../Validators";
import { contactusSchima } from "../../Validators/contsctus";
import { sendContactUSMessage } from "../../services/contactUS.service";
import { toast } from "sonner";

export const useContactUS = (initialForm = {}) => {
  const [form, setForm] = useState(initialForm);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const changeHandler = ({ target }) => {
    const { name, value } = target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(initialForm);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validate(contactusSchima, form)) return false;

    setIsSubmiting(true);

    const response = await sendContactUSMessage(form);

    toast.promise(response, {
      loading: "درحال ارسال...",
      success: (data) => {
        resetForm();
        setIsSubmiting(false);

        return "پیام شما با موفقیت ارسال شد.";
      },
      error: (error) => {
        setIsSubmiting(false);
        return error.response?.data?.message || "پیام شما ارسال نشد!";
      },
    });
  };

  return { form, isSubmiting, changeHandler, submitHandler };
};
