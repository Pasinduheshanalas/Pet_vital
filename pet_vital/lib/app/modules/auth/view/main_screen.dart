import 'package:flutter/material.dart';
import 'package:pet_vital/app/modules/health-check/view/heath_check.dart';
import 'package:pet_vital/app/modules/marketplace/view/marketplace.dart';

import '../../../widgets/default_navigation_bar.dart';
import '../../home/view/home.dart';
import '../../settings/view/settings.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;
  static List<Widget> _widgetOptions = <Widget>[
    HomePage(),
    Marketplace(),
    HeathCheck(),
    Settings(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: DefaultNavigationBar(
        getIndex: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
      ),
      body: _widgetOptions.elementAt(_selectedIndex),
    );
  }
}
