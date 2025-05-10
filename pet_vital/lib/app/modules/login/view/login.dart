import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../../core/consts/colors.dart';
import '../../auth/view/auth_middleware.dart';
import '../../home/controller/userController.dart';
import '../widgets/my_form_field.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  TextEditingController emailController = TextEditingController();
  TextEditingController pwdController = TextEditingController();

  final _formKey = GlobalKey<FormState>();
  AutovalidateMode _autoValidate = AutovalidateMode.disabled;
  final UserController userController = Get.put(UserController());
  final AuthController authController = Get.put(AuthController());

  bool isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Obx(
      () => userController.isLoading.value
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
          : SingleChildScrollView(
              child: Center(
                child: Padding(
                  padding: EdgeInsets.only(
                      top: MediaQuery.of(context).size.height / 8),
                  child: Column(
                    children: [
                      Image.asset(
                        'assets/images/loginLogo.png',
                        fit: BoxFit.contain,
                        scale: 2.3,
                      ),
                      const SizedBox(
                        height: 70,
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 30),
                        child: Form(
                          key: _formKey,
                          autovalidateMode: _autoValidate,
                          child: Column(
                            children: [
                              Column(
                                children: [
                                  MyFormField(
                                    enable: true,
                                    isObscureText: false,
                                    hint: "Enter email here",
                                    validator: (text) {
                                      if (text == null || text.isEmpty) {
                                        return 'Please enter your email';
                                      }
                                      return null;
                                    },
                                    icon: Icon(
                                      Icons.email,
                                      color: Colors.grey[500],
                                    ),
                                    controller: emailController,
                                  ),
                                  const SizedBox(
                                    height: 20,
                                  ),
                                  MyFormField(
                                    enable: true,
                                    isObscureText: true,
                                    hint: "Enter password here",
                                    validator: (text) {
                                      if (text == null || text.isEmpty) {
                                        return 'Please enter your password';
                                      }
                                      return null;
                                    },
                                    icon: Icon(
                                      Icons.password,
                                      color: Colors.grey[500],
                                    ),
                                    controller: pwdController,
                                  ),
                                ],
                              ),
                              const SizedBox(
                                height: 14,
                              ),
                              Row(
                                children: [
                                  // Column(
                                  //   children: const [Text("Remember me")],
                                  // ),
                                  const Spacer(),
                                  Column(
                                    children: [
                                      TextButton(
                                        onPressed: () {},
                                        child: const Text(
                                          'Forgot password?',
                                          style: TextStyle(
                                              color: Color(0xff1b434d)),
                                        ),
                                      )
                                    ],
                                  ),
                                ],
                              ),
                              const SizedBox(
                                height: 30,
                              ),
                              SizedBox(
                                width: MediaQuery.of(context).size.width,
                                height: 45,
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(30),
                                  child: ElevatedButton(
                                    onPressed: () {
                                      handleLogin();
                                    },
                                    style: ButtonStyle(
                                      backgroundColor:
                                          WidgetStateProperty.all<Color>(
                                              PRIMARY_COLOR),
                                    ),
                                    child: const Text(
                                      'Login',
                                      style: TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.white,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              const SizedBox(
                                height: 5,
                              ),
                              SizedBox(
                                width: MediaQuery.of(context).size.width,
                                height: 45,
                                child: ClipRRect(
                                  borderRadius: BorderRadius.circular(30),
                                  child: ElevatedButton(
                                    onPressed: () {
                                      userController
                                          .fetchAllPetCenters(context);
                                    },
                                    style: ButtonStyle(
                                      backgroundColor:
                                          WidgetStateProperty.all<Color>(
                                              Colors.white70),
                                    ),
                                    child: const Text(
                                      'Sign Up',
                                      style: TextStyle(
                                        color: PRIMARY_COLOR,
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
    )
        // ),
        );
  }

  handleLogin() async {
    String emailHandler = emailController.text;
    String passwordHandler = pwdController.text;

    if (_formKey.currentState!.validate()) {
      // setState(() {
      //   userController.isLoading.value = true;
      // });
      await userController.storeDocumentIdByEmail(emailHandler);
      await Future(() {
        AuthController.instance
            .userLogin(context, emailHandler, passwordHandler);
      });

      // setState(() {
      //   userController.isLoading.value = false;
      // });
    } else {
      setState(() => _autoValidate = AutovalidateMode.always);
    }
  }
}
