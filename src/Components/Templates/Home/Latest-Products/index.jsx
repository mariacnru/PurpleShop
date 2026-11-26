import ProductCard from "../../../Common/Cards/ProductCard";
import SectionTitle from "../../../Common/SectionTitle";
import useProducts from "./../../../../lib/Hooks/useProducts";
import { Link } from "react-router";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const swiperBreakpoints = {
  320: { slidesPerView: 1.5 },
  576: { slidesPerView: 2 },
  768: { slidesPerView: 3 },
  992: { slidesPerView: 4 },
  1200: { slidesPerView: 5 },
};

const LatestProducts = () => {
  const { products = [], isLoading, error } = useProducts();

  return (
    <section className="container my-12">
      <div className="flex justify-between items-center">
        <SectionTitle text="جدیدترین محصولات" />

        <Link to="/products" className="text-sm">
          مشاهده همه محصولات
        </Link>
      </div>

      <div className="mt-10 rounded-2xl p-4">
        {/* Loading */}
        {isLoading && (
          <Swiper slidesPerView={5} spaceBetween={20}>
            {Array.from({ length: 5 }).map((_, index) => (
              <SwiperSlide key={index}>
                <ProductCardSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500" />

            <p className="text-sm text-zinc-500">
              {error} | در صورت لود نشدن محصولات از <bdi>vpn</bdi> استفاده
              نمایید
            </p>
          </div>
        )}

        {/* Products */}
        {!isLoading && !error && products.length > 0 && (
          <Swiper slidesPerView={5} spaceBetween={20} loop className="py-2 px-1">
            {products.slice(-7).map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (
          <p className="text-center text-sm text-zinc-500 py-10">
            محصولی برای نمایش وجود ندارد.
          </p>
        )}
      </div>
    </section>
  );
};

export default LatestProducts;