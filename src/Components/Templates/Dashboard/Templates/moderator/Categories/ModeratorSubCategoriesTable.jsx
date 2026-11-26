import React, { useState } from "react";
import Table from "../../../common/Table/index";
import TableToolbar from "../../../common/Table/TableToolbar";
import TableHead from "../../../common/Table/TableHead";
import TableRow from "../../../common/Table/TableRow";
import TableCell from "../../../common/Table/TableCell";
import TableBody from "../../../common/Table/TableBody";
import useSubCategories from "../../../../../../lib/Hooks/useSubCategories";
import { RiAddLine } from "react-icons/ri";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Confirm from "../../../../../Common/Confirm";
import { toast } from "sonner";
import { deleteSubcategory } from "../../../../../../services/category.service";
import CreateSubCategoryModal from "./CreateSubCategoryModal";
import EditSubCategory from "./EditSubCategory";

const ModeratorSubCategoriesTable = () => {
  const { subCategories, isLoading, refetch, error } = useSubCategories();

  const [deletingCategory, setDeletingCategory] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [addSubModalIsOpen, setAddSubModalIsOpen] = useState(false);

  // Edit subCategory
  const [editSubModalOpen, setEditSubModalOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleDelete = async () => {
    if (!deletingCategory || isDeleting) return;

    setIsDeleting(true);

    try {
      await deleteSubcategory(deletingCategory._id);

      toast.success("زیر‌دسته‌بندی با موفقیت حذف شد");

      setIsConfirmOpen(false);
      setDeletingCategory(null);

      await refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا در حذف زیر‌دسته‌بندی");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative">
      <Table>
        <TableToolbar className="flex justify-between items-center">
          <div className="py-4 text-sm font-medium text-zinc-300">
            زیر دسته بندی ها
          </div>

          <div className="">
            <button
              className="flex items-center gap-2 bg-purple-500/10 text-purple-400 border border-purple-400/20 text-sm p-2 hover:scale-95 cursor-pointer"
              onClick={() => setAddSubModalIsOpen(true)}
            >
              <RiAddLine />
              ایجاد زیر دسته بندی
            </button>
          </div>
        </TableToolbar>

        <TableHead>
          <TableRow className="border-b border-zinc-800 bg-zinc-900/60">
            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              نام زیر دسته بندی
            </TableCell>

            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              لینک
            </TableCell>

            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              فیلتر
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

          {!isLoading && !error && subCategories?.length === 0 && (
            <TableRow>
              <TableCell className="text-purple-500">
                هنوز دسته بندی ثبت نشده
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            !error &&
            subCategories?.map((category) => {
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

                  <TableCell className="px-5 py-4">
                    <button
                      onClick={() => {
                        setEditSubModalOpen(true);
                        setSelectedSubCategory(category);
                        console.log(category);
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

      <CreateSubCategoryModal
        isOpen={addSubModalIsOpen}
        onClose={() => setAddSubModalIsOpen(false)}
        onSuccess={refetch}
      />

      <EditSubCategory
        isOpen={editSubModalOpen}
        onClose={() => setEditSubModalOpen(false)}
        category={selectedSubCategory}
        onSuccess={refetch}
      />
    </div>
  );
};

export default ModeratorSubCategoriesTable;
