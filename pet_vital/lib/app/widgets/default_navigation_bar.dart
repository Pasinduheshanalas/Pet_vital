import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'dart:io' show Platform;

import '../../core/consts/colors.dart';

class DefaultNavigationBar extends StatefulWidget {
  final Function(int) getIndex;
  const DefaultNavigationBar({
    super.key,
    required this.getIndex,
  });

  @override
  State<DefaultNavigationBar> createState() => _DefaultNavigationBarState();
}

class _DefaultNavigationBarState extends State<DefaultNavigationBar> {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: PRIMARY_COLOR,
      child: Padding(
        padding: Platform.isIOS
            ? const EdgeInsets.symmetric(horizontal: 25, vertical: 12)
            : const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
        child: GNav(
          backgroundColor: PRIMARY_COLOR,
          color: Colors.white,
          activeColor: Colors.white,
          tabBackgroundColor: const Color.fromARGB(255, 83, 81, 210),
          gap: 5,
          padding: const EdgeInsets.all(15),
          onTabChange: (index) {
            widget.getIndex(index);
          },
          tabs: const [
            GButton(
              icon: Icons.home,
              text: 'Home',
              active: true,
              textStyle: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            GButton(
              icon: Icons.shopping_cart,
              text: 'Marketplace',
              textStyle: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            GButton(
              icon: Icons.chat,
              text: 'Heath Check',
              textStyle: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            GButton(
              icon: Icons.settings,
              text: 'Settings',
              textStyle: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
