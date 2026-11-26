import Checkout from "../Components/Templates/Cart/Checkout";
import CartProduct from "../Components/Templates/Cart/Content/Fragments/CartProduct";
import CartTitle from "../Components/Templates/Cart/Content/Fragments/CartTitle";
import ClearBasket from "../Components/Templates/Cart/Content/Fragments/ClearBasket";
import { EmptyBasket } from "../Components/Templates/Cart/EmptyBasket";

const CartPage = () => {
  const cartLength = 0;

  if (!cartLength) {
    return <EmptyBasket />;
  }

  return (
    <main
      id="cart-page"
      className="container my-8 grid grid-cols-1 gap-5 lg:grid-cols-9"
    >
      {/* Cart Content */}
      <div
        id="cart-content"
        className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 backdrop-blur-sm lg:col-span-6"
      >
        {/* Header */}
        <div className="flex-between border-b border-zinc-800 pb-4">
          <CartTitle />
          <ClearBasket />
        </div>

        {/* Products */}
        <div id="cart-products-container" className="mt-4 space-y-3">
          {Array.from({ length: 3 }).map((product, index) => (
            <CartProduct key={index} {...product} />
          ))}
        </div>
      </div>

      {/* Checkout */}
      <div className="lg:col-span-3">
        <Checkout />
      </div>
    </main>
  );
};

export default CartPage;
