import React, { useState } from "react";
import Table from "../../../common/Table/index";
import TableToolbar from "../../../common/Table/TableToolbar";
import TableHead from "../../../common/Table/TableHead";
import TableRow from "../../../common/Table/TableRow";
import TableCell from "../../../common/Table/TableCell";
import TableBody from "../../../common/Table/TableBody";
import { RiAddLine } from "react-icons/ri";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { toast } from "sonner";
import useUsers from "../../../../../../lib/Hooks/useUsers";
import { banUser, deleteUser } from "../../../../../../services/users.service";
import Confirm from "../../../../../Common/Confirm";
import toPersianDate from "../../../../../../lib/helpers/date";
import { FaBan } from "react-icons/fa";
import Pagination from "../../../../../Common/Pagination";
import EditUserForm from "./EditUserForm";

const ModeratorUsersTable = () => {
  const { users, pagination, page, setPage, isLoading, error, refetch } =
    useUsers();

  const [banningUser, setBanningUser] = useState(null);
  const [isBanning, setIsBanning] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const roleLabels = { USER: "کاربر", ADMIN: "مدیر", SELLER: "فروشنده" };

  const handleBan = async () => {
    if (!banningUser) return;

    try {
      const res = await banUser(banningUser._id);
      toast.success("کاربر با موفقیت بن شد");

      setBanningUser(null);
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا در بن کاربر");
    } finally {
      setIsBanning(false);
    }
  };

  return (
    <div className="relative">
      <Table>
        <TableToolbar className="flex justify-between items-center">
          <div className="py-4 text-sm font-medium text-zinc-300">کاربران</div>
        </TableToolbar>

        <TableHead>
          <TableRow className="border-b border-zinc-800 bg-zinc-900/60">
            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              شناسه
            </TableCell>
            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              نام
            </TableCell>

            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              شماره تماس
            </TableCell>

            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              تاریخ ثبت نام
            </TableCell>

            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              آدرس
            </TableCell>

            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              کد ملی
            </TableCell>

            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              نقش
            </TableCell>

            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              اکشن
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {isLoading && (
            <TableRow>
              <TableCell className="text-purple-500">
                درحال بارگذاری...
              </TableCell>
            </TableRow>
          )}

          {!isLoading && error && (
            <TableRow>
              <TableCell className="text-red-500">
                {error || "خطا در دریافت کاربران"}
              </TableCell>
            </TableRow>
          )}

          {!isLoading && !error && users.length === 0 && (
            <TableRow>
              <TableCell className="text-purple-500">
                هنوز کاربری ثبت نشده
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            !error &&
            users.map((user) => {
              return (
                <TableRow
                  key={user._id}
                  className="border-b border-zinc-800/70 transition-colors hover:bg-purple-500/5"
                >
                  <TableCell className="px-5 py-4 text-sm text-zinc-300">
                    {user._id.slice(-5)}
                  </TableCell>

                  <TableCell className="px-5 py-4 text-sm font-medium text-purple-500 underline">
                    {user.name || "نام کاربر ثبت نشده"}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-sm font-medium text-white">
                    {user.phone}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-sm font-medium text-white">
                    {toPersianDate(user.createdAt)}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-xs font-medium text-white">
                    {user.addresses[0] || "ثبت نشده"}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-xs font-medium text-white">
                    {user.nationalCode || "ثبت نشده"}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-sm font-medium text-white">
                    {user.roles.map((role) => roleLabels[role]).join(" - ")}
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    <button
                      onClick={() => {
                        setEditingUser(user);
                        setEditModalOpen(true);
                        console.log(user);
                      }}
                      className="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-2 text-xs text-purple-300 transition-all duration-200 hover:border-purple-400 hover:bg-purple-500/20 hover:text-purple-200"
                    >
                      <FiEdit2 size={15} />
                      ویرایش
                    </button>

                    <button
                      onClick={() => {
                        setIsBanning(!isBanning);
                        setBanningUser(user);
                      }}
                      className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/70 px-3 py-2 text-xs text-zinc-300 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <FaBan size={15} />
                      بن
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      <Confirm
        isOpen={isBanning}
        onClose={() => {
          setIsBanning(false);
          setIsBanning(null);
        }}
        onConfirm={handleBan}
        message={
          banningUser
            ? `آیا از بن کردن کاربر «${banningUser.name || banningUser.phone}» اطمینان دارید؟ این عمل غیرقایل بازگشت است.`
            : undefined
        }
      />

      <EditUserForm
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={editingUser}
        refetch={refetch}
      />

      <Pagination pagination={pagination} setPage={setPage} page={page} />
    </div>
  );
};

export default ModeratorUsersTable;
