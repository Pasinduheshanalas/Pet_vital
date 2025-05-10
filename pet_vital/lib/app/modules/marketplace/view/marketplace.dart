import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:pet_vital/core/consts/constants.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../../core/consts/colors.dart';
import '../../../widgets/default_appbar_marketplace.dart';
import '../../../widgets/product_card.dart';
import '../controller/productController.dart';
import '../widgets/category_list.dart';

class Marketplace extends StatefulWidget {
  const Marketplace({super.key});

  @override
  State<Marketplace> createState() => _MarketplaceState();
}

class _MarketplaceState extends State<Marketplace> {
  final ProductController productController = Get.put(ProductController());

  @override
  void initState() {
    getData();
    super.initState();
  }

  getData() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await productController.fetchProducts(
      prefs.getString(PET_CENTER).toString(),
    );
    // await cartController.fetchCart(prefs.getString(UUID).toString());
    debugPrint("+++++++++++++");
    debugPrint(productController.productList.length.toString());
    // debugPrint(cartController.cartList.length.toString());
    debugPrint("+++++++++++++");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: DefautAppBarMarketPlace(
        cartQnt: '2',
      ),
      body: Obx(
        () => productController.isLoading.value == true
            ? Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: const [
                    CircularProgressIndicator(
                      color: PRIMARY_COLOR,
                      backgroundColor: Colors.black12,
                    ),
                  ],
                ), // Show loading indicator
              )
            : SizedBox(
                width: MediaQuery.of(context).size.width,
                child: RefreshIndicator(
                  onRefresh: () async {},
                  child: SingleChildScrollView(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 10,
                        vertical: 10,
                      ),
                      child: Column(
                        children: [
                          //default app banner
                          SizedBox(
                            width: MediaQuery.of(context).size.width,
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(8),
                              child: Image.asset(
                                'assets/images/defaultMarketplaceMainBanner.png',
                                scale: 1,
                              ),
                            ),
                          ),

                          const SizedBox(
                            height: 15,
                          ),

                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 10),
                            child: Column(
                              children: [
                                Row(
                                  children: [
                                    const Text(
                                      "Categories",
                                      style: TextStyle(
                                        fontSize: 18,
                                        fontWeight: FontWeight.w500,
                                        color: TITLE_COLOR,
                                      ),
                                    ),
                                    const Spacer(),
                                    TextButton(
                                      onPressed: () {},
                                      child: const Text(
                                        "more >",
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.w500,
                                          color: PRIMARY_COLOR,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                                const CategoryList(),
                                const SizedBox(
                                  height: 15,
                                ),
                                featuredItems(),
                              ],
                            ),
                          )
                        ],
                      ),
                    ),
                  ),
                ),
              ),
      ),
    );
  }

  Widget featuredItems() {
    return Obx(() {
      if (productController.productList.isNotEmpty) {
        return Column(
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.width,
              child: Row(
                children: [
                  const Text(
                    "Featured items",
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w500,
                      color: TITLE_COLOR,
                    ),
                  ),
                  const Spacer(),
                  TextButton(
                    onPressed: () {},
                    child: const Text(
                      "Shop more >",
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w500,
                        color: PRIMARY_COLOR,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            GridView.builder(
              gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                childAspectRatio: MediaQuery.of(context).size.width / 560,
                crossAxisCount: 2,
              ),
              physics: const NeverScrollableScrollPhysics(),
              shrinkWrap: true,
              itemCount: productController.productList.length,
              itemBuilder: (BuildContext context, index) {
                return Padding(
                  padding: const EdgeInsets.all(5),
                  child: ProductCard(
                    productId: productController.productList[index].productId,
                    productName:
                        productController.productList[index].productName,
                    productPrice: productController.productList[index].price,
                    assetUrl:
                        productController.productList[index].productImageUrl,
                    qnty: '50',
                  ),
                );
              },
            )
          ],
        );
      } else {
        return Container();
      }
    });
  }
}
