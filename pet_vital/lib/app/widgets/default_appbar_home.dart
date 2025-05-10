import 'package:flutter/material.dart';

class DefautAppBarHome extends StatelessWidget implements PreferredSizeWidget {
  const DefautAppBarHome({
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
          scale: 5,
        ),
        actions: [
          Stack(
            children: [
              IconButton(
                onPressed: () {},
                icon: Image.asset(
                  'assets/images/profile.png',
                  scale: 1,
                ),
              ),
              Positioned(
                bottom: 15,
                right: 5,
                child: Container(
                  height: 10,
                  width: 10,
                  decoration: BoxDecoration(
                    color: Colors.green,
                    borderRadius: BorderRadius.circular(30),
                  ),
                ),
              ),
            ],
          )
        ],
      ),
    );
  }
}
