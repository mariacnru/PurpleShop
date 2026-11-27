import { useParams } from 'react-router';
import ProductComments from '../Components/Templates/Product/Content/Comments';
import Description from '../Components/Templates/Product/Content/Description';
import HeroDetails from '../Components/Templates/Product/Content/HeroDetails';
import RelatedProducts from '../Components/Templates/Product/Content/RelatedProducts';
import Sidebar from '../Components/Templates/Product/Sidebar';
import useProduct from './../lib/Hooks/useProduct';

const ProductPage = () => {
  const { productSlug } = useParams();
  const { product, isLoading, error } = useProduct(productSlug);

  if (isLoading) {
    return (
      <main className="w-[95%] mx-auto my-10">
        <div className="h-96 rounded-2xl bg-zinc-900 animate-pulse" />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="w-[95%] mx-auto my-10">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
          <p className="text-zinc-300 text-sm">دریافت اطلاعات محصول با مشکل مواجه شد.</p>
        </div>
      </main>
    );
  }

  return (
    <main
      id="product-content"
      className="w-[95%] max-w-[1600px] mx-auto my-6 md:my-10 grid grid-cols-1 lg:grid-cols-8 gap-5 lg:gap-6"
    >
      {/* Main Content */}
      <section className="min-w-0 lg:col-span-6 space-y-6 md:space-y-8 *:p-4 md:*:p-5 rounded-2xl border border-zinc-800 bg-zinc-900/80">
        <HeroDetails {...product} />

        <Description />

        <RelatedProducts />

        <ProductComments />
      </section>

      {/* Sidebar */}
      <div className="min-w-0 lg:col-span-2">
        <Sidebar {...product} />
      </div>
    </main>
  );
};

export default ProductPage;
