import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../models/cartItem_model.dart';
import '../models/product_model.dart';

class ProductController extends GetxController {
  final RxList productList = <Product>[].obs;
  final RxBool isLoading = false.obs;
  final _db = FirebaseFirestore.instance;

  //Get products
  Future<void> fetchProducts(String petclinic) async {
    productList.clear();
    isLoading.value = true;
    final QuerySnapshot<Map<String, dynamic>> querySnapshot = await _db
        .collection('Product')
        .where('_vpetclinic', isEqualTo: petclinic)
        .where('Status', isEqualTo: "ACTIVE")
        .get();
    isLoading.value = false;

    if (querySnapshot.docs.isNotEmpty) {
      productList.addAll(
        querySnapshot.docs.map((doc) {
          final data = doc.data();
          return Product.fromMap(data);
        }).toList(),
      );
    } else {
      isLoading.value = false;
      debugPrint('No vaccine document found');
    }
  }

  //-------------add to cart
  addToCart(CartItem cartItem) async {
    isLoading.value = true;
    final QuerySnapshot<Map<String, dynamic>> querySnapshot = await _db
        .collection("Cart")
        .where('ProductId', isEqualTo: cartItem.productId)
        .get();

    if (querySnapshot.docs.isNotEmpty) {
      final DocumentSnapshot cartItemDoc = querySnapshot.docs.first;
      final String docId = cartItemDoc.id;
      final int qnt = cartItemDoc['CartItemQuantity'] + 1;
      final int newPrQnt = cartItemDoc['NewProductQuantity'] - 1;

      //update existing item
      await _db
          .collection("Cart")
          .doc(docId)
          .update({'CartItemQuantity': qnt, 'NewProductQuantity': newPrQnt})
          .whenComplete(
            () => Get.snackbar(
              'Success',
              'Success message',
              snackPosition: SnackPosition.BOTTOM,
              backgroundColor: Colors.green,
              titleText: const Text(
                'Success!',
                style: TextStyle(color: Colors.white),
              ),
              messageText: const Text(
                'Item added to the cart!',
                style: TextStyle(color: Colors.white),
              ),
            ),
          )
          .catchError((err, StackTrace) {
            debugPrint(err.toString());
          });
    } else {
      await _db
          .collection("Cart")
          .add(cartItem.toMap())
          .whenComplete(
            () => Get.snackbar(
              'Success',
              'Success message',
              snackPosition: SnackPosition.BOTTOM,
              backgroundColor: Colors.green,
              titleText: const Text(
                'Success!',
                style: TextStyle(color: Colors.white),
              ),
              messageText: const Text(
                'Item added to the cart!',
                style: TextStyle(color: Colors.white),
              ),
            ),
          )
          .catchError((err, StackTrace) {
        Get.snackbar(
          'Error',
          'Something went wrong',
          snackPosition: SnackPosition.BOTTOM,
          backgroundColor: Colors.red,
          titleText: const Text(
            'Error!',
            style: TextStyle(color: Colors.white),
          ),
          messageText: const Text(
            'Something went wrong',
            style: TextStyle(color: Colors.white),
          ),
        );
        debugPrint(err.toString());
      });
    }

    isLoading.value = false;
  }

  //-------------reduce product qnt
  Future<void> reduceProductQnt(int quantity, int qnt, String id) async {
    isLoading.value = true;
    final QuerySnapshot<Map<String, dynamic>> querySnapshot =
        await _db.collection("Product").where('ProductId', isEqualTo: id).get();
    if (querySnapshot.docs.isNotEmpty) {
      final DocumentSnapshot productDoc = querySnapshot.docs.first;
      final String docId = productDoc.id;
      final int newQnt = quantity - qnt;
      String StatusNew = "ACTIVE";
      if (newQnt == 0) {
        StatusNew = "INACTIVE";
      }

      await _db.collection("Product").doc(docId).update({
        'Quantity': newQnt.toString(),
        'Status': StatusNew
      }).catchError((err, StackTrace) {
        // Get.snackbar(
        //   'Error',
        //   'Something went wrong',
        //   snackPosition: SnackPosition.BOTTOM,
        //   backgroundColor: Colors.red,
        //   titleText: const Text(
        //     'Error!',
        //     style: TextStyle(
        //       color: Colors.white,
        //     ),
        //   ),
        //   messageText: const Text(
        //     'Something went wrong',
        //     style: TextStyle(
        //       color: Colors.white,
        //     ),
        //   ),
        // );
        debugPrint(err.toString());
      });
    }
    isLoading.value = false;
  }
}
