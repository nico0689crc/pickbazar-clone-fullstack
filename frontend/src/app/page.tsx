'use client';

import { useProducts } from "@/utils/react-query/products";

export default function Home() {
  const { error, isLoading, products } = useProducts();

  return (
    <>
      {isLoading && <h1>Loading</h1>}
      {!isLoading && error && <h1>Error</h1>}
      {(!isLoading && !error && products) && (
        products.map(product => (
          <div key={product.uuid}>
            <h3>{product.title} - Stock: {product.stock}</h3>
            <p>{product.description}</p>
          </div>
        ))
      )}
    </>
  );
}
