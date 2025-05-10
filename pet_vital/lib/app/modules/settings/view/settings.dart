// ignore_for_file: use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../../core/consts/colors.dart';
import '../../../widgets/default_appbar_home.dart';

class Settings extends StatefulWidget {
  const Settings({super.key});

  @override
  State<Settings> createState() => _SettingsState();
}

class _SettingsState extends State<Settings> {
  String name = "";
  @override
  void initState() {
    getData();
    // TODO: implement initState
    super.initState();
  }

  getData() async {}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const DefautAppBarHome(),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 25),
        child: Column(
          children: [
            Center(
              child: Column(
                children: [
                  const SizedBox(
                    height: 30,
                  ),
                  SizedBox(
                    width: MediaQuery.of(context).size.width / 3.5,
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(100),
                      child: Image.asset(
                        'assets/images/sp1.png',
                        scale: 2,
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  Text(
                    'John Wick',
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                      color: TITLE_COLOR,
                    ),
                  ),
                  const SizedBox(
                    height: 5,
                  ),
                ],
              ),
            ),
            const SizedBox(
              height: 60,
            ),
            const SizedBox(
              height: 15,
            ),
            const SizedBox(
              height: 25,
            ),
            TextButton(
              onPressed: () async {
                await Future(() {
                  debugPrint("🚀 Logout button clicked");
                });
                Navigator.pushNamed(context, "/login");
              },
              child: const Text(
                "Logout",
                style: TextStyle(
                  color: PRIMARY_COLOR,
                  fontSize: 16,
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
