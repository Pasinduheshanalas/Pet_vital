import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../../core/consts/colors.dart';
import '../../auth/view/auth_middleware.dart';
import '../../home/controller/userController.dart';
import '../../home/models/userModel.dart';
import '../widgets/my_form_field.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  TextEditingController nameController = TextEditingController();
  TextEditingController categoryController = TextEditingController();
  TextEditingController typController = TextEditingController();
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
                                  DropdownButtonFormField<String>(
                                    value: userController
                                            .selectedPetCenter.value.isEmpty
                                        ? null
                                        : userController
                                            .selectedPetCenter.value,
                                    isExpanded: true,
                                    hint: const Text("Select Pet Center"),
                                    items: userController.petCenterList
                                        .map((center) {
                                      return DropdownMenuItem<String>(
                                        value: center.id,
                                        child: Text(center.name ?? ''),
                                      );
                                    }).toList(),
                                    onChanged: (value) {
                                      setState(() {
                                        userController.selectedPetCenter.value =
                                            value ?? '';
                                      });
                                    },
                                    validator: (value) {
                                      if (value == null || value.isEmpty) {
                                        return 'Please select a pet center';
                                      }
                                      return null;
                                    },
                                    decoration: InputDecoration(
                                        isDense: true,
                                        filled: true,
                                        contentPadding:
                                            const EdgeInsets.symmetric(
                                                vertical: 10.0,
                                                horizontal: 10.0),
                                        fillColor: Colors.grey[100],
                                        prefixIcon: Icon(
                                          Icons.medical_information,
                                          color: Colors.grey[500],
                                        ),
                                        labelStyle: const TextStyle(
                                            color: Colors.black),
                                        focusedErrorBorder: OutlineInputBorder(
                                          borderSide: BorderSide(
                                              color: Colors.grey[300]!,
                                              width: 1.0),
                                          borderRadius:
                                              BorderRadius.circular(5.0),
                                        ),
                                        errorBorder: OutlineInputBorder(
                                          borderSide: BorderSide(
                                            color: Colors.red[300]!,
                                            width: 1.0,
                                          ),
                                          borderRadius:
                                              BorderRadius.circular(5.0),
                                        ),
                                        enabledBorder: OutlineInputBorder(
                                          borderSide: BorderSide(
                                              color: Colors.grey[100]!,
                                              width: 1.0),
                                          borderRadius:
                                              BorderRadius.circular(5.0),
                                        ),
                                        focusedBorder: OutlineInputBorder(
                                          borderSide: BorderSide(
                                              color: Colors.grey[500]!,
                                              width: 1.0),
                                          borderRadius:
                                              BorderRadius.circular(5.0),
                                        )),
                                  ),
                                  const SizedBox(height: 10),
                                  MyFormField(
                                    enable: true,
                                    isObscureText: false,
                                    hint: "Enter pet name here",
                                    validator: (text) {
                                      if (text == null || text.isEmpty) {
                                        return 'Please enter your pet name';
                                      }
                                      return null;
                                    },
                                    icon: Icon(
                                      Icons.pets,
                                      color: Colors.grey[500],
                                    ),
                                    controller: nameController,
                                  ),
                                  const SizedBox(
                                    height: 10,
                                  ),
                                  MyFormField(
                                    enable: true,
                                    isObscureText: false,
                                    hint: "Category (ex: dog or cat)",
                                    validator: (text) {
                                      if (text == null || text.isEmpty) {
                                        return 'Please select category';
                                      }
                                      return null;
                                    },
                                    icon: Icon(
                                      Icons.category,
                                      color: Colors.grey[500],
                                    ),
                                    controller: categoryController,
                                  ),
                                  const SizedBox(
                                    height: 10,
                                  ),
                                  // MyDatePicker(),
                                  MyFormField(
                                    enable: true,
                                    isObscureText: false,
                                    hint: "Enter pet variation",
                                    validator: (text) {
                                      if (text == null || text.isEmpty) {
                                        return 'Please enter pet variety name';
                                      }
                                      return null;
                                    },
                                    icon: Icon(
                                      Icons.date_range,
                                      color: Colors.grey[500],
                                    ),
                                    controller: typController,
                                  ),
                                  const SizedBox(
                                    height: 10,
                                  ),
                                  MyFormField(
                                    enable: true,
                                    isObscureText: false,
                                    hint: "Enter email here",
                                    validator: (text) {
                                      if (text == null || text.isEmpty) {
                                        return 'Please enter your email name';
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
                                    height: 10,
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
                                      handleSignUp();
                                    },
                                    style: ButtonStyle(
                                      backgroundColor:
                                          MaterialStateProperty.all<Color>(
                                              PRIMARY_COLOR),
                                    ),
                                    child: const Text(
                                      'Sign up',
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
                                      Navigator.pushNamed(context, "/login");
                                    },
                                    style: ButtonStyle(
                                      backgroundColor:
                                          MaterialStateProperty.all<Color>(
                                              Colors.white70),
                                    ),
                                    child: const Text(
                                      'Login',
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
                      // Align(
                      //   alignment: Alignment.bottomRight,
                      //   child: Image.asset(
                      //     'assets/images/loginBottomDecorator.png',
                      //     fit: BoxFit.contain,
                      //     scale: 1.1,
                      //   ),
                      // ),
                    ],
                  ),
                )),
              ),
      ),
    );
  }

  handleSignUp() async {
    String nameHandler = nameController.text;
    String categoryHandler = categoryController.text;
    String emailHandler = emailController.text;
    String passwordHandler = pwdController.text;
    String typeHandler = typController.text;

    if (_formKey.currentState!.validate()) {
      // setState(() {
      //   isLoading = true;
      // });
      await Future(() async {
        // authController.userSignUp(emailHandler, passwordHandler);
        userController.addUser(
          context,
          User(
            petName: nameHandler,
            category: categoryHandler,
            type: typeHandler,
            vpetclinic: userController.selectedPetCenter.value,
            vaccinationHistory: "",
            specialRemarks: "",
            upcommingVdates: "",
            email: emailHandler,
            password: passwordHandler,
          ),
        );
      });
      // setState(() {
      //   isLoading = false;
      // });
    } else {
      setState(() => _autoValidate = AutovalidateMode.always);
    }
  }
}
