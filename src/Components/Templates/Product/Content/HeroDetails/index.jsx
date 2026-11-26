
import ProductColors from "./Fragments/ProductColors";
import ProductVariants from "./Fragments/ProductVariants";
import UsefulButtons from "./Fragments/UsefulButtons";

const HeroDetails = ({ name, description, customFields }) => {
  return (
    <section id="product-hero-details">
      <div className="col-span-6 w-full">
        <div className="flex items-center justify-end mb-10">
          <UsefulButtons />
        </div>

        <div className="grid grid-cols-2 items-start gap-6">
          <div className="h-[450px] rounded-2xl bg-zinc-900/50 border border-zinc-800 p-4">
            <img
              src="/assets/static/product1.png"
              alt="Product"
              className="size-full object-contain"
            />
          </div>

          <div className="flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="font-bold text-xl text-zinc-100">
                  {name}
                </h1>

                <p className="text-zinc-400 text-xs leading-7">
                  {description}
                </p>
              </div>

              {/* <ProductColors /> */}
            </div>

            <ProductVariants fields={customFields} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDetails;
