import 'dart:io';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../../core/service/gemini-api.dart';
import '../models/appointment_model.dart';
import '../models/event_model.dart';
import '../models/vaccine_model.dart';

class HomeController extends GetxController {
  final RxList appointments = <Appointment>[].obs;
  final RxBool isAppointmentrListExpanded = false.obs;
  final RxBool isVaccineListExpanded = false.obs;
  final RxList vaccines = <Vaccine>[].obs;
  final RxList events = <EventsModel>[].obs;
  final RxBool isLoading = false.obs;
  final RxString remark = "".obs;
  final _db = FirebaseFirestore.instance;
  RxString result = ''.obs;
  var selectedImage = Rx<File?>(null);
  final RxString predictedValue = "".obs;

  //Get appointments
  Future<void> fetchAppointments(
    String petId,
    String petclinic,
  ) async {
    appointments.clear();
    isLoading.value = true;
    final QuerySnapshot<Map<String, dynamic>> querySnapshot = await _db
        .collection('Appointment')
        .where('PetId', isEqualTo: petId)
        .where('_vpetclinic', isEqualTo: petclinic)
        .where('Status', isNotEqualTo: "done")
        .get();
    isLoading.value = false;

    if (querySnapshot.docs.isNotEmpty) {
      appointments.addAll(querySnapshot.docs.map((doc) {
        final data = doc.data();
        return Appointment.fromMap(data);
      }).toList());
    } else {
      isLoading.value = false;
      debugPrint('No appointment document found');
    }
  }

  //-------------add new appointment
  addAppointment(Appointment appointment) async {
    await _db
        .collection("Appointment")
        .add(appointment.toMap())
        .whenComplete(() => Get.snackbar(
              'Success',
              'Success message',
              snackPosition: SnackPosition.BOTTOM,
              backgroundColor: Colors.green,
              titleText: const Text(
                'Success!',
                style: TextStyle(
                  color: Colors.white,
                ),
              ),
              messageText: const Text(
                'Your appointment received!',
                style: TextStyle(
                  color: Colors.white,
                ),
              ),
            ))
        .catchError(
      (err, StackTrace) {
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
            'Something went wrong',
            style: TextStyle(
              color: Colors.white,
            ),
          ),
        );
        debugPrint(err.toString());
      },
    );
  }

  //Get vaccines
  Future<void> fetchVaccines(
    String petId,
    String petclinic,
  ) async {
    vaccines.clear();
    isLoading.value = true;
    final QuerySnapshot<Map<String, dynamic>> querySnapshot = await _db
        .collection('Vaccination')
        .where('PetId', isEqualTo: petId)
        .where('_vpetclinic', isEqualTo: petclinic)
        .where('Status', isNotEqualTo: "DONE")
        .get();
    isLoading.value = false;

    if (querySnapshot.docs.isNotEmpty) {
      vaccines.addAll(querySnapshot.docs.map((doc) {
        final data = doc.data();
        return Vaccine.fromMap(data);
      }).toList());
    } else {
      isLoading.value = false;
      debugPrint('No vaccine document found');
    }
  }

  //Get events
  Future<void> fetchEvents(
    String vpetclinic,
  ) async {
    events.clear();
    isLoading.value = true;
    final QuerySnapshot<Map<String, dynamic>> querySnapshot = await _db
        .collection('Event')
        .where('_vpetclinic', isEqualTo: vpetclinic)
        .get();
    isLoading.value = false;

    if (querySnapshot.docs.isNotEmpty) {
      events.addAll(querySnapshot.docs.map((doc) {
        final data = doc.data();
        return EventsModel.fromMap(data);
      }).toList());
    } else {
      isLoading.value = false;
      debugPrint('No event document found');
    }
  }

  //Get generated results
  Future<String> generateResult(String requestedIssue) async {
    isLoading.value = true;
    result.value = await GeminiApi.getGeminiData(requestedIssue);
    isLoading.value = false;
    return result.value;
  }
}
