import 'package:flutter/material.dart';

import 'app/modules/auth/view/main_screen.dart';
import 'app/modules/login/view/login.dart';
import 'app/modules/login/view/signup.dart';
import 'app/modules/onboard/view/splash_screen.dart';

final Map<String, WidgetBuilder> routes = {
  '/': (BuildContext context) => const SplashScreen(),
  '/main-screen': (BuildContext context) => const MainScreen(),
  '/login': (BuildContext context) => LoginPage(),
  '/signup': (BuildContext context) => SignUpPage(),
  // '/homescreen': (BuildContext context) => HomePage(),
  // '/cart': (BuildContext context) => const CartScreen(),
  // '/delivery': (BuildContext context) => AddDelivery(),
  // '/order-success': (BuildContext context) => const OrderSuccess(),
};
