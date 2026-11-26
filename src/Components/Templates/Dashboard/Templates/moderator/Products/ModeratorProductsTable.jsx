import React, { useState } from "react";
import Table from "../../../common/Table/index";
import TableToolbar from "../../../common/Table/TableToolbar";
import TableHead from "../../../common/Table/TableHead";
import TableRow from "../../../common/Table/TableRow";
import TableCell from "../../../common/Table/TableCell";
import TableBody from "../../../common/Table/TableBody";
import { RiAddLine } from "react-icons/ri";
import ProductDrawer from "../../../common/ProductDrawer/ProductDrawer";
import useProducts from "../../../../../../lib/Hooks/useProducts";
import {
  formatPrice,
  getDisplayPrise,
} from "../../../../../../lib/helpers/price";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { deleteProduct } from "../../../../../../services/product.service";
import Confirm from "../../../../../Common/Confirm";
import { toast } from "sonner";
import EditProductForm from "../../../../../Common/EditProductForm/EditProductForm";

const ModeratorProductsTable = () => {
  const [isDrawerShow, setIsDrawerShow] = useState(false);
  const [editModalOepn, setEditModalOepn] = useState(false);

  const toggleDrawer = () => setIsDrawerShow((prev) => !prev);
  const { products, pagination, page, setPage, isLoading, error, refetch } =
    useProducts();

  const [deletingProduct, setDeletingProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = async () => {
    if (!deletingProduct) return;

    try {
      const res = await deleteProduct(deletingProduct._id);
      toast.error("محصول با موفقیت حذف شد");

      setDeletingProduct(null);
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا در حذف محصول");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative">
      <Table>
        <TableToolbar className="flex justify-between items-center">
          <div className="py-4 text-sm font-medium text-zinc-300">محصولات</div>

          <div className="">
            <button
              onClick={toggleDrawer}
              className="flex items-center gap-2 bg-purple-500/10 text-purple-400 border border-purple-400/20 text-sm p-2 hover:scale-95 cursor-pointer"
            >
              <RiAddLine />
              ایجاد محصول
            </button>
          </div>
        </TableToolbar>

        <TableHead>
          <TableRow className="border-b border-zinc-800 bg-zinc-900/60">
            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              شناسه
            </TableCell>
            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              تصویر
            </TableCell>

            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              نام محصول
            </TableCell>

            <TableCell className="px-5 py-4 text-right text-xs font-medium text-zinc-400">
              قیمت
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
                {error || "خطا در دریافت محصولات"}
              </TableCell>
            </TableRow>
          )}

          {!isLoading && !error && products.length === 0 && (
            <TableRow>
              <TableCell className="text-purple-500">
                هنوز محصولی ثبت نشده
              </TableCell>
            </TableRow>
          )}

          {!isLoading &&
            !error &&
            products.map((product) => {
              const { price, hasMultipleSellers } = getDisplayPrise(
                product.sellers,
              );

              return (
                <TableRow
                  key={product._id}
                  className="border-b border-zinc-800/70 transition-colors hover:bg-purple-500/5"
                >
                  <TableCell className="px-5 py-4 text-sm text-zinc-300">
                    {product.shortIdentifier}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-sm text-zinc-300">
                    {product.images.length >= 1 ? (
                      product.images.map((image) => (
                        <img
                          key={image}
                          src={`https://shopino.pachim.run/images/products/${product?.images[0]}`}
                          alt={product.name}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                      ))
                    ) : (
                      <p className="rounded-md bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-400">
                        تصویر موجود نیست
                      </p>
                    )}
                  </TableCell>

                  <TableCell className="px-5 py-4 text-sm font-medium text-white">
                    {product.name}
                  </TableCell>

                  <TableCell className="px-5 py-4 text-sm text-zinc-300 flex flex-col">
                    <span>{formatPrice(price)} تومان</span>
                    {hasMultipleSellers && (
                      <span className="text-purple-500 text-xs">
                        بیش از یک فروشنده
                      </span>
                    )}
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setEditModalOepn(true);
                      }}
                      className="flex items-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-2 text-xs text-purple-300 transition-all duration-200 hover:border-purple-400 hover:bg-purple-500/20 hover:text-purple-200"
                    >
                      <FiEdit2 size={15} />
                      ویرایش
                    </button>

                    <button
                      onClick={() => {
                        setIsDeleting(!isDeleting);
                        setDeletingProduct(product);
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
        isOpen={isDeleting}
        onClose={() => {
          setIsDeleting(false);
          setDeletingProduct(null);
        }}
        onConfirm={handleDelete}
        message={
          deletingProduct
            ? `آیا از حذف محصول «${deletingProduct.name}» اطمینان دارید؟`
            : undefined
        }
      />

      <EditProductForm
        isOpen={editModalOepn}
        setIsOpnen={setEditModalOepn}
        product={editingProduct}
      />

      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-5 text-zinc-200">
          <button
            className="rounded-md bg-purple-500/10 border border-purple-400/20
             px-2.5 py-1 text-sm font-medium text-purple-400"
            disabled={page <= 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            قبلی
          </button>

          <span className="text-sm">
            صفحه {pagination.page} از {pagination.totalPages}
          </span>

          <button
            className="rounded-md bg-purple-500/10 border border-purple-400/20
             px-2.5 py-1 text-sm font-medium text-purple-400"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            بعدی
          </button>
        </div>
      )}

      <ProductDrawer isOpen={isDrawerShow} onToggle={toggleDrawer} />
    </div>
  );
};

export default ModeratorProductsTable;
