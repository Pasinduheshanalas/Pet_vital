import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../auth/view/auth_middleware.dart';
import '../../../../core/consts/colors.dart';
import '../../auth/view/main_screen.dart';
import '../../login/view/login.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  final AuthController _authController = Get.put(AuthController());
  bool animate = false;

  @override
  void initState() {
    super.initState();
    checkAuth();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.only(top: 175),
              child: Image.asset(
                'assets/images/sp1.png',
                scale: 1,
              ),
            ),
            Spacer(),
            Padding(
              padding: const EdgeInsets.only(bottom: 140),
              child: Column(
                children: const [
                  Text(
                    'Find Your Best \nVeterinarian For Pet',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        fontSize: 18,
                        letterSpacing: 3,
                        color: Colors.black87,
                        fontWeight: FontWeight.bold),
                  ),
                  SizedBox(height: 10),
                  Text(
                    'We will help you \nbest choose the your pet',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 12,
                      letterSpacing: 3,
                      color: PRIMARY_COLOR,
                    ),
                  ),
                  SizedBox(height: 5),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }

  Future checkAuth() async {
    await Future.delayed(
      const Duration(milliseconds: 2500),
    );
    await Future(() {
      if (_authController.isAuth == true) {
        Get.offAll(const MainScreen());
        // Get.offAll(LoginPage());
      } else {
        Get.offAll(LoginPage());
      }
    });
  }
}
