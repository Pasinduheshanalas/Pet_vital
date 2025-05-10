import 'package:flutter/material.dart';

import '../../../../core/consts/colors.dart';

class SpecialBoxNextDos extends StatelessWidget {
  final Color bgColor;
  final String assetUrl;
  final String title;
  final String date;

  const SpecialBoxNextDos({
    super.key,
    required this.bgColor,
    required this.assetUrl,
    required this.title,
    required this.date,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 85,
      width: MediaQuery.of(context).size.width / 2.35,
      padding: const EdgeInsets.symmetric(
        horizontal: 10,
        vertical: 10,
      ),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(8),
      ),
      child: Row(
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
              assetUrl,
              scale: 4,
            ),
          ),
          const SizedBox(
            width: 10,
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                ),
              ),
              Text(
                date,
                style: const TextStyle(
                  fontSize: 14,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
