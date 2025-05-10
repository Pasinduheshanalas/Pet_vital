import 'package:flutter/material.dart';

import 'my_form_field.dart';

class ViewHealth extends StatefulWidget {
  final String requestedIssue;
  const ViewHealth({super.key, required this.requestedIssue});

  @override
  State<ViewHealth> createState() => _ViewHealthState();
}

class _ViewHealthState extends State<ViewHealth> {
  TextEditingController requestedIssueController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  AutovalidateMode _autoValidate = AutovalidateMode.disabled;

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: const Icon(Icons.arrow_back_ios_new),
        ),
        title: const Text("Check your pet health"),
      ),
      body:
          // Obx(
          //   () => homeController.isLoading.value == true
          //       ? Center(
          //           child: Column(
          //             mainAxisAlignment: MainAxisAlignment.center,
          //             children: const [
          //               CircularProgressIndicator(
          //                 color: PRIMARY_COLOR,
          //                 backgroundColor: Colors.black12,
          //               ),
          //             ],
          //           ), // Show loading indicator
          //         )
          //       :
          Padding(
        padding: const EdgeInsets.all(10),
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                "Enter pet issue that you need to clarify",
                style: TextStyle(fontSize: 16),
              ),
              const SizedBox(height: 15),
              Form(
                  key: _formKey,
                  autovalidateMode: _autoValidate,
                  child: Column(
                    children: [
                      const SizedBox(height: 10),
                      MyFormField(
                        enable: true,
                        isObscureText: false,
                        hint: "Pet Issue",
                        validator: (text) {
                          if (text == null || text.isEmpty) {
                            return 'Please enter your pet issue';
                          }
                          return null;
                        },
                        controller: requestedIssueController,
                        icon: const Icon(Icons.search),
                      ),
                    ],
                  )),
              const SizedBox(height: 30),
              SizedBox(
                width: MediaQuery.of(context).size.width,
                height: 50,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.black,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                  ),
                  onPressed: () async {
                    // generateResult();
                  },
                  child: const Text(
                    "Check result",
                    style: TextStyle(fontSize: 16, color: Colors.white),
                  ),
                ),
              ),

              //result
              const SizedBox(height: 20),
              // Obx(
              //   () => homeController.result.value == ''
              //       ? Center(
              //           child: Container(),
              //         )
              //       : Text(
              //           homeController.result.value.toString(),
              //           style: const TextStyle(fontSize: 16),
              //         ),
              // ),
            ],
          ),
        ),
      ),
      // ),
    );
  }
}
