// ignore_for_file: use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:pet_vital/app/modules/home/controller/home_controller.dart';
import 'package:pet_vital/app/modules/home/models/appointment_model.dart';

import '../../../../core/consts/colors.dart';
import '../widgets/my_form_field.dart';

AppointmentDialog(
  BuildContext context,
  String title,
  String msg,
  // Function onConfirmed,
  Appointment appointment,
  HomeController homeController,
) {
  TextEditingController remarkController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  AutovalidateMode _autoValidate = AutovalidateMode.disabled;
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return Form(
        key: _formKey,
        autovalidateMode: _autoValidate,
        child: AlertDialog(
          title: Text(title),
          content: MyFormField(
              hint: "Remark",
              validator: (text) {
                if (text == null || text.isEmpty) {
                  return 'Please enter your reason.';
                }
                return null;
              },
              controller: remarkController,
              enable: true,
              isObscureText: false),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context)
                    .pop(false); // Dismiss the dialog and return false
              },
              child: const Text(
                'No',
                style: TextStyle(color: PRIMARY_COLOR),
              ),
            ),
            ElevatedButton(
              onPressed: () async {
                String remarkHandler = remarkController.text;
                if (_formKey.currentState!.validate()) {
                  Navigator.of(context).pop(true);
                  debugPrint("########");
                  debugPrint(remarkHandler);
                  await homeController.addAppointment(Appointment(
                    date: appointment.date,
                    petId: appointment.petId,
                    petName: appointment.petName,
                    remarks: remarkHandler,
                    status: appointment.status,
                    vpetclinic: appointment.vpetclinic,
                  ));
                  homeController.fetchAppointments(
                    appointment.petId.toString(),
                    appointment.vpetclinic.toString(),
                  );
                } else {
                  Get.snackbar(
                    'Error',
                    'Something went wrong',
                    snackPosition: SnackPosition.BOTTOM,
                    backgroundColor: Colors.red,
                    titleText: const Text(
                      'Error!',
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                    messageText: const Text(
                      'Please add your reason to appointment',
                      style: TextStyle(
                        color: Colors.white,
                      ),
                    ),
                  );
                }
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: PRIMARY_COLOR, // Use a specific accent color
              ),
              child: const Text(
                'Yes',
                style: TextStyle(color: BG_COLOR),
              ),
            )
          ],
        ),
      );
    },
  );
}
