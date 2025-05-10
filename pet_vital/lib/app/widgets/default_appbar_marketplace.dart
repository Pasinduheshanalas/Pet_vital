import 'package:flutter/material.dart';

class DefautAppBarMarketPlace extends StatelessWidget
    implements PreferredSizeWidget {
  final String cartQnt;
  const DefautAppBarMarketPlace({
    required this.cartQnt,
    super.key,
  });

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: AppBar(
        backgroundColor: const Color(0xfff9fafc),
        elevation: 0,
        leadingWidth: MediaQuery.of(context).size.width / 2.7,
        leading: Image.asset(
          'assets/images/Logo.png',
          scale: 0.1,
        ),
        actions: [
          IconButton(
            onPressed: () {},
            icon: const Icon(
              Icons.favorite_border,
              color: Colors.black54,
            ),
          ),
          Align(
            alignment: Alignment.centerRight,
            child: Stack(
              children: [
                IconButton(
                  onPressed: () {
                    // Navigator.pushNamed(context, '/cart');
                  },
                  icon: const Icon(
                    Icons.shopping_cart_outlined,
                    color: Colors.black54,
                  ),
                ),
                Positioned(
                  top: 8,
                  right: 5,
                  child: Container(
                    height: 15,
                    width: 15,
                    decoration: BoxDecoration(
                      color: Colors.red,
                      borderRadius: BorderRadius.circular(30),
                    ),
                    child: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Text(
                            cartQnt,
                            style: const TextStyle(
                              fontSize: 10,
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
