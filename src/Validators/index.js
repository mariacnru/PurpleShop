import { toast } from "sonner";

export const validate = (schima, values) => {
  const result = schima.safeParse(values);

  if (!result.success) {
    toast.error(result.error.issues[0].message);
    return false;
  }

  return true;
};
