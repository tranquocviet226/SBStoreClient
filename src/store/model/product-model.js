class Product {
  constructor(
    _id,
    productId,
    productName,
    productPrice,
    productQuantity,
    productDate,
    productDescription,
    productImage,
  ) {
    this._id = _id;
    this.productId = productId;
    this.productName = productName;
    this.productPrice = productPrice;
    this.productQuantity = productQuantity;
    this.productDate = productDate;
    this.productDescription = productDescription;
    this.productImage = productImage;
  }
}

export default Product;
