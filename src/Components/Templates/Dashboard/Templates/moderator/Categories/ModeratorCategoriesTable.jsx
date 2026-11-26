import React, { useState } from "react";
import Table from "../../../common/Table/index";
import TableToolbar from "../../../common/Table/TableToolbar";
import TableHead from "../../../common/Table/TableHead";
import TableRow from "../../../common/Table/TableRow";
import TableCell from "../../../common/Table/TableCell";
import TableBody from "../../../common/Table/TableBody";
import useCategories from "../../../../../../lib/Hooks/useCategories";
import { RiAddLine } from "react-icons/ri";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Confirm from "../../../../../Common/Confirm";
import { toast } from "sonner";
import { deleteCategory } from "../../../../../../services/category.service";
import ModalIndex from "../../../common/Modal/ModalIndex";
import CreateCategoryModal from "./CreateCategoryModal";
import EditCategory from "./EditCategory";

const ModeratorCategoriesTable = () => {
  const { categories, isLoading, refetch, error } = useCategories();

  // Delete Category
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [isOpenForm, setIsOpenForm] = useState(false);

  // Edit Category
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    if (!deletingCategory || isDeleting) return;

    setIsDeleting(true);

    try {
      await deleteCategory(deletingCategory._id);

      toast.success("دسته‌بندی با موفقیت حذف شد");

      setIsConfirmOpen(false);
      setDeletingCategory(null);

      await refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا در حذف دسته‌بندی");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative">
      <Table>
        <TableToolbar className="flex justify-between items-center">
          <div className="py-4 text-sm font-medium text-zinc-300">
            دسته بندی ها
          </div>

          <div className="">
            <button
              onClick={() => setIsOpenForm(true)}
              className="flex items-center gap-2 bg-purple-500/10 text-purple-400 border border-purple-400/20 text-sm p-2 hover:scale-95 cursor-pointer"
            >
              <RiAddLine />
              ایجاد دسته بندی
            </button>
          </div>
        </TableToolbar>

        <TableHead>
          <TableRow className="border-b border-zinc-800 bg-zinc-900/60">
            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              نام دسته بندی
            </TableCell>

            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              لینک
            </TableCell>

            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              فیلتر
            </TableCell>

            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              زیر دسته بندی ها
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
                {error || "خطا در دریافت دسته بندی ها"}
              </TableCell>
            </TableRow>
          )}

          {!isLoading && !error && categories?.length === 0 && (
            <TableRow>
              <TableCell className="text-purple-500">
                هنوز دسته بندی ثبت نشده
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            !error &&
            categories?.map((category) => {
              return (
                <TableRow
                  key={category._id}
                  className="border-b border-zinc-800/70 transition-colors hover:bg-purple-500/5"
                >
                  <TableCell className="px-5 py-4 text-sm text-zinc-300">
                    {category.title}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-sm text-zinc-300">
                    {category.slug}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-sm text-zinc-300">
                    {category.filters?.length}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-sm text-zinc-300">
                    {category.subCategories?.length}
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    <button
                      onClick={() => {
                        setIsOpenEditForm(true);
                        setEditingCategory(category);
                      }}
                      className="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-2 text-xs text-purple-300 transition-all duration-200 hover:border-purple-400 hover:bg-purple-500/20 hover:text-purple-200"
                    >
                      <FiEdit2 size={15} />
                      ویرایش
                    </button>

                    <button
                      onClick={() => {
                        setDeletingCategory(category);
                        setIsConfirmOpen(true);
                      }}
                      className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/70 px-3 py-2 text-xs text-zinc-300 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <FiTrash2 size={15} />
                      حذف
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      <Confirm
        isOpen={isConfirmOpen}
        onClose={() => {
          if (isDeleting) return;

          setIsConfirmOpen(false);
          setDeletingCategory(null);
        }}
        onConfirm={handleDelete}
        message={
          deletingCategory
            ? `آیا از حذف دسته‌بندی «${deletingCategory.title}» اطمینان دارید؟`
            : undefined
        }
      />

      <CreateCategoryModal
        title="افزودن دسته بندی"
        isOpen={isOpenForm}
        onClose={() => setIsOpenForm(false)}
      >
        {/* Modal Content */}
      </CreateCategoryModal>

      <EditCategory
        isOpen={isOpenEditForm}
        onClose={() => setIsOpenEditForm(false)}
        category={editingCategory}
      />
    </div>
  );
};

export default ModeratorCategoriesTable;
