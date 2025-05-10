import 'package:flutter/material.dart';

class AppBarWithBackButton extends StatelessWidget
    implements PreferredSizeWidget {
  const AppBarWithBackButton({
    super.key,
  });

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);

  // final HomeController homeController = Get.put(HomeController());

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10),
      child: AppBar(
        backgroundColor: const Color(0xfff9fafc),
        elevation: 0,
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
            // Navigator.pushNamed(context, '/main-screen');
            // homeController.activeIndex.value = 0;
          },
          icon: const Icon(Icons.arrow_back_ios_new),
          color: Colors.black54,
        ),
        title: Padding(
          padding: const EdgeInsets.only(left: 25),
          child: Image.asset(
            'assets/images/Logo.png',
            scale: 1,
          ),
        ),
      ),
    );
  }
}
