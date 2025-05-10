// ignore_for_file: use_build_context_synchronously, file_names

import 'package:flutter/material.dart';

import '../../core/consts/colors.dart';

ConfirmationDialog(
    BuildContext context, String title, String msg, Function onConfirmed) {
  showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: Text(title),
        content: Text(msg),
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
            onPressed: () {
              Navigator.of(context).pop(true);
              onConfirmed();
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
      );
    },
  );
}
