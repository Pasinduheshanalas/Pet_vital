import 'package:flutter/material.dart';

import '../../../../core/consts/colors.dart';

class AppointmentBox extends StatelessWidget {
  final String appointmentName;
  final String appointmentDate;
  final String status;
  const AppointmentBox({
    super.key,
    required this.appointmentName,
    required this.appointmentDate,
    required this.status,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: MediaQuery.of(context).size.width,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: MediaQuery.of(context).size.width,
            height: 70,
            decoration: BoxDecoration(
              color: DOS_COLOR,
              borderRadius: BorderRadius.circular(8),
            ),
            padding: const EdgeInsets.symmetric(
              horizontal: 10,
              vertical: 10,
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 50,
                  // height: MediaQuery.of(context).size.height,
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: BG_COLOR,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Image.asset(
                    "assets/images/eventImg.png",
                    scale: 4,
                  ),
                ),
                const SizedBox(
                  width: 20,
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      appointmentName,
                      style: TextStyle(
                        fontWeight: FontWeight.w400,
                        fontSize: 14,
                      ),
                    ),
                    const SizedBox(
                      height: 5,
                    ),
                    Text(appointmentDate),
                  ],
                ),
                const Spacer(),
                Align(
                  alignment: Alignment.center,
                  child: Text(
                    status,
                    style: const TextStyle(
                      fontWeight: FontWeight.w500,
                      fontSize: 16,
                      color: PRIMARY_COLOR,
                    ),
                  ),
                ),
                const SizedBox(
                  height: 5,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
