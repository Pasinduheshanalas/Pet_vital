class Product {
  // String? id;
  String? price;
  String? productId;
  String? productImageUrl;
  String? productName;
  String? quantity;
  String? status;
  String? vpetclinic;

  Product({
    // this.id,
    this.price,
    this.productId,
    this.productImageUrl,
    this.productName,
    this.quantity,
    this.status,
    this.vpetclinic,
  });

  Map<String, dynamic> toMap() {
    return {
      // 'id': id,
      'Price': price,
      'ProductId': productId,
      'ProductImageUrl': productImageUrl,
      'ProductName': productName,
      'Quantity': quantity,
      'Status': status,
      '_vpetclinic': vpetclinic,
    };
  }

  Product.fromMap(Map<String, dynamic> item) {
    // id = Appointment['id'];
    price = item['Price'];
    productId = item['ProductId'];
    productImageUrl = item['ProductImageUrl'];
    productName = item['ProductName'];
    quantity = item['Quantity'];
    status = item['Status'];
    vpetclinic = item['_vpetclinic'];
  }
}
