import React from "react";

const products = [
  {
    id: 1,
    name: "Yellow Mango Juice",
    price: "From R0.81 incl. vat",
    isNew: true,
    image: "/images/yellow.png",
  },
  {
    id: 2,
    name: "Green Citrus Juice",
    price: "From R2.07 incl. vat",
    isNew: true,
    image: "/images/bottle-green.png",
  },
  {
    id: 3,
    name: "Red Strawberry Juice",
    price: "From R2.30 incl. vat",
    isNew: true,
    image: "/images/bottle-red.png",
  },
  {
    id: 4,
    name: "JoJo Flavor Trio",
    price: "From R5.44 incl. vat",
    isNew: true,
    image: "/images/trio.png",
  },
];

export default function NewProductsSection() {
  return (
    <section className="bg-primary-bg py-24 px-6 lg:px-[6vw]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-4xl md:text-5xl tracking-tight text-primary-text font-light">
            New Products
          </h2>
          <button className="rounded border border-primary-text/20 px-6 py-2 text-sm text-primary-text transition-colors hover:bg-primary-text hover:text-primary-bg">
            Shop now
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative mb-4 aspect-square overflow-hidden rounded-md bg-[#f7f5f0]">
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* NEW Badge */}
                {product.isNew && (
                  <div className="absolute right-0 top-0 bg-[#6b705c] px-3 py-1 text-xs font-bold tracking-wider text-white [writing-mode:vertical-rl] rotate-180">
                    NEW
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-primary-text">
                  {product.name}
                </h3>
                <p className="text-sm text-primary-text/70">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
