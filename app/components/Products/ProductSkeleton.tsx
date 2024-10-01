const ProductSkeleton = () => (
  <div className="bg-gray-200 animate-pulse rounded-lg mx-auto shadow-xl p-2 h-60 w-full">
    <div className="h-32 bg-gray-300 rounded-xl mb-4"></div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/5"></div>
      <div className="h-3 bg-gray-300 rounded w-4/5"></div>
      <div className="h-4 bg-gray-300 rounded w-2/5 mt-4"></div>
    </div>
  </div>
);

export default ProductSkeleton;
