import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  addGuestCartItem,
  getGuestCartItems,
  removeGuestCartItem,
} from "../lib/helpers/guestCart";
import { addToServerCart, getServerCart } from "../services/cart.service";
import authContext from "./authContext";
import CartContext from "./CartContext";

const CartProvider = ({ children }) => {
  const { user, isLoading: authIsLoading } = useContext(authContext);

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchServerCart = async () => {
    try {
      const response = await getServerCart();
      const cart = response?.data?.cart;

      setItems(cart);
    } catch (err) {
      if (err?.response?.status === 404) {
        setItems([]);
      } else {
        toast.error("خطا در دریافت سبد خرید");
      }
    }
  };

  const mergeGuestCartIntoServer = async () => {};

  useEffect(() => {
    if (authIsLoading) true;

    const syncCart = async () => {
      setIsLoading(true);

      if (user) {
        await mergeGuestCartIntoServer();
        await fetchServerCart;
      } else {
        setItems(getGuestCartItems());
      }

      setIsLoading(false);
    };

    syncCart();
  }, [user, authIsLoading]);

  const addItem = async (item) => {
    if (user) {
      try {
        const response = await addToServerCart({
          productId: item.productId,
          sellerId: item.sellerId,
          quantity: item.quantity,
        });

        setItems(response?.data?.cart?.items || []);
      } catch (err) {
        toast.error("خطا در افزودن به سبد خرید");
      }
    } else {
      setItems(addGuestCartItem(item));
    }
  };

  const updateItem = () => {};

  const removeItem = async (productId, sellerId) => {
    if (user) {
      try {
        const response = await removeServerCartItem({ productId, sellerId });
        setItems(response?.data?.cart?.items || []);
      } catch (err) {
        toast.error("خطادر حذف محصول از سبد");
      }
    } else {
      setItems(removeGuestCartItem(productId, sellerId));
    }
  };

  const itemsCount = 0;

  const value = {
    items,
    itemsCount,
    isLoading,
    addItem,
    updateItem,
    removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
