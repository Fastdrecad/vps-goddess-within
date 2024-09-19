export function findSizeInProduct(product, selectedSize) {
  // Check if the product has a 'sizes' property and it is an array
  if (product?.sizes && Array.isArray(product?.sizes)) {
    // Find the specific size within the 'sizes' array
    const selectedSizeObject = product?.sizes.find(
      sizeObj => sizeObj?.size === selectedSize
    );

    // If the size is found, create a new object with the selected size and quantity
    if (selectedSizeObject) {
      const { size, quantity } = selectedSizeObject;
      return { size, quantity };
    } else {
      console.log(`Size '${selectedSize}' not found in the product.`);
      return null; // or handle the case where the size is not found
    }
  } else {
    console.log("Invalid product object or missing 'sizes' property.");
    return null; // or handle the case where the product object is invalid
  }
}

export const getProductWithSelectedSize = (product, selectedSize) => {
  const { sizes } = product;

  const selectedSizeObj = sizes.find(sizeObj => sizeObj.size === selectedSize);

  if (selectedSize) {
    return {
      ...product,
      sizes: [selectedSizeObj]
    };
  } else {
    return null;
  }
};
