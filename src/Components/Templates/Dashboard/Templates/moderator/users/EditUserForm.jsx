import React, { useEffect, useState } from "react";
import { FiX, FiUser, FiMapPin, FiShield, FiInfo } from "react-icons/fi";
import { editUser } from "../../../../../../services/users.service";
import { toast } from "sonner";
import useUsers from "../../../../../../lib/Hooks/useUsers";

const EditUserForm = ({ isOpen, user, onClose, refetch }) => {
  const [formData, setFormData] = useState({
    name: "",
    nationalCode: "",
    cardNumber: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        nationalCode: user.nationalCode || "",
        cardNumber: user.cardNumber || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const systemInfo = [
    { label: "شناسه کاربر", value: user?._id },
    {
      label: "تاریخ ثبت‌نام",
      value: user?.createdAt
        ? new Date(user.createdAt).toLocaleString("fa-IR")
        : "-",
    },
    {
      label: "آخرین بروزرسانی",
      value: user?.updatedAt
        ? new Date(user.updatedAt).toLocaleString("fa-IR")
        : "-",
    },
    { label: "Version", value: user?.__v ?? 0 },
  ];

  const handleSubmit = async () => {
    if (
      formData.nationalCode.length !== 10 ||
      formData.cardNumber.length !== 16
    ) {
      toast.error("کد ملی باید 10 رقم و شماره کارت باید 16 رقم باشد");
      return;
    }

    try {
      const res = await editUser(formData);
      console.log(res);
      console.log("Selected user:", user?._id);
      console.log("Updated user:", res.data.data.user._id);
      await refetch();

      onClose();
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);
      console.log("Request:", error.config?.data);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-purple-500";

  const labelClass = "mb-2 block text-sm text-zinc-400";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-all duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-white">ویرایش کاربر</h2>
            <p className="mt-1 text-xs text-zinc-500">
              مدیریت اطلاعات حساب کاربری
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-7 overflow-y-auto p-6 scrollbar-none [&::-webkit-scrollbar]:hidden">
          {/* Personal Info */}
          <section>
            <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold text-purple-400">
              <FiUser />
              اطلاعات شخصی
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>نام و نام خانوادگی</label>
                <input
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  className={inputClass}
                  placeholder="نام کاربر"
                />
              </div>

              <div>
                <label className={labelClass}>شماره موبایل</label>
                <input
                  defaultValue={user?.phone || ""}
                  className={inputClass}
                  dir="ltr"
                  placeholder="09xxxxxxxxx"
                  readOnly
                />
              </div>

              <div>
                <label className={labelClass}>کد ملی</label>
                <input
                  value={formData.nationalCode}
                  onChange={handleChange}
                  name="nationalCode"
                  className={inputClass}
                  dir="ltr"
                  placeholder="کد ملی"
                />
              </div>

              <div>
                <label className={labelClass}>شماره کارت</label>
                <input
                  value={formData.cardNumber}
                  onChange={handleChange}
                  name="cardNumber"
                  className={inputClass}
                  dir="ltr"
                  placeholder="شماره کارت"
                />
              </div>
            </div>
          </section>

          {/* Roles */}
          {/* <section>
            <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold text-purple-400">
              <FiShield />
              نقش‌های کاربر
            </h3>

            <div className="flex flex-wrap gap-3">
              {roles.map((role) => (
                <label
                  key={role}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300 transition hover:border-purple-500/50"
                >
                  <input
                    type="checkbox"
                    readOnly
                    defaultChecked={user?.roles?.includes(role)}
                    className="size-4 accent-purple-500"
                  />
                  {role}
                </label>
              ))}
            </div>
          </section> */}

          {/* Addresses */}
          <section>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-purple-400">
              <FiMapPin />
              آدرس‌ها
            </h3>

            {user?.addresses?.length > 0 ? (
              <div className="space-y-3">
                {user.addresses.map((address, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-sm text-zinc-300"
                  >
                    {typeof address === "string"
                      ? address
                      : address.address || JSON.stringify(address)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 py-6 text-center text-sm text-zinc-500">
                هیچ آدرسی برای این کاربر ثبت نشده است.
              </div>
            )}
          </section>

          {/* System Info */}
          <section>
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-purple-400">
              <FiInfo />
              اطلاعات سیستمی
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {systemInfo.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
                >
                  <span className="text-xs text-zinc-500">{item.label}</span>

                  <p className="mt-2 break-all text-sm text-zinc-300" dir="ltr">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-zinc-800 bg-zinc-950 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl bg-red-500/10 px-5 py-2.5 text-sm text-red-400 transition hover:bg-red-500/20"
          >
            انصراف
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-purple-500"
          >
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;
