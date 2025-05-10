import 'dart:convert';
import 'dart:io';

import 'package:date_picker_timeline/date_picker_timeline.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_connect/http/src/utils/utils.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../../core/consts/colors.dart';
import '../../../../core/consts/constants.dart';
import '../../../widgets/default_appbar_home.dart';
import '../controller/home_controller.dart';
import '../models/appointment_model.dart';
import '../widgets/appointment_box.dart';
import '../widgets/appointment_dialog.dart';
import '../widgets/my_form_field.dart';
import '../widgets/special_box_event.dart';
import '../widgets/special_box_next_dos.dart';
import '../widgets/viewHealth.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  DateTime _selectedDate = DateTime.now();
  final HomeController homeController = Get.put(HomeController());
  TextEditingController searchController = TextEditingController();
  File? imageFile;
  bool isUploading = false;

  @override
  void initState() {
    getData();
    super.initState();
  }

  getData() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await homeController.fetchAppointments(
      prefs.getString(UUID).toString(),
      prefs.getString(PET_CENTER).toString(),
    );
    await homeController.fetchVaccines(
      prefs.getString(UUID).toString(),
      prefs.getString(PET_CENTER).toString(),
    );
    // await homeController.fetchEvents(
    //   prefs.getString(PET_CENTER).toString(),
    // );
    // await cartController.fetchCart(prefs.getString(UUID).toString());
    debugPrint("****************");
    debugPrint(homeController.appointments.length.toString());
    debugPrint(homeController.vaccines.length.toString());
    debugPrint(homeController.events.length.toString());
    debugPrint("****************");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const DefautAppBarHome(),
      body: SizedBox(
        width: MediaQuery.of(context).size.width,
        child: RefreshIndicator(
          onRefresh: () async {
            await getData();
          },
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.symmetric(
                horizontal: 10,
                vertical: 10,
              ),
              child: Column(
                children: [
                  //default app banner
                  SizedBox(
                    width: MediaQuery.of(context).size.width,
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: Image.asset(
                        'assets/images/defaultMarketplaceMainBanner.png',
                        scale: 1,
                      ),
                    ),
                  ),

                  const SizedBox(
                    height: 25,
                  ),

                  //appointments
                  Column(
                    children: [
                      const SizedBox(
                        height: 5,
                      ),
                      // Row(
                      //   children: [
                      //     Flexible(
                      //       flex: 8,
                      //       child: SizedBox(
                      //         width: MediaQuery.of(context).size.width,
                      //         child: MyFormField(
                      //           enable: true,
                      //           isObscureText: false,
                      //           hint: "Search for pet health",
                      //           validator: (_) {
                      //             //validator func goes here
                      //           },
                      //           controller: searchController,
                      //           icon: const Icon(Icons.search),
                      //         ),
                      //       ),
                      //     ),
                      //     const SizedBox(
                      //       width: 10,
                      //     ),
                      //     Flexible(
                      //       flex: 1,
                      //       child: SizedBox(
                      //         width: MediaQuery.of(context).size.width /
                      //             9, // Adjusted the width
                      //         child: IconButton(
                      //           style: ElevatedButton.styleFrom(
                      //             backgroundColor: PRIMARY_COLOR_LITE,
                      //             shape: RoundedRectangleBorder(
                      //               borderRadius: BorderRadius.circular(8),
                      //             ),
                      //             side: const BorderSide(
                      //                 color: PRIMARY_COLOR, width: 1.5),
                      //           ),
                      //           onPressed: () async {
                      //             if (searchController.text != "") {
                      //               Navigator.of(context)
                      //                   .push(MaterialPageRoute(
                      //                 builder: (context) => ViewHealth(
                      //                     requestedIssue:
                      //                         searchController.text.toString()),
                      //               ));
                      //             } else {
                      //               return;
                      //             }
                      //           },
                      //           icon: const Icon(
                      //             Icons.upload,
                      //             color: Colors.white,
                      //           ),
                      //         ),
                      //       ),
                      //     ),
                      //   ],
                      // ),

                      //-----Appointments
                      SizedBox(
                        width: MediaQuery.of(context).size.width,
                        child: const Text(
                          "Make your appointments",
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w500,
                            color: TITLE_COLOR,
                          ),
                        ),
                      ),

                      const SizedBox(
                        height: 10,
                      ),

                      //Date Picker
                      SizedBox(
                        width: MediaQuery.of(context).size.width,
                        height: 100,
                        child: DatePicker(
                          DateTime.now(),
                          initialSelectedDate: DateTime.now(),
                          selectionColor: PRIMARY_COLOR,
                          selectedTextColor: Colors.white,
                          dateTextStyle: const TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.w500,
                            color: TITLE_COLOR,
                          ),
                          monthTextStyle: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.bold,
                            color: Color(0xffa1a1a1),
                          ),
                          dayTextStyle: const TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.bold,
                            color: Color(0xffa1a1a1),
                          ),
                          onDateChange: (date) async {
                            final SharedPreferences prefs =
                                await SharedPreferences.getInstance();
                            // New date selected
                            setState(() {
                              _selectedDate = date;
                              String formattedDate = DateFormat('yyyy-MM-dd')
                                  .format(_selectedDate);

                              AppointmentDialog(
                                context,
                                "Make Appointment",
                                "Test",
                                Appointment(
                                  date: formattedDate,
                                  petId: prefs.getString(UUID),
                                  petName: prefs.getString(USER_NAME),
                                  status: "PENDING",
                                  vpetclinic: prefs.getString(PET_CENTER),
                                ),
                                homeController,
                              );
                            });
                          },
                        ),
                      ),

                      const SizedBox(
                        height: 15,
                      ),

                      //Active appointments section
                      fetchAppointment(),

                      //Next dos section
                      fetchVacc(context),

                      //Events section
                      fetchEv(context),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: PRIMARY_COLOR,
        child: const Icon(
          Icons.add,
          color: Colors.white,
        ),
        onPressed: () {
          bottomSheet(context);
        },
      ),
    );
  }

  //Appointments
  Widget fetchAppointment() {
    return Obx(() {
      if (homeController.appointments.isNotEmpty) {
        return Column(
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.width,
              child: Row(
                children: [
                  const Text(
                    "Active Appointments",
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w500,
                      color: TITLE_COLOR,
                    ),
                  ),
                  const Spacer(),
                  TextButton(
                    onPressed: () {
                      homeController.isAppointmentrListExpanded.value =
                          !homeController.isAppointmentrListExpanded.value;
                    },
                    child: Text(
                      homeController.appointments.length > 2
                          ? homeController.isAppointmentrListExpanded.value
                              ? "show less >"
                              : "show more >"
                          : "",
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w500,
                        color: PRIMARY_COLOR,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(
              height: 5,
            ),
            ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: homeController.isAppointmentrListExpanded.value
                    ? homeController.appointments.length
                    : homeController.appointments.length > 2
                        ? 2
                        : homeController.appointments.length,

                // homeController.appointments.length > 2
                //     ? 2
                //     : homeController.appointments.length,
                itemBuilder: (_, index) {
                  return Column(children: [
                    AppointmentBox(
                      appointmentName:
                          homeController.appointments[index].remarks,
                      appointmentDate: homeController.appointments[index].date,
                      status: "${homeController.appointments[index].status}"
                          .toUpperCase(),
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                  ]);
                }),
          ],
        );
      } else {
        return Center(
          child: Text(
            "- No active appointments -",
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w400,
              color: TITLE_COLOR,
            ),
          ),
        ); // Return an empty container if there are no appointments
      }
    });
  }

//Vaccines
  Widget fetchVacc(BuildContext context) {
    return Obx(() {
      if (homeController.vaccines.isNotEmpty) {
        return Column(
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.width,
              child: Row(
                children: [
                  const Text(
                    "Next Dos",
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w500,
                      color: TITLE_COLOR,
                    ),
                  ),
                  const Spacer(),
                  TextButton(
                    onPressed: () {},
                    child: Text(
                      homeController.vaccines.length > 2
                          ? homeController.isVaccineListExpanded.value
                              ? "show less >"
                              : "show more >"
                          : "",
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w500,
                        color: PRIMARY_COLOR,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            SizedBox(
              width: MediaQuery.of(context).size.width,
              child: GridView.builder(
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      childAspectRatio: MediaQuery.of(context).size.width / 200,
                      crossAxisCount: 2,
                      crossAxisSpacing: 10),
                  physics: const NeverScrollableScrollPhysics(),
                  shrinkWrap: true,
                  itemCount: 2,
                  itemBuilder: (BuildContext context, int index) {
                    return SpecialBoxNextDos(
                      bgColor: DOS_COLOR,
                      assetUrl: 'assets/images/vaccine.png',
                      title: homeController.vaccines[index].vaccine,
                      date: homeController.vaccines[index].date,
                    );
                  }),
            ),
            const SizedBox(
              height: 15,
            ),
          ],
        );
      } else {
        return Container();
      }
    });
  }

//Events
  Widget fetchEv(BuildContext context) {
    return Obx(() {
      if (homeController.events.isNotEmpty) {
        return Column(
          children: [
            SizedBox(
              width: MediaQuery.of(context).size.width,
              child: Column(
                children: [
                  Row(
                    children: [
                      const Text(
                        "Events",
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w500,
                          color: TITLE_COLOR,
                        ),
                      ),
                      const Spacer(),
                      TextButton(
                        onPressed: () {},
                        child: const Text(
                          "view more >",
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w500,
                            color: PRIMARY_COLOR,
                          ),
                        ),
                      ),
                    ],
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width,
                    child: const Text(
                      "Events that happening soon.",
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.w400,
                        color: TITLE_COLOR,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            SizedBox(
              width: MediaQuery.of(context).size.width,
              child: GridView.builder(
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      childAspectRatio: MediaQuery.of(context).size.width / 200,
                      crossAxisCount: 2,
                      crossAxisSpacing: 10),
                  physics: const NeverScrollableScrollPhysics(),
                  shrinkWrap: true,
                  itemCount: 2,
                  itemBuilder: (BuildContext context, int index) {
                    return SpecialBoxEvent(
                      bgColor: EVENT_COLOR,
                      assetUrl: 'assets/images/eventImg.png',
                      title: 'Test title',
                      date: 'Jan01',
                    );
                  }),
            ),
          ],
        );
      } else {
        return Container();
      }
    });
  }

//create bottom sheet widget

  void bottomSheet(BuildContext context) {
    final size = MediaQuery.of(context).size;
    homeController.selectedImage.value = null;
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      builder: (BuildContext context) {
        return SizedBox(
          height: size.height * 0.8,
          child: Column(
            children: [
              Center(
                child: Text(
                  'Virtual Veterinarian',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w500,
                    color: TITLE_COLOR,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  children: [
                    Container(
                      height: 120,
                      width: size.width,
                      decoration: BoxDecoration(
                        color: BG_COLOR,
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(
                          color: const Color(0xffe1e1e1),
                        ),
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const SizedBox(height: 10),
                          const Text(
                            'Upload pet disease image',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                              color: TITLE_COLOR,
                            ),
                          ),
                          const SizedBox(height: 10),
                          SizedBox(
                            width: size.width / 2.25,
                            child: OutlinedButton(
                              style: OutlinedButton.styleFrom(
                                backgroundColor: BG_COLOR,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                side: const BorderSide(
                                    color: Colors.blue, width: 1),
                              ),
                              onPressed: () => handleUploadImage(context),
                              child: Padding(
                                padding:
                                    const EdgeInsets.symmetric(horizontal: 10),
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Icon(Icons.file_upload_outlined,
                                        color: Colors.blue),
                                    const Text(
                                      'Upload image',
                                      style: TextStyle(color: Colors.blue),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 10),
                    Obx(() {
                      final imageFile = homeController.selectedImage.value;
                      return imageFile != null
                          ? Container(
                              height: 200,
                              width: size.width,
                              decoration: BoxDecoration(
                                // color: BG_COLOR,
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceAround,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Image.file(
                                      imageFile,
                                      width: size.width / 3,
                                      height: 100,
                                    ),
                                    const SizedBox(width: 10),
                                    Column(
                                      children: [
                                        const Text(
                                          'Pet disease identified',
                                          style: TextStyle(
                                            fontSize: 16,
                                            fontWeight: FontWeight.w500,
                                            color: Colors.red,
                                          ),
                                        ),
                                        const SizedBox(height: 10),
                                        homeController.predictedValue.value ==
                                                ""
                                            ? CircularProgressIndicator()
                                            : Text(
                                                homeController
                                                    .predictedValue.value,
                                                style: const TextStyle(
                                                  fontSize: 16,
                                                  fontWeight: FontWeight.w500,
                                                  color: Colors.black,
                                                ),
                                              ),
                                      ],
                                    ),
                                  ]),
                            )
                          : Container();
                    }),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  void handleUploadImage(BuildContext context) async {
    try {
      if (Platform.isAndroid) {
        await requestPermission();
      }

      final ImagePicker picker = ImagePicker();
      final XFile? image = await picker.pickImage(source: ImageSource.gallery);

      if (image != null) {
        homeController.selectedImage.value =
            File(image.path); // ✅ Set the reactive state

        debugPrint(
            "📸 Image captured: ${homeController.selectedImage.value!.path}");

        var req = http.MultipartRequest(
          'POST',
          Uri.parse('http://10.0.2.2:3010/predict'),
        );
        req.files.add(await http.MultipartFile.fromPath(
            'file', homeController.selectedImage.value!.path));

        var response = await req.send();

        if (response.statusCode == 200) {
          var jsonResponse = await http.Response.fromStream(response);
          var data = json.decode(jsonResponse.body);
          homeController.predictedValue.value = data['predicted_class'];

          if (data.containsKey('predicted_class')) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Prediction: ${data['predicted_class']}')),
            );
          }
        }
      } else {
        debugPrint("❌ No image selected.");
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error capturing image: $e')),
      );
    }
  }

  Future<void> requestPermission() async {
    if (Platform.isAndroid) {
      if (await Permission.photos.isDenied ||
          await Permission.photos.isPermanentlyDenied) {
        await Permission.photos.request();
      }
    }
  }
}
