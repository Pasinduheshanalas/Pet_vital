import 'package:flutter/material.dart';

class UserInputField extends StatefulWidget {
  const UserInputField({
    super.key,
    required this.userInputController,
    // required this.onSend,
    required this.isLoading,
  });

  final TextEditingController userInputController;
  // final Function(TextEditingController) onSend;
  final bool isLoading;

  @override
  State<UserInputField> createState() => _UserInputFieldState();
}

class _UserInputFieldState extends State<UserInputField> {
  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          flex: 1,
          child: TextFormField(
            controller: widget.userInputController,
            onFieldSubmitted: (value) {
              widget.userInputController.clear();
            },
            decoration: InputDecoration(
              hintText: "Type something...",
              hintStyle: TextStyle(color: Colors.grey[600], fontSize: 16),
              filled: true,
              fillColor: Colors.grey[200],
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(30),
                borderSide: BorderSide.none,
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(25),
                borderSide: const BorderSide(color: Colors.blueGrey, width: 2),
              ),
              suffixIcon: IconButton(
                icon: const Icon(Icons.photo_camera_outlined,
                    color: Colors.blueGrey),
                onPressed: () {
                  // final text = widget.userInputController.text.trim();
                  // if (text.isNotEmpty) {
                  //   widget.onSend(widget.userInputController);
                  // }
                  // widget.userInputController.clear();
                },
              ),
            ),
          ),
        ),
        const SizedBox(width: 5),
        Container(
          child: widget.isLoading
              ? Padding(
                  padding: const EdgeInsets.all(7),
                  child: Container(
                    padding: const EdgeInsets.all(15),
                    height: 50,
                    width: 50,
                    child: const CircularProgressIndicator(
                      color: Colors.blueGrey,
                    ),
                  ),
                )
              : IconButton(
                  icon: const Icon(Icons.send, color: Colors.blueGrey),
                  onPressed: () {
                    final text = widget.userInputController.text.trim();
                    if (text.isNotEmpty) {
                      // widget.onSend(widget.userInputController);
                    }
                    widget.userInputController.clear();
                  },
                ),
        )
      ],
    );
  }
}
