import 'package:flutter/material.dart';

class MyFormField extends StatelessWidget {
  String hint;
  final String? Function(String?) validator;
  TextEditingController controller;
  final Icon? icon;
  bool enable;
  bool isObscureText;

  MyFormField({
    required this.hint,
    required this.validator,
    required this.controller,
    this.icon,
    required this.enable,
    required this.isObscureText,
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      // readOnly: readOnly,
      autofocus: true,
      enabled: enable,
      obscureText: isObscureText,
      keyboardType: hint == 'Phone' ? TextInputType.number : TextInputType.text,
      validator: validator,
      controller: controller,
      style: const TextStyle(
        fontSize: 14,
        fontWeight: FontWeight.w300,
      ),
      decoration: InputDecoration(
          isDense: true,
          filled: true,
          contentPadding:
              const EdgeInsets.symmetric(vertical: 10.0, horizontal: 10.0),
          prefixIcon: icon ??
              Container(
                width: 1,
              ),
          fillColor: Colors.grey[100],
          labelText: hint,
          hintText: hint == 'Mobile Number' ? "077#######" : "",
          labelStyle: const TextStyle(color: Colors.black),
          focusedErrorBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.grey[300]!, width: 1.0),
            borderRadius: BorderRadius.circular(5.0),
          ),
          errorBorder: OutlineInputBorder(
            borderSide: BorderSide(
              color: Colors.red[300]!,
              width: 1.0,
            ),
            borderRadius: BorderRadius.circular(5.0),
          ),
          enabledBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.grey[100]!, width: 1.0),
            borderRadius: BorderRadius.circular(5.0),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.grey[500]!, width: 1.0),
            borderRadius: BorderRadius.circular(5.0),
          )),
    );
  }
}
