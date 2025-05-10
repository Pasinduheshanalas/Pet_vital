// ignore_for_file: use_build_context_synchronously

import 'dart:convert';

import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:pet_vital/app/modules/home/models/pet_center_model.dart';
import 'package:pet_vital/app/modules/home/models/userModel.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../../core/consts/constants.dart';

class UserController extends GetxController {
  final RxList userList = <User>[].obs;
  final RxList petCenterList = <PetCenterModel>[].obs;
  final RxString userName = "".obs;
  final RxDouble userPoints = 0.0.obs;
  final RxBool isLoading = false.obs;
  final _db = FirebaseFirestore.instance;
  final RxString selectedPetCenter = ''.obs;

  //--------------Add new user
  addUser(BuildContext context, User user) async {
    isLoading.value = true;
    var url = Uri.parse('${BASE_URL}pet-register');
    late http.Response res;
    final dataJson = jsonEncode(user.toMap());
    try {
      ///--------send POST request
      res = await http.post(url, body: dataJson, headers: {
        'Content-Type': 'application/json',
      });

      //check response status code
      if (res.statusCode == 200) {
        //navigate to login
        Navigator.pushNamed(context, "/login");

        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text(
            'User signup successful!',
            style: TextStyle(
              color: Colors.white,
            ),
          ),
          duration: Duration(milliseconds: 2000),
          backgroundColor: Colors.green,
          padding: EdgeInsets.symmetric(horizontal: 8, vertical: 15),
          closeIconColor: Colors.blueGrey,
        ));

        isLoading.value = false;
        selectedPetCenter.value = '';
      } else {
        debugPrint(
            'POST request failed with status code : ${res.statusCode} ${res.body}');
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
          content: Text(
            'Something went wrong!',
            style: TextStyle(
              color: Colors.white,
            ),
          ),
          duration: Duration(milliseconds: 2000),
          backgroundColor: Colors.red,
          padding: EdgeInsets.symmetric(horizontal: 8, vertical: 15),
          closeIconColor: Colors.blueGrey,
        ));

        isLoading.value = false;
      }
    } catch (err) {
      debugPrint('***********');
      debugPrint('Something went wrong $err');
      debugPrint('***********');

      isLoading.value = false;
    }
  }

  // addNewUser(User user) async {
  //   await _db
  //       .collection("user")
  //       .add(user.toMap())
  //       .whenComplete(() => Get.snackbar(
  //             'Success',
  //             'Success message',
  //             snackPosition: SnackPosition.BOTTOM,
  //             backgroundColor: Colors.green,
  //             titleText: const Text(
  //               'Success!',
  //               style: TextStyle(
  //                 color: Colors.white,
  //               ),
  //             ),
  //             messageText: const Text(
  //               'Registered successfully! Please login to continue.',
  //               style: TextStyle(
  //                 color: Colors.white,
  //               ),
  //             ),
  //           ))
  //       .catchError(
  //     (err, StackTrace) {
  //       Get.snackbar(
  //         'Error',
  //         'Something went wrong',
  //         snackPosition: SnackPosition.BOTTOM,
  //         backgroundColor: Colors.red,
  //         titleText: const Text(
  //           'Error!',
  //           style: TextStyle(
  //             color: Colors.white,
  //           ),
  //         ),
  //         messageText: const Text(
  //           'Something went wrong',
  //           style: TextStyle(
  //             color: Colors.white,
  //           ),
  //         ),
  //       );
  //       debugPrint(err.toString());
  //     },
  //   );
  // }

  //Get doc id
  Future<void> storeDocumentIdByEmail(String email) async {
    isLoading.value = true;
    final QuerySnapshot<Map<String, dynamic>> querySnapshot =
        await _db.collection('pet').where('email', isEqualTo: email).get();
    isLoading.value = false;

    if (querySnapshot.docs.isNotEmpty) {
      final DocumentSnapshot userDoc = querySnapshot.docs.first;
      final String docId = userDoc.id;
      final String userName = userDoc['PetName'];
      final String petCenter = userDoc['_vpetclinic'];
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString(UUID, docId);
      await prefs.setString(EMAIL, email);
      await prefs.setString(USER_NAME, userName);
      await prefs.setString(PET_CENTER, petCenter);
      debugPrint("#################");
      debugPrint('Document ID stored in shared preferences: $docId');
      debugPrint('Name stored in shared preferences: $userName');
      debugPrint(prefs.getString(UUID));
      debugPrint(prefs.getString(EMAIL));
      debugPrint(prefs.getString(USER_NAME));
      debugPrint(prefs.getString(PET_CENTER));
      debugPrint("#################");
    } else {
      debugPrint('No document found with email: $email');
    }
  }

  Future<void> fetchAllPetCenters(BuildContext context) async {
    try {
      isLoading.value = true;
      var url = Uri.parse('${BASE_URL}petcenters/all');
      final http.Response response = await http.get(url);

      if (response.statusCode == 200) {
        // Parse the JSON response
        final List<dynamic> data = json.decode(response.body);

        // Map the response to a list of User objects
        petCenterList.value = data.map((item) {
          return PetCenterModel(
            id: item['id'],
            name: item['name'],
          );
        }).toList();

        debugPrint(
            "✅ Pet centers fetched successfully: ${petCenterList.length}");
        Navigator.pushNamed(context, "/signup");
      } else {
        debugPrint(
            "❌ Failed to fetch pet centers. Status code: ${response.statusCode}");
        Navigator.pushNamed(context, "/signup");
      }
    } catch (e) {
      debugPrint("❌ Error fetching pet centers: $e");
      Navigator.pushNamed(context, "/signup");
    } finally {
      isLoading.value = false;
    }
  }
}
