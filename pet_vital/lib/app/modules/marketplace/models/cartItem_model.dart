class CartItem {
  // String? id;
  String? price;
  String? productId;
  String? productImageUrl;
  String? productName;
  int? qnt;
  int? newProductQnt;
  String? vpetclinic;
  String? petId;

  CartItem({
    // this.id,
    this.price,
    this.productId,
    this.productImageUrl,
    this.productName,
    this.qnt,
    this.newProductQnt,
    this.vpetclinic,
    this.petId,
  });

  Map<String, dynamic> toMap() {
    return {
      // 'id': id,
      'Price': price,
      'ProductId': productId,
      'ProductImageUrl': productImageUrl,
      'ProductName': productName,
      'CartItemQuantity': qnt,
      'NewProductQuantity': newProductQnt,
      '_vpetclinic': vpetclinic,
      'petId': petId,
    };
  }

  CartItem.fromMap(Map<String, dynamic> item) {
    // id = Appointment['id'];
    price = item['Price'];
    productId = item['ProductId'];
    productImageUrl = item['ProductImageUrl'];
    productName = item['ProductName'];
    qnt = item['CartItemQuantity'];
    newProductQnt = item['NewProductQuantity'];
    vpetclinic = item['_vpetclinic'];
    petId = item['petId'];
  }
}
